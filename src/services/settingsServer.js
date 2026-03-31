// Server-side settings service - uses direct database access
import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";

// Default game schedule
const defaultGameSchedule = [
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
];

export async function getSettingsFromDB() {
    try {
        await connectDB();
        const settings = await Settings.findOne({}).lean();

        if (!settings) {
            return null;
        }

        // Convert MongoDB _id to string for serialization
        return JSON.parse(JSON.stringify(settings));
    } catch (error) {
        console.error("Error fetching settings from DB:", error);
        return null;
    }
}

export function buildSiteConfig(settings) {
    // Build khaiwal sections from settings
    const khaiwalSection1 = settings?.khaiwalSection1 || {
        enabled: true,
        contactName: settings?.site1_contactName || settings?.contactName || "TEJU BHAI KHAIWAL",
        whatsappNumber: settings?.site1_whatsappNumber || settings?.whatsappNumber || "",
        paymentNumber: settings?.site1_paymentNumber || "",
        rate: settings?.site1_rate || "",
        gameSchedule: defaultGameSchedule
    };

    const khaiwalSection2 = settings?.khaiwalSection2 || {
        enabled: false,
        contactName: settings?.site2_contactName || "",
        whatsappNumber: settings?.site2_whatsappNumber || "",
        paymentNumber: settings?.site2_paymentNumber || "",
        rate: settings?.site2_rate || "",
        gameSchedule: defaultGameSchedule
    };

    // T1 site configuration
    const t1Config = {
        contactName: settings?.t1_contactName || "T1 BHAI KHAIWAL",
        whatsappNumber: settings?.t1_whatsappNumber || "",
        paymentNumber: settings?.t1_paymentNumber || "",
        rate: settings?.t1_rate || "",
        khaiwalSection: settings?.t1_khaiwalSection || {
            enabled: true,
            gameSchedule: defaultGameSchedule
        }
    };

    // Good Luck site configuration
    const goodluckConfig = {
        contactName: settings?.goodluck_contactName || "GOOD LUCK BHAI KHAIWAL",
        whatsappNumber: settings?.goodluck_whatsappNumber || "",
        paymentNumber: settings?.goodluck_paymentNumber || "",
        rate: settings?.goodluck_rate || "",
        khaiwalSection: settings?.goodluck_khaiwalSection || {
            enabled: true,
            gameSchedule: defaultGameSchedule
        }
    };

    // Site configuration with khaiwal sections
    return {
        siteName: "T1 Satta Play",
        khaiwalSection1,
        khaiwalSection2,
        // T1 specific settings
        ...t1Config,
        // Good Luck specific settings
        goodluck_contactName: goodluckConfig.contactName,
        goodluck_whatsappNumber: goodluckConfig.whatsappNumber,
        goodluck_paymentNumber: goodluckConfig.paymentNumber,
        goodluck_rate: goodluckConfig.rate,
        goodluck_khaiwalSection: goodluckConfig.khaiwalSection,
        // Legacy fields for backward compatibility
        contactName: t1Config.contactName,
        whatsappNumber: t1Config.whatsappNumber,
        site1_contactName: khaiwalSection1.contactName,
        site1_whatsappNumber: khaiwalSection1.whatsappNumber,
        site1_paymentNumber: khaiwalSection1.paymentNumber,
        site1_rate: khaiwalSection1.rate,
        site2_contactName: khaiwalSection2.contactName,
        site2_whatsappNumber: khaiwalSection2.whatsappNumber,
        site2_paymentNumber: khaiwalSection2.paymentNumber,
        site2_rate: khaiwalSection2.rate,
    };
}