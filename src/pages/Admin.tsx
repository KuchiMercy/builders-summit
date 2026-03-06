import React, { useState } from 'react';
import { Lock, Download, ShieldCheck, AlertCircle } from 'lucide-react';

const Admin = () => {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.length > 5) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid key format');
    }
  };

  const downloadFile = (type: 'registrations' | 'contacts' | 'partners') => {
    window.location.href = `/api/export?type=${type}&key=${key}`;
  };

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-dark/5">

        {/* Header */}


        <div className="bg-dark text-white p-6 text-center">
          <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-white/20" />
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-dark/40 text-sm mt-1">Secure Data Access</p>
        </div>

        <div className="p-8">
          {!isAuthenticated ? (
            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">
                  Secret Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 w-5 h-5" />
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-primary/5 border border-dark/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Enter admin secret..."
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all transform active:scale-95"
              >
                Access Dashboard
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-in">
              <div className="text-center mb-6">
                <p className="text-green-600 font-medium flex items-center justify-center gap-2 bg-green-50 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                  Secure Session Active
                </p>
              </div>

              <button
                onClick={() => downloadFile('registrations')}
                className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 border border-dark/10 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-dark">Registrations</p>
                    <p className="text-xs text-dark/50">Download CSV</p>
                  </div>
                </div>
                <div className="text-dark/40 group-hover:text-dark transition-colors">→</div>
              </button>

              <button
                onClick={() => downloadFile('contacts')}
                className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 border border-dark/10 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-dark">Contact Messages</p>
                    <p className="text-xs text-dark/50">Download CSV</p>
                  </div>
                </div>
                <div className="text-dark/40 group-hover:text-dark transition-colors">→</div>
              </button>

              <button
                onClick={() => downloadFile('partners')}
                className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 border border-dark/10 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Partnerships</p>
                    <p className="text-xs text-gray-500">Download CSV</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-black transition-colors">→</div>
              </button>

              <button
                onClick={() => { setIsAuthenticated(false); setKey(''); }}
                className="w-full text-center text-gray-400 text-sm hover:text-gray-600 mt-4"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
