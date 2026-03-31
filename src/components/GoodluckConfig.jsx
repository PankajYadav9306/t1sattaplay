"use client";
import React, { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/services/result";

const GoodluckConfig = ({ showConfig, setShowConfig, onConfigSaved }) => {
    const [configLoading, setConfigLoading] = useState(false);
    const [config, setConfig] = useState({
        contactName: "",
        whatsappNumber: "",
        paymentNumber: "",
        rate: "",
        khaiwalSection: {
            enabled: true,
            gameSchedule: [
                { name: "SHIRDI DHAM", time: "12:55 PM" },
                { name: "KALIYAR", time: "01:55 PM" },
                { name: "DELHI BAZAR", time: "03:00 PM" },
                { name: "SHRI GANESH", time: "04:30 PM" },
                { name: "FARIDABAD", time: "05:45 PM" },
                { name: "SHAKTI PEETH", time: "07:25 PM" },
                { name: "GAZIYABAD", time: "09:00 PM" },
                { name: "MATHURA", time: "10:00 PM" },
                { name: "GALI", time: "11:30 PM" },
                { name: "DISAWAR", time: "04:50 AM" }
            ]
        }
    });

    // Load configuration when component mounts or showConfig changes
    useEffect(() => {
        if (showConfig) {
            loadConfig();
        }
    }, [showConfig]);

    const loadConfig = async () => {
        try {
            const settings = await getSettings();
            if (settings) {
                setConfig({
                    contactName: settings.goodluck_contactName || "",
                    whatsappNumber: settings.goodluck_whatsappNumber || "",
                    paymentNumber: settings.goodluck_paymentNumber || "",
                    rate: settings.goodluck_rate || "",
                    khaiwalSection: settings.goodluck_khaiwalSection || {
                        enabled: true,
                        gameSchedule: [
                            { name: "SHIRDI DHAM", time: "12:55 PM" },
                            { name: "KALIYAR", time: "01:55 PM" },
                            { name: "DELHI BAZAR", time: "03:00 PM" },
                            { name: "SHRI GANESH", time: "04:30 PM" },
                            { name: "FARIDABAD", time: "05:45 PM" },
                            { name: "SHAKTI PEETH", time: "07:25 PM" },
                            { name: "GAZIYABAD", time: "09:00 PM" },
                            { name: "MATHURA", time: "10:00 PM" },
                            { name: "GALI", time: "11:30 PM" },
                            { name: "DISAWAR", time: "04:50 AM" }
                        ]
                    }
                });
            }
        } catch (error) {
            console.error("Failed to load Good Luck config:", error);
        }
    };

    const handleConfigSave = async () => {
        // Basic validation
        if (!config.contactName.trim()) {
            alert("Please enter a contact name");
            return;
        }
        if (!config.whatsappNumber.trim()) {
            alert("Please enter a WhatsApp number");
            return;
        }

        setConfigLoading(true);
        try {
            const configToSave = {
                goodluck_contactName: config.contactName,
                goodluck_whatsappNumber: config.whatsappNumber,
                goodluck_paymentNumber: config.paymentNumber,
                goodluck_rate: config.rate,
                goodluck_khaiwalSection: config.khaiwalSection
            };

            await updateSettings(configToSave);
            alert("Good Luck configuration saved successfully!");
            setShowConfig(false);
            if (onConfigSaved) {
                onConfigSaved();
            }
        } catch (error) {
            console.error("Failed to save Good Luck config:", error);
            alert("Failed to save configuration. Please try again.");
        } finally {
            setConfigLoading(false);
        }
    };

    const updateGameSchedule = (index, field, value) => {
        const updatedSchedule = [...config.khaiwalSection.gameSchedule];
        updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
        setConfig({
            ...config,
            khaiwalSection: {
                ...config.khaiwalSection,
                gameSchedule: updatedSchedule
            }
        });
    };

    if (!showConfig) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-white text-xl mb-6 flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    Good Luck Site Configuration
                </h3>

                {/* Basic Configuration */}
                <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
                    <h4 className="text-white text-lg mb-4">Basic Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Contact Name
                            </label>
                            <input
                                type="text"
                                value={config.contactName}
                                onChange={(e) => setConfig({ ...config, contactName: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="Enter contact name"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                WhatsApp Number
                            </label>
                            <input
                                type="number"
                                value={config.whatsappNumber}
                                onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="919999999999"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Payment Number
                            </label>
                            <input
                                type="text"
                                value={config.paymentNumber}
                                onChange={(e) => setConfig({ ...config, paymentNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="UPI/Phone number for payments"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Rate (₹)
                            </label>
                            <input
                                type="number"
                                value={config.rate}
                                onChange={(e) => setConfig({ ...config, rate: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="e.g., 90"
                                disabled={configLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Game Schedule Configuration */}
                <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
                    <h4 className="text-white text-lg mb-4">Game Schedule</h4>
                    <div className="space-y-3">
                        {config.khaiwalSection.gameSchedule.map((game, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={game.name}
                                        onChange={(e) => updateGameSchedule(index, 'name', e.target.value)}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                                        disabled={configLoading}
                                    />
                                </div>
                                <div className="w-32">
                                    <input
                                        type="text"
                                        value={game.time}
                                        onChange={(e) => updateGameSchedule(index, 'time', e.target.value)}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                                        placeholder="HH:MM AM/PM"
                                        disabled={configLoading}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-white/20">
                    <button
                        onClick={handleConfigSave}
                        disabled={configLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {configLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            "Save Configuration"
                        )}
                    </button>
                    <button
                        onClick={() => setShowConfig(false)}
                        disabled={configLoading}
                        className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoodluckConfig;