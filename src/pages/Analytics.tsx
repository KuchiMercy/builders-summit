import { useState, useMemo } from "react";
import { Users, UserCheck, UserX, Loader2, ShieldAlert, ChevronLeft, ChevronRight, TrendingUp, List } from "lucide-react";
import { Link } from "react-router-dom";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip
} from 'recharts';
import {
    format,
    subDays,
    isAfter,
    startOfDay,
    eachDayOfInterval,
    isSameDay
} from 'date-fns';

interface Registrant {
    id: string;
    firstName: string;
    lastName: string;
    organization: string;
    role: string;
    email: string;
    goals: string;
    timestamp: {
        _seconds: number;
        _nanoseconds: number;
    } | string | Date;
}

interface Stats {
    total: number;
    verifiedCount: number;
    testCount: number;
    registrants: Registrant[];
}

type TimeFilter = 'all' | 'monthly' | 'weekly';

const Analytics = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(false);

    // UI State
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const adminSecret = import.meta.env.VITE_ADMIN_SECRET || 'builders-summit-2026-secret';

        if (password === adminSecret) {
            setIsAuthenticated(true);
            fetchData(password);
        } else {
            setError("Invalid secret code");
        }
    };

    const fetchData = async (secret: string) => {
        setLoading(true);
        try {
            const response = await fetch("/api/registrants", {
                headers: {
                    Authorization: `Bearer ${secret}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch data");
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Helper to parse Firestore/ISO timestamps
    const getTimestampDate = (ts: any) => {
        if (!ts) return new Date();
        if (ts instanceof Date) return ts;
        if (ts._seconds) return new Date(ts._seconds * 1000);
        return new Date(ts);
    };

    // Filtered data based on time selection
    const filteredRegistrants = useMemo(() => {
        if (!data) return [];
        const registrants = data.registrants || [];
        const now = new Date();

        if (timeFilter === 'weekly') {
            const weekAgo = subDays(now, 7);
            return registrants.filter(r => isAfter(getTimestampDate(r.timestamp), weekAgo));
        }
        if (timeFilter === 'monthly') {
            const monthAgo = subDays(now, 30);
            return registrants.filter(r => isAfter(getTimestampDate(r.timestamp), monthAgo));
        }

        console.log("this is the registrant", registrants)
        return registrants;
    }, [data, timeFilter]);

    // Simplified Chart data processing
    const trendData = useMemo(() => {
        if (!data) return [];
        const registrants = data.registrants || [];

        const now = new Date();
        let startDate = subDays(now, 30);
        if (timeFilter === 'weekly') startDate = subDays(now, 7);
        if (timeFilter === 'all') {
            if (registrants.length > 0) {
                const earliest = registrants.reduce((min, r) => {
                    const d = getTimestampDate(r.timestamp);
                    return d < min ? d : min;
                }, now);
                startDate = startOfDay(earliest);
            }
        }

        const interval = eachDayOfInterval({ start: startDate, end: now });

        return interval.map(date => {
            const dailyCount = registrants.filter(r => isSameDay(getTimestampDate(r.timestamp), date)).length;
            return {
                name: format(date, 'MMM dd'),
                daily: dailyCount
            };
        });
    }, [data, timeFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredRegistrants.length / itemsPerPage);
    const paginatedRegistrants = filteredRegistrants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 font-sans text-neutral-200">
                <div className="max-w-md w-full relative">
                    <div className="relative bg-neutral-900 border border-white/5 rounded-2xl p-10 shadow-2xl">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                <ShieldAlert className="w-8 h-8 text-orange-500" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-center mb-2 text-white">Administration Access</h1>
                        <p className="text-neutral-500 text-center mb-8 text-sm font-medium leading-relaxed">
                            Please enter the administrative secret to access the analytics portal.
                        </p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-neutral-400 ml-1">Secret Key</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-5 py-3.5 text-white focus:outline-none focus:border-orange-500/50 transition-all font-mono text-center placeholder:text-neutral-800"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                                    <p className="text-red-500 text-xs font-semibold">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg active:scale-[0.98]"
                            >
                                Sig-in to Dashboard
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link to="/" className="text-neutral-500 hover:text-white transition-colors text-xs font-bold inline-flex items-center gap-2">
                                <ChevronLeft className="w-4 h-4" />
                                Return to Main Page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12 font-sans selection:bg-orange-500/20">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500/80">Admin Console</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Summit <span className="text-neutral-500">Analytics</span>
                        </h1>
                        <p className="text-neutral-500 text-sm font-medium">Real-time registration metrics and builder ecosystem health.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-neutral-900/50 p-1.5 rounded-xl border border-white/5">
                        <div className="flex gap-1">
                            {(['all', 'monthly', 'weekly'] as TimeFilter[]).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => { setTimeFilter(f); setCurrentPage(1); }}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${timeFilter === f
                                        ? 'bg-neutral-800 text-white shadow-sm'
                                        : 'text-neutral-500 hover:text-neutral-300'
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-1" />
                        <Link to="/" className="px-5 py-2 text-neutral-300 text-xs font-bold rounded-lg hover:text-white transition-all">
                            Home
                        </Link>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-4">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                        <p className="text-neutral-500 text-sm font-medium">Fetching dashboard metrics...</p>
                    </div>
                ) : error ? (
                    <div className="py-24 p-12 bg-neutral-900 border border-red-500/10 rounded-2xl text-center max-w-xl mx-auto shadow-xl">
                        <ShieldAlert className="w-12 h-12 text-red-500/50 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">Service Unavailable</h3>
                        <p className="text-neutral-500 mb-10 text-sm leading-relaxed">{error}</p>
                        <button
                            onClick={() => fetchData(password)}
                            className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-lg transition-all text-xs"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : data ? (
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-12">
                        {/* Stats Summary Area */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Total Registrants', value: data.total, icon: Users, accent: 'bg-orange-500' },
                                { label: 'Verified Accounts', value: data.verifiedCount, icon: UserCheck, accent: 'bg-indigo-500' },
                                { label: 'Filtered Entries', value: data.testCount, icon: UserX, accent: 'bg-neutral-500' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-neutral-900 border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-all group overflow-hidden relative">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${stat.accent} opacity-40`} />
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-neutral-950 rounded-xl border border-white/5 group-hover:bg-neutral-800 transition-colors">
                                            <stat.icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-4xl font-bold tracking-tight">{stat.value.toLocaleString()}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Analysis Area */}
                        <div className="bg-neutral-900 border border-white/5 p-8 lg:p-10 rounded-2xl shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-neutral-950 rounded-xl border border-white/5">
                                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-0.5">Registration Velocity</h2>
                                        <p className="text-neutral-500 text-xs">New signups tracked per day</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 px-4 py-2 bg-neutral-950 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Growth Curve</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[380px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f1f23" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#525252', fontSize: 11, fontWeight: 500 }}
                                            dy={20}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#525252', fontSize: 11, fontWeight: 500 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#0a0a0c',
                                                borderColor: '#262626',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                color: '#fff',
                                                padding: '12px'
                                            }}
                                            itemStyle={{ fontWeight: 600, color: '#f97316' }}
                                            cursor={{ stroke: '#f97316', strokeWidth: 1 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="daily"
                                            name="Signups"
                                            stroke="#f97316"
                                            strokeWidth={2.5}
                                            fillOpacity={1}
                                            fill="url(#colorDaily)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Paginated Table Section */}
                        <div className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                            <div className="p-8 border-b border-white/5 bg-neutral-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-neutral-950 rounded-xl border border-white/5">
                                        <List className="w-5 h-5 text-neutral-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-0.5">Attendee Directory</h2>
                                        <p className="text-neutral-500 text-xs">Manage and review registrant profiles</p>
                                    </div>
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center gap-2 bg-neutral-950 p-1 rounded-xl border border-white/5">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="p-2 rounded-lg disabled:opacity-20 hover:bg-neutral-800 transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center px-3">
                                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                            {currentPage} <span className="mx-1.5 opacity-30">/</span> {totalPages || 1}
                                        </span>
                                    </div>
                                    <button
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="p-2 rounded-lg disabled:opacity-20 hover:bg-neutral-800 transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-950 text-neutral-500 border-b border-white/5">
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Full Name</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Organization</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Attendee Goals</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-right">Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/3">
                                        {paginatedRegistrants.length > 0 ? (
                                            paginatedRegistrants.map((r, i) => (
                                                <tr key={r.id || i} className="hover:bg-white/1 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-white/5 flex items-center justify-center font-bold text-xs text-neutral-300">
                                                                {r.firstName?.[0]}{r.lastName?.[0]}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-bold text-sm text-neutral-100 group-hover:text-white transition-colors">
                                                                    {r.firstName} {r.lastName}
                                                                </div>
                                                                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter">{r.role}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="text-xs font-semibold text-neutral-400">{r.organization}</div>
                                                    </td>
                                                    <td className="px-8 py-6 max-w-md">
                                                        <div className="text-xs text-neutral-400 leading-relaxed bg-neutral-950/50 p-3 rounded-lg border border-white/5 group-hover:bg-neutral-950 transition-colors">
                                                            {r.goals || <span className="opacity-30 italic">No specific goals provided.</span>}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right whitespace-nowrap">
                                                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                                                            {format(getTimestampDate(r.timestamp), 'MMM dd, yyyy')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-32 text-center">
                                                    <div className="inline-flex p-4 bg-neutral-950 rounded-xl mb-4">
                                                        <Users size={32} className="text-neutral-800" />
                                                    </div>
                                                    <p className="text-neutral-600 font-bold uppercase tracking-widest text-[10px]">No attendee records found</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Footer Info */}
                <footer className="pt-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-widest">
                            Builders Summit Administration Core
                        </p>
                        <p className="text-neutral-800 text-[9px] font-bold uppercase">System Version 2.1.0-Release</p>
                    </div>

                    <div className="flex items-center gap-8">
                        {['Security', 'Protocols', 'Support'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-neutral-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider underline-offset-4 hover:underline"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Analytics;
