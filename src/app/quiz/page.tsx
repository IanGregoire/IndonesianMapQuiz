'use client';
import IndonesiaMap from "components/indonesiaMap";

export default function QuizPage() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Quiz Mode</h2>
            <p>Select a province by clicking on the map!</p>

            {/* Replace with map logic */}
            <div className="mt-6">
                <p>[Map will go here]</p>
                <IndonesiaMap />
            </div>
        </div>
    )
}