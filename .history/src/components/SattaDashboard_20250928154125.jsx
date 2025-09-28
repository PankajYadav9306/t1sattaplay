"use client";
import { Link } from "lucide-react";
import Image from "next/image";
import GameSection from "./GameSection";
import SattaResultTable from "./SattaResultTable";
import { GAMES, GAME_KEYS, GAME_NAMES } from "@/utils/gameConfig";

const SattaDashboard = ({
  todayResults = [],
  yesterdayResults = [],
  lastResult,
  setting,
  monthlyResults = [],
  disawarData,
  currentSite = "site 3",
  siteName = "T1 Satta",
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Use site name from settings or props
  const displaySiteName = setting?.siteName || siteName;

  // Create monthly chart data using centralized config
  const createMonthlyChart = () => {
    const rows = [];
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, "0");

    for (let day = 1; day <= daysInMonth; day++) {
      const row = { day };
      const dayStr = `${currentYear}-${monthStr}-${String(day).padStart(2, "0")}`;

      GAMES.forEach((game, index) => {
        // Find result for this specific date and game
        const result = monthlyResults.find(
          (r) => r.date === dayStr && r.game === game.key
        );
        row[`game${index}`] = result ? result.resultNumber : "--";
      });

      rows.push(row);
    }
    return rows;
  };

  const monthlyChartData = createMonthlyChart();

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="mx-auto bg-gradient">
        {/* Current Featured Game */}
        <div className="rounded-xl text-center">
          <div className="bg-gradient px-2 pt-20 pb-8">
            <p className="text-white pb-12 mt-12 md:mt-16 lg:mt-24 px-4 text-2xl md:text-3xl font-semibold">
              ✨ ईमानदारी ही खाईवाल 🤝 BHAI की पहचान है, भाइयों 👑
            </p>
            <h2 className="text-4xl lg:text-5xl text-white font-semibold text-theme-accent">
              {displaySiteName} 👑
            </h2>
            <p className="text-white pb-12 mt-10 px-4 text-2xl md:text-3xl font-semibold">
              यही आती है सबसे पहले खबर 📰⏳
              <br />
              🚀 SUPER FAST RESULTS ⚡
            </p>
          </div>
        </div>

        <GameSection
          data={lastResult}
          setting={setting}
          disawarData={disawarData}
        />
        <SattaResultTable
          todayResults={todayResults}
          yesterdayResults={yesterdayResults}
        />
        {/* <!-- Begin: Khaiwal Bhai Section --> */}
        <section className="bg-white py-8 md:py-12">
          <div className="w-full text-center mx-auto max-sm:px-4 px-6">
            <div className="rounded-2xl shadow-2xl shadow-amber-700 bg-gradient2 overflow-hidden md:flex md:items-center">
              {/* <!-- Left: Text --> */}
              <div className="p-8 max-sm:p-4 max-sm:pt-6 max-w-[1000px] mx-auto">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-sm uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                    🎯 No.1 खाईवाल
                  </span>
                  <span className="text-sm text-white/80">
                    📍 इलाके का भरोसा
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                  ✨ ईमानदारी ही खाईवाल BHAI की पहचान है।
                </h2>

                <p className="text-white/80 mb-6">
                  खाईवाल नाम ही भरोसे और पारदर्शिता के लिए जाना जाता है। जो काम
                  HUM करते हैं — दिल से करते हैं। यहाँ आपको जल्दी, साफ और
                  भरोसेमंद रिज़ल्ट मिलते हैं। 🤝🔥
                </p>

                <ul className="text-white/80 space-y-2 mb-6">
                  <li>• ✅ सीधा और फास्ट अपडेट</li>
                  <li>• 💯 भरोसेमंद रिकॉर्ड</li>
                  <li>• ⏱️ सुपर फास्ट रिस्पॉन्स</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Grid */}
        <div>
          <div className=" bg-white pb-5 text-center">
            <div className="bg-gradient p-6">
              <h2 className="sm:text-4xl text-white lg:text-5xl text-2xl font-bold text-theme-accent mb-2 md:mb-6">
                {currentMonth} MONTH CHART
              </h2>
              <p className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold">
                {currentYear}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient2">
                  <th className="outline px-3 py-2 text-white text-sm sticky left-0 bg-gradient2 z-10">
                    S.No
                  </th>
                  {GAMES.map((game, index) => (
                    <th
                      key={index}
                      className="border border-theme-primary px-3 py-2 text-white text-xs"
                    >
                      {game.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyChartData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={` ${rowIndex % 2 !== 0 ? "bg-gray-200" : ""}`}
                  >
                    <td className="px-3 py-2 text-center text-white bg-gradient2 outline text-sm font-medium sticky left-0 z-10">
                      {rowIndex + 1}
                    </td>
                    {GAMES.map((_, gameIndex) => (
                      <td
                        key={gameIndex}
                        className="border border-theme-primary px-3 py-2 hover:bg-gradient-to-b hover:from-[#fcb511] transition-colors text-center text-black text-sm"
                      >
                        {row[`game${gameIndex}`]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SattaDashboard;
