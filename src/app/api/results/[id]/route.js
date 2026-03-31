import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Result from "@/models/Result";

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = params;
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

        const result = await Result.findByIdAndUpdate(id, normalizedData, {
            new: true,
            runValidators: true,
        });

        if (!result) {
            return NextResponse.json(
                { error: "Result not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error updating result:", error);
        return NextResponse.json(
            { error: "Failed to update result" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const result = await Result.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json(
                { error: "Result not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Result deleted successfully" });
    } catch (error) {
        console.error("Error deleting result:", error);
        return NextResponse.json(
            { error: "Failed to delete result" },
            { status: 500 }
        );
    }
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