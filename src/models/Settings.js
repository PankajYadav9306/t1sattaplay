import mongoose from "mongoose";

const khaiwalSectionSchema = new mongoose.Schema({
    enabled: { type: Boolean, default: false },
    contactName: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    telegramNumber: { type: String, default: "" },
    paymentNumber: { type: String, default: "" },
    rate: { type: String, default: "" },
    gameSchedule: [{
        name: { type: String },
        time: { type: String }
    }]
});

const SettingsSchema = new mongoose.Schema({
    // Legacy fields for backward compatibility
    site1_name: String,
    site1_contactName: String,
    site1_whatsappNumber: String,
    site1_paymentNumber: String,
    site1_rate: String,
    site2_name: String,
    site2_contactName: String,
    site2_whatsappNumber: String,
    site2_paymentNumber: String,
    site2_rate: String,
    contactName: String,
    whatsappNumber: String,
    siteName: {
        type: String,
        default: "Satta Disawer Satta",
    },

    // Site 1 individual fields (backward compatibility)
    site1_contactName: String,
    site1_whatsappNumber: String,
    site1_paymentNumber: String,
    site1_rate: String,

    // Good Luck site configuration
    goodluck_contactName: String,
    goodluck_whatsappNumber: String,
    goodluck_paymentNumber: String,
    goodluck_rate: String,
    goodluck_khaiwalSection: {
        type: khaiwalSectionSchema,
        default: () => ({
            enabled: true,
            contactName: "",
            whatsappNumber: "",
            paymentNumber: "",
            rate: "",
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
        })
    },

    // T1 site configuration
    t1_contactName: String,
    t1_whatsappNumber: String,
    t1_paymentNumber: String,
    t1_rate: String,
    t1_khaiwalSection: {
        type: khaiwalSectionSchema,
        default: () => ({
            enabled: true,
            contactName: "",
            whatsappNumber: "",
            paymentNumber: "",
            rate: "",
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
        })
    },

    // New khaiwal sections configuration
    khaiwalSection1: {
        type: khaiwalSectionSchema,
        default: () => ({
            enabled: true,
            contactName: "",
            whatsappNumber: "",
            paymentNumber: "",
            rate: "",
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
        })
    },
    khaiwalSection2: {
        type: khaiwalSectionSchema,
        default: () => ({
            enabled: false,
            contactName: "",
            whatsappNumber: "",
            paymentNumber: "",
            rate: "",
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
        })
    }
}, { timestamps: true });

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

export default Settings;