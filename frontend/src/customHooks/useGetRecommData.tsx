import { useContext, useEffect, useState } from "react";
import { RecommendationsType } from "../types/types";
import axios from "axios";
import { TokenContext } from "../contexts/tokenContext";
import {
  activityRecomm,
  mealRecomm,
  tipsRecomm,
} from "../utils/staticPreviewData";

const API_BASE_URL = "http://localhost:3000/api";

// All possible fetchTypes are: 1. meal, 2. activity and 3. tips

export default function useGetRecommData(
  fetchType: string
  //   type?: string // <-- This could be added to request for optimization
): RecommendationsType[] {
  const [data, setData] = useState<RecommendationsType[]>([]);
  const { isLoggedIn } = useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/getRecommData/${fetchType}`
          );
          setData(response.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error("Error sending the data: ", error.response.data);
            return { error: error.response.data };
          }
        }
        return data;
      } else {
        switch (fetchType) {
          case "activity":
            setData(activityRecomm);
            break;
          case "meal":
            setData(mealRecomm);
            break;
          case "tip":
            setData(tipsRecomm);
            break;
        }
      }
    };
    fetchData();
  }, [data, fetchType, isLoggedIn]);
  return data;
}
