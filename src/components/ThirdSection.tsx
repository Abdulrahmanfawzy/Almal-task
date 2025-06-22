

const statistics = [
  { num: "23+", data: "Years of experience" },
  { num: "50+", data: "Fantasy world" },
  { num: "864+", data: "Customers feel happy" }
];

export default function ThirdSection() {
  return (
    <div className="flex justify-between flex-wrap w-[90%] mx-auto items-center">
        <div className="w-full md:w-[43%]">
            <img src="/Ellipse 5.png" className=" scale-x-[-1] h-[550px] -left-20 w-full  relative" alt="Ellipse image" />
        </div>
        <div className="w-full md:w-[56%]">
            <p className="text-[#171D2E]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
        </div>
    </div>
  )
}
