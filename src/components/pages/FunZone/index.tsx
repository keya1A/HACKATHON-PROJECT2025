import React from "react";
import DailyQuiz from "./DailyQuiz";
import LeaderBoard from "./LeaderBoard";
import SpinWheel from "./SpinWheel";

const FunZone = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-purple-600">🎉 Welcome to FunZone 🎉</h1>
      <p className="mt-4 text-gray-700">
        Play games, earn rewards, and challenge your friends!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Daily Quiz Card */}
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">
          <DailyQuiz />
        </div>

        {/* Leaderboard Card */}
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">
          <LeaderBoard />
        </div>

        {/* Spin Wheel Card */}
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">
          <SpinWheel />
        </div>
      </div>
    </div>
  );
};

export default FunZone;
