import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    game: { type: String, required: true },
    date: { type: String, required: true },
    resultNumber: { type: String, required: true },
    waitingGame: { type: String, required: true },
}, { timestamps: true });

const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

export default Result;