'use client';
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
// components/FavoriteList.tsx
import { useFavorites } from "@/hooks/useFavorites";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function FavoriteList() {
  const { data, isLoading, error } = useFavorites();
  const queryClient = useQueryClient();
  useAuthRedirect("/");
  const handleRemove = async (city: string) => {
    try {
      await axios.post("/api/favorites/remove", { city });
      toast.success(`${city} removed from favorites`);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    } catch (err) {
      toast.error("Failed to remove city");
    }
  };

  if (isLoading) return <p className="text-white">Loading favorites...</p>;
  if (error) return <p className="text-red-500">Error loading favorites</p>;

  return (
    <div className="space-y-4 w-[90%] mt-5 mx-auto">
      <h3 className="text-lg font-semibold text-black">Your Favorite Cities</h3>
      <div className="flex justify-between items-center">
        {data && data.length > 0 ? (
          data.map((city: string, index: number) => (
            <div key={index} className="w-[33%] flex items-center justify-between bg-[#1C274C] text-white p-3 rounded">
              <span>📍{city}</span>
              <button className="cursor-pointer" onClick={() => handleRemove(city)}>
                <Trash className="w-4 h-4 text-red-500" fill="red" />
              </button>   
            </div>
          ))
        ) : (
          <p className="text-[#888]">No Favorites added yet</p>
        )}

      </div>
    </div>
  );
}
