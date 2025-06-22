"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFavorites = async (): Promise<string[]> => {
  const res = await axios.get("/api/favorites/list");
  return res.data.favorites;
};

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });
};
