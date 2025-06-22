"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Sun,
  Wind,
  Sunset,
  Thermometer,
  Droplets,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWeather } from "@/hooks/useWeather";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function Weather() {
  const [searchCity, setSearchCity] = useState("Cairo");
  const { data, isLoading, error } = useWeather(searchCity);
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCity(inputValue.trim());
      setSearchCity(inputValue.trim());
      console.log(data);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=eb562fe85fe89aa741914e4727daa745`
          );
          const data = await res.json();
          const cityName = data[0]?.name || "Cairo";
          setCity(cityName)
          setSearchCity(cityName);
        } catch (err) {
          console.error("Error fetching city name:", err);
          setSearchCity("Cairo");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setSearchCity("Cairo");
        setCity("Cairo")
      }
    );
  }, []);


  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites/list");
        const data = await res.json();
        if (data.favorites.includes(searchCity)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (searchCity) checkFavorite();
  }, [searchCity]);

  const handleFavoriteClick = async () => {
    try {
      const res = await fetch("/api/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: searchCity }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message); // Toastify or Sonner
        setIsFavorite(true);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("You're not logged in!");
    }
  };


  const {
    temp,
    feelsLike,
    min,
    max,
    humidity,
    windSpeed,
    condition,
    sunrise,
    sunset,
    day,
    date,
  } = useMemo(() => {
    if (!data) return {} as any;
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      day: format(new Date(data.dt * 1000), "EEEE"),
      date: format(new Date(data.dt * 1000), "dd MMM, yyyy"),
    };
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather</p>;

  return (
    <div className=" text-[#0E1421] w-[90%] mx-auto my-10 flex justify-center">
      {/* Main Content */}
      <div className="flex-1  ">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search City..."
                className="pl-10 bg-white border-gray-500 text-gray-500 placeholder:text-[#2a355f] rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-[#742bec] w-25 flex items-center gap-2 rounded-full justify-center py-2 text-white">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{city}</span>
            </div>

            <button className="cursor-pointer" onClick={handleFavoriteClick}>
              {isFavorite ? (
                <Heart className="w-4 h-4 text-red-500" fill="red" />
              ) : (
                <Heart className="w-4 h-4 text-black" />
              )}
            </button>
          </div>

            
        </div>

        <div className="text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
            <div className="space-y-4">
              <div className="bg-[#1c274c]/100 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg">
                <Calendar className="mx-auto mb-2 w-6 h-6" />
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
                  {day}
                </h1>
                <p className="text-[#9fa2a7] text-center">{date}</p>
              </div>
              <div className="bg-[#1c274c]/100 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-[#2a355f]">
                <Thermometer className="mx-auto mb-2 w-6 h-6" />
                <div className="text-5xl sm:text-6xl font-bold mb-2 text-center">
                  {temp}°C
                </div>
                <p className="text-[#9fa2a7] text-center">
                  High: {max}° Low: {min}°
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#1c274c]/100 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-[#2a355f]">
              <Sun className="mx-auto mb-2 w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
                {condition}
              </h2>
              <p className="text-[#9fa2a7] text-center">
                Feels Like {feelsLike}°
              </p>
            </div>
          </div>

          {/* Sun Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-[#1c274c]/100 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#2a355f]">
              <Sun className="mx-auto mb-2 w-6 h-6" />
              <p className="text-sm text-[#9fa2a7] mb-1 text-center">Sunrise</p>
              <p className="text-xl sm:text-2xl font-bold text-center">
                {format(sunrise, "h:mm")} <span className="text-sm">AM</span>
              </p>
            </div>
            <div className="bg-[#1c274c]/100 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#2a355f]">
              <Sunset className="mx-auto mb-2 w-6 h-6" />
              <p className="text-sm text-[#9fa2a7] mb-1 text-center">Sunset</p>
              <p className="text-xl sm:text-2xl font-bold text-center">
                {format(sunset, "h:mm")} <span className="text-sm">PM</span>
              </p>
            </div>
          </div>

          {/* Wind + Humidity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#1c274c]/100 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#2a355f]">
              <Wind className="mx-auto mb-2 w-6 h-6" />
              <p className="text-sm text-[#9fa2a7] mb-2 text-center">Wind</p>
              <p className="text-xl sm:text-2xl font-bold text-center">
                {windSpeed} m/s
              </p>
            </div>
            <div className="bg-[#1c274c]/100 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#2a355f]">
              <Droplets className="mx-auto mb-2 w-6 h-6" />
              <p className="text-sm text-[#9fa2a7] mb-2 text-center">
                Humidity
              </p>
              <p className="text-xl sm:text-2xl font-bold text-center">
                {humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
