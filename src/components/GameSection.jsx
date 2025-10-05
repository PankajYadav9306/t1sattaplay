"use client";
import Image from "next/image";
import Link from "next/link";
import DateTime from "./DateTime";

const GamePage = ({ data, setting, disawarData }) => {
  const schedule = [
    { name: "SHIRDI DHAM", time: "12:55 PM", number: "45" },
    { name: "KALIYAR", time: "01:55 PM", number: "62" },
    { name: "DELHI BAZAR", time: "03:00 PM", number: "27" },
    { name: "SHRI GANESH", time: "04:30 PM", number: "84" },
    { name: "FARIDABAD ", time: "05:45 PM", number: "11" },
    { name: "SHAKTI PEETH", time: "07:25 PM", number: "32" },
    { name: "GAZIYABAD ", time: "09:00 PM", number: "90" },
    { name: "MATHURA", time: "10:00 PM", number: "75" },
    { name: "GALI ", time: "11:30 PM", number: "41" },
    { name: "DISAWAR ", time: "04:50 PM", number: "11" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* === TOP DYNAMIC SECTION === */}
      <div className="bg-white pt-2 pb-3">
        <div className="text-center mt-2">
          <DateTime />
        </div>
        <hr className="border-dashed w-full mx-auto my-3" />

        <div className="flex text-2xl sm:text-3xl md:text-4xl uppercase mx-auto text-center w-full font-semibold flex-col gap-3 sm:gap-5 items-center justify-center">
          {/* ✅ Previous game */}
          {data && (
            <>
              <p className="text-[#fc6311] text-3xl">
                {data.game.replace("_", " ")}
              </p>
              <p className="text-2xl md:text-3xl">{data.resultNumber}</p>

              {/* ✅ Next game (WAITING) */}

              <p className="text-[#fc6311]">
                {data.waitingGame.replace("_", " ")}
              </p>
              <Image
                className="mx-auto -mt-2"
                alt="wait icon"
                width={40}
                height={40}
                src="https://i.ibb.co/HffXjQCh/wait.gif"
              />
            </>
          )}
        </div>
      </div>
      <div className="p-3 text-center w-full mx-auto">
        <p className="text-3xl font-black text-black mb-4">DISAWAR</p>
        <div className="flex items-center gap-3 text-black justify-center max-w-[350px] mx-auto">
          <span className="text-xl font-semibold">
            {disawarData?.yesterday || "--"}
          </span>
          <span className="px-1 border bg-green-500 border-black rounded-md mx-2">
            ➜
          </span>
          <span className="text-xl text-black font-semibold">
            {disawarData?.today || (
              <Image
                className="inline"
                alt="wait icon"
                width={28}
                height={28}
                src="https://i.ibb.co/HffXjQCh/wait.gif"
              />
            )}
          </span>
        </div>
      </div>
      {/* === BOTTOM STATIC SECTION === */}
      <section className="flex flex-col md:flex-row md:space-x-1 bg-white">
        <div className="text-center w-full">
          <div className="bg-gradient py-2.5 m-0 font-semibold">
            <p className="text-4xl max-sm:text-lg mt-2 mb-0 md:my-5 text-white max-md:text-2xl">
              -- सीधे सट्टा कंपनी का No. 1 खाईवाल --
            </p>
          </div>
          <div className="flex-1 my-4 max-w-[1000px] mx-auto px-4 max-sm:px-2 pt-4 pb-6 text-base font-semibold leading-6 text-gray-900 min-h-1 bg-gradient">
            <div className="bg-white py-3 border-black border-dashed border-[1px]">
              <p className="uppercase mb-2 font-bold text-base lg:text-xl">
                ♕♕ &nbsp;TEJU BHAI KHAIWAL &nbsp;♕♕
              </p>
              <div className="text-start mx-auto max-w-[400px]">
                {schedule.map((game, index) => (
                  <div
                    key={index}
                    className="flex justify-between sm:text-lg items-center font-semibold py-0.5"
                  >
                    <span className="flex items-center gap-1 text-nowrap max-w-[150px] w-full">
                      <span>🗺️</span>
                      {game.name}
                    </span>
                    <span>←┈┈┈→</span>
                    <span className="text-nowrap">
                      {game.time} <span>⏰</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-white text-xl">💸 Payment Option 💸</p>
            <p className="text-white">
              PAYTM//BANK TRANSFER//PHONE PAY//GOOGLE PAY =&lt; ⏺️
              {setting?.paymentNumber}⏺️
              <br />
              ==========================
              <br />
              ==========================
            </p>
            <p className="text-white">
              🤑Rate list💸
              <br />
              जोड़ी रेट 10-------{setting?.rate}
              <br />
              हरूफ रेट 100-----{setting?.rate}
            </p>
            <p className="uppercase text-white">
              ♕♕ &nbsp;TEJU BHAI KHAIWAL &nbsp;♕♕
            </p>
            <p className="text-white">
              Game play करने के लिये नीचे लिंक पर क्लिक करे
            </p>
            <div className="mx-auto max-w-[300px] mt-4 hover:scale-110 transition-all duration-300">
              <Link
                target="_blank"
                href={`https://wa.me/+${setting?.whatsappNumber}`}
              >
                <Image
                  className="max-sm:w-[200px] mx-auto max-sm:h-16"
                  width={300}
                  height={100}
                  src="https://i.ibb.co/4RJCLbSB/whatsapp.png"
                  alt="whatsapp"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamePage;
