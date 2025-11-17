import Link from "next/link";
import { GAMES } from "@/utils/gameConfig";

const ChartOne = () => {
  const currentYear = new Date().getFullYear();

  const sattaLinks = GAMES.map((game) => ({
    id: game.order,
    title: `${game.name} YEARLY CHART ${currentYear}`,
    href: `${game.key}-yearly-chart-${currentYear}`,
  }));

  return (
    <div className="mt-18 py-4 h-full bg-gradient">
      <h1 className="pb-3 text-[22px] text-white font-medium text-center px-3 pt-6">
        T1-satta provides all kind of satta king results everyday.
      </h1>
      <h2 className="capitalize text-3xl py-3 text-white font-semibold text-center">
        T1 Satta Play Chart {currentYear}
      </h2>
      <div className="bg-gradient h-full py-6">
        <div className="container mx-auto max-sm:px-3 px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center max-md:gap-4 max-sm:gap-3 gap-5">
            {sattaLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="bg-gradient2 flex items-center justify-center hover:underline underline-offset-2 duration-300 text-nowrap px-6 py-2.5 rounded-xs cursor-pointer hover:transform transition-all"
              >
                <p className="text-base max-sm:text-sm m-0 font-semibold uppercase text-white">
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
