import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="grow pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:translate-x-[-4px] transition-transform"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Shield size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                                PRIVACY POLICY
                            </h1>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p className="lead text-xl text-gray-500 mb-12">
                                Last Updated: March 3, 2026
                            </p>

                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-4 text-dark">
                                    <Eye size={24} className="text-primary" />
                                    <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">1. Information We Collect</h2>
                                </div>
                                <p>
                                    We collect information that you provide directly to us when you register for the Visionary Builders Summit,
                                    contact us via our web forms, or express interest in a partnership. This information may include:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 list-none p-0">
                                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3 font-medium">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div> Name and contact details
                                    </li>
                                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3 font-medium">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div> Professional organization and role
                                    </li>
                                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3 font-medium">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div> LinkedIn profile and social links
                                    </li>
                                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3 font-medium">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div> Industry and experience
                                    </li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-4 text-dark">
                                    <Lock size={24} className="text-primary" />
                                    <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">2. How We Use Your Data</h2>
                                </div>
                                <p>
                                    Your information is used solely for purposes related to the Visionary Builders Summit, including:
                                </p>
                                <div className="space-y-4 mt-6">
                                    <div className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                        <div className="mt-1"><FileText size={20} className="text-primary" /></div>
                                        <div>
                                            <h4 className="font-bold text-dark m-0">Event Administration</h4>
                                            <p className="text-sm mb-0">Processing your registration and communicating event details.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                        <div className="mt-1"><FileText size={20} className="text-primary" /></div>
                                        <div>
                                            <h4 className="font-bold text-dark m-0">Community Building</h4>
                                            <p className="text-sm mb-0">Allowing you to join our community groups if you've opted in.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-4 text-dark">
                                    <Shield size={24} className="text-primary" />
                                    <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">3. Data Sharing and Third Parties</h2>
                                </div>
                                <p>
                                    We do not sell your personal data. We only share information with service providers as necessary to provide our services.
                                </p>
                            </section>

                            <div className="mt-16 p-8 bg-dark rounded-3xl text-white">
                                <h3 className="text-2xl font-bold mb-4">Questions?</h3>
                                <p className="text-white/70 mb-6">
                                    If you have any questions about this Privacy Policy, please contact our team.
                                </p>
                                <a
                                    href="mailto:contact@visionarybuilderssummit.com"
                                    className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all"
                                >
                                    Contact Privacy Team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
