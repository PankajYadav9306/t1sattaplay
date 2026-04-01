"use client";
import GoodluckConfig from "@/components/GoodluckConfig";
import { Settings, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GoodluckConfigPage = () => {
    const [showConfig, setShowConfig] = useState(true);
    const router = useRouter();

    const handleConfigSaved = () => {
        // Optional: Add any post-save logic here
        console.log("T1 configuration saved");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900">
            {/* Header */}
            <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/admin')}
                                className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Admin</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <h1 className="text-white text-lg font-semibold">Good Luck Admin</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Good Luck Site Configuration</h2>
                    <p className="text-green-200">Configure contact details, rates, and game schedules for the Good Luck site</p>
                </div>

                {/* Configuration Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setShowConfig(true)}
                        className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <Settings className="w-5 h-5" />
                        <span>Open Configuration</span>
                    </button>
                </div>

                {/* Features Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-white text-xl">👤</span>
                        </div>
                        <h3 className="text-white text-lg font-semibold mb-2">Contact Management</h3>
                        <p className="text-green-200 text-sm">Update contact names, WhatsApp numbers, and payment details</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-white text-xl">💰</span>
                        </div>
                        <h3 className="text-white text-lg font-semibold mb-2">Rate Configuration</h3>
                        <p className="text-green-200 text-sm">Set and manage betting rates for all games</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-white text-xl">⏰</span>
                        </div>
                        <h3 className="text-white text-lg font-semibold mb-2">Game Schedule</h3>
                        <p className="text-green-200 text-sm">Customize game names and timing schedules</p>
                    </div>
                </div>
            </div>

            {/* Configuration Modal */}
            <GoodluckConfig
                showConfig={showConfig}
                setShowConfig={setShowConfig}
                onConfigSaved={handleConfigSaved}
            />
        </div>
    );
};

export default GoodluckConfigPage;