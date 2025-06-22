import Image from "next/image";
import EmailSignup from "./EmailSignup";
import { ChevronDown } from "lucide-react";

const statistics = [
  { num: "500+", data: "Keynote Speakers" },
  { num: "1000+", data: "Speakers" },
  { num: "15K+", data: "Attendees" }
];

export default function HeroSection() {
  return (
    <>
        <section className="min-h-screen relative -mt-20 flex items-center justify-center px-4">
            <div className="relative z-10 text-center max-w-4xl">
                <h1 className="text-[42px] md:text-[60px] lg:text-[86px] mb-10 font-bold text-[#373737] leading-tight">
                Elevating Events to <br />
                <span className="text-[#7FB7DA]">Example</span>
                </h1>

                <EmailSignup />

                <div className="flex justify-center mt-10 absolute left-1/2 -translate-x-1/2">
                <ChevronDown className="w-6 h-6 text-gray-400" />
                </div>
            </div>

            {/* <img
                src="/Ellipse 1575.png"
                alt="Hero Image"
                className="w-[300px] sm:w-[400px] md:w-[500px] top-0 -left-20 h-auto absolute z-0"
            />

            <img
                src="/Ellipse 1575.png"
                alt="Hero Image"
                className="w-[500px] sm:w-[600px] md:w-[800px] top-0 left-1/2 -translate-x-1/2 h-auto absolute z-[-1]"
            /> */}

            <Image
                src="/Ellipse 1575.png"
                alt="Hero Image"
                width={500} // اختار أكبر عرض ممكن لتتناسب مع responsive
                height={500} // مش مهم الطول بدقة لو عندك h-auto بس لازم يتحط قيمة
                className="w-[300px] sm:w-[400px] md:w-[500px] top-0 -left-20 h-auto absolute z-0"
                />

                <Image
                src="/Ellipse 1575.png"
                alt="Hero Image"
                width={800}
                height={800}
                className="w-[500px] sm:w-[600px] md:w-[800px] top-0 left-1/2 -translate-x-1/2 h-auto absolute z-[-1]"
                />


        </section>

        <div className="relative -mt-100 md:-mt-40 bg-[url('/wave.svg')] bg-no-repeat bg-top bg-cover" >
            <div className="relative w-[85%] m-auto py-16 bg-transparent">
                <div className="flex flex-wrap justify-between gap-y-10 pt-85 md:pt-45 text-center relative z-10">
                    {statistics.map((item, index) => (
                        <div key={index} className="w-full md:w-1/3">
                            <div className="text-[52px] sm:text-[72px] md:text-[70px] font-semibold text-white">
                                {item.num}
                            </div>
                            <div className="text-gray-400 text-xl sm:text-2xl">{item.data}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  );
}
