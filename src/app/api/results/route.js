import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Result from "@/models/Result";

// Function to clean up data older than 2 years
async function cleanupOldData() {
    try {
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        const result = await Result.deleteMany({
            createdAt: { $lt: twoYearsAgo }
        });

        console.log(`Cleaned up ${result.deletedCount} old records`);
    } catch (error) {
        console.error("Error cleaning up old data:", error);
    }
}

export async function GET(request) {
    try {
        await connectDB();

        // Run cleanup for old data (older than 2 years)
        await cleanupOldData();

        // Get query parameters
        const { searchParams } = new URL(request.url);
        const game = searchParams.get("game");
        const date = searchParams.get("date");
        const month = searchParams.get("month");
        const year = searchParams.get("year");
        const type = searchParams.get("type"); // 'today', 'yesterday', 'last', 'disawar'

        let query = {};

        if (type === "today") {
            // Get today's results
            const today = getISTDate();
            query = { date: today };
        } else if (type === "yesterday") {
            // Get yesterday's results
            const yesterday = getISTDate(-1);
            query = { date: yesterday };
        } else if (type === "last") {
            // Get last result
            const results = await Result.findOne({}).sort({ createdAt: -1 });
            return NextResponse.json(results);
        } else if (type === "disawar") {
            // Get disawar results
            query = { game: "disawer" };
        } else if (game && year) {
            // Get yearly results for a specific game
            const startDate = `${year}-01-01`;
            const endDate = `${year}-12-31`;
            query = {
                game: game.toLowerCase().trim(),
                date: { $gte: startDate, $lte: endDate },
            };
        } else if (month && year) {
            // Get monthly results
            const monthStr = String(month).padStart(2, '0');
            const startDate = `${year}-${monthStr}-01`;
            const endDate = `${year}-${monthStr}-31`;
            query = {
                date: { $gte: startDate, $lte: endDate }
            };
        } else if (game) {
            // Get results by game
            query = { game: game.toLowerCase().trim() };
        } else if (date) {
            // Get results by date
            query = { date };
        }

        const results = await Result.find(query).sort({ date: -1 });
        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching results:", error);
        return NextResponse.json(
            { error: "Failed to fetch results" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();

        // Validate data
        const validation = validateResultData(data);
        if (!validation.isValid) {
            return NextResponse.json(
                { errors: validation.errors },
                { status: 400 }
            );
        }

        // Normalize data
        const normalizedData = {
            ...data,
            game: data.game.toLowerCase().trim(),
            waitingGame: data.waitingGame.toLowerCase().trim(),
        };

        const result = await Result.create(normalizedData);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating result:", error);
        return NextResponse.json(
            { error: "Failed to create result" },
            { status: 500 }
        );
    }
}

function getISTDate(daysOffset = 0) {
    const now = new Date();
    now.setDate(now.getDate() + daysOffset);

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + istOffset);

    return istTime.toISOString().split('T')[0]; // YYYY-MM-DD format
}

function validateResultData(data) {
    const errors = [];

    if (!data.game || typeof data.game !== 'string') {
        errors.push("Game is required and must be a string");
    }

    if (!data.date || typeof data.date !== 'string') {
        errors.push("Date is required and must be a string");
    }

    if (!data.resultNumber || typeof data.resultNumber !== 'string') {
        errors.push("Result number is required and must be a string");
    }

    if (!data.waitingGame || typeof data.waitingGame !== 'string') {
        errors.push("Waiting game is required and must be a string");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}