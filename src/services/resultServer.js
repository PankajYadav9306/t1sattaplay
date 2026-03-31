// Server-side results service - uses direct database access
import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import { GAMES } from "@/utils/gameConfig";

function getISTDate(daysOffset = 0) {
    const now = new Date();
    now.setDate(now.getDate() + daysOffset);

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + istOffset);

    return istTime.toISOString().split('T')[0]; // YYYY-MM-DD format
}

export async function getTodayResultFromDB() {
    try {
        await connectDB();
        const today = getISTDate();
        const results = await Result.find({ date: today }).lean();
        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.error("Error fetching today's results from DB:", error);
        return [];
    }
}

export async function getYesterdayResultsFromDB() {
    try {
        await connectDB();
        const yesterday = getISTDate(-1);
        const results = await Result.find({ date: yesterday }).lean();
        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.error("Error fetching yesterday's results from DB:", error);
        return [];
    }
}

export async function getLastResultFromDB() {
    try {
        await connectDB();
        const result = await Result.findOne({})
            .sort({ updatedAt: -1 })
            .lean();

        if (!result) return null;
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error("Error fetching last result from DB:", error);
        return null;
    }
}

export async function getMonthlyResultsFromDB(month, year) {
    try {
        await connectDB();
        const monthStr = String(month).padStart(2, '0');
        const startDate = `${year}-${monthStr}-01`;
        const endDate = `${year}-${monthStr}-31`;

        const results = await Result.find({
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 }).lean();

        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.error("Error fetching monthly results from DB:", error);
        return [];
    }
}

export async function getDisawarDataFromDB() {
    try {
        await connectDB();
        const results = await Result.find({ game: "disawer" })
            .sort({ date: -1 })
            .limit(31)
            .lean();
        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.error("Error fetching disawar data from DB:", error);
        return [];
    }
}

export async function getYearlyResultsFromDB(gameKey, year) {
    try {
        await connectDB();
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;

        const results = await Result.find({
            game: gameKey.toLowerCase(),
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 }).lean();

        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.error("Error fetching yearly results from DB:", error);
        return [];
    }
}

// ==================== CHART HELPERS ====================
const currentYear = new Date().getFullYear();
const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

export const gameSlugMapping = {};
GAMES.forEach(game => {
    years.forEach(year => {
        gameSlugMapping[`${game.key}-${year}`] = { game: game.key, year };
    });
});