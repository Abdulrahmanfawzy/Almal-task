

const statistics = [
  { num: "23+", data: "Years of experience" },
  { num: "50+", data: "Fantasy world" },
  { num: "864+", data: "Customers feel happy" }
];

export default function SecondSection() {
  return (
    <div className="min-h-screen bg-[#171D2E] relative overflow-hidden">

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          <circle cx="600" cy="200" r="150" stroke="currentColor" strokeWidth="1" />
          <circle cx="600" cy="200" r="200" stroke="currentColor" strokeWidth="1" />
          <circle cx="600" cy="200" r="250" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="0" x2="700" y2="600" stroke="currentColor" strokeWidth="1" />
          <line x1="200" y1="0" x2="800" y2="400" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container w-[90%] mx-auto  py-16 relative z-10">
        <div className="block md:flex items-center justify-between">

            <div className="space-y-8 w-[100%] md:w-[40%]">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">Almal GTM</h1>

                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Has various experiences and every year finally mexsa finds its breaking point to focus on visualization
                and maintain its consistency to become the number one company in the world
                </p>

                {/* Statistics row */}
                <div className="flex gap-8 pt-8">
                {statistics.map(item=><div key={item.num} className="text-left">
                        <div className="text-3xl font-bold text-white mb-1">{item.num}</div>
                        <div className="text-sm text-gray-400">{item.data}</div>
                    </div>
                )}
                </div>

                {/* Additional statistic card */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 w-full">
                <div className="text-2xl font-bold text-white mb-2">120+ Billion</div>
                <div className="text-sm text-gray-400">Many of them have tried new world fantasy</div>
                </div>
            </div>

           <div className="relative hidden md:block md:w-[70%] -right-20 aspect-square mx-auto">
                <img
                    src="/Image.png"
                    alt="Background Image"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <img
                    src="/logo.png"
                    alt="Logo Image"
                    className="w-[50%] sm:w-[40%] md:w-[50%] absolute -mt-10 left-[51%] -translate-x-1/4 h-auto"
                    />
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}
