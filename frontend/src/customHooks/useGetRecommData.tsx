import { useContext, useEffect, useState } from "react";
import { RecommendationsType } from "../types/recommTypes";
import axios from "axios";
import { TokenContext } from "../contexts/tokenContext";
import { activityRecomm } from "../utils/previewData/activityRecomm";
import { mealRecomm } from "../utils/previewData/mealRecomm";
import { tipsRecomm } from "../utils/previewData/tipsRecomm";
import { getSubscriptionStatus } from "../api/stripeSubscriptions";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// All possible fetchTypes are: 1. meal, 2. activity and 3. tips

export default function useGetRecommData(
  fetchType: string
  //   type?: string // <-- This could be added to request for optimization
): RecommendationsType[] {
  const [data, setData] = useState<RecommendationsType[]>([]);
  const { idToken } = useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      // Use session storage OR fetch & set the data:

      let subscribed;
      if (idToken) {
        subscribed = await getSubscriptionStatus(idToken);
      }

      if (idToken && subscribed) {
        // Checking sessionStorage:
        const sessionRecommData = sessionStorage.getItem(fetchType);
        let recommData;

        if (sessionRecommData) {
          recommData = JSON.parse(sessionRecommData);
        }

        // Using sessionStorage if it's longer than empty array:
        if (recommData && recommData.length > 0) {
          setData(recommData);
        } else {
          // Fetching the data:
          try {
            const response = await axios.get(
              `${API_BASE_URL}/getRecommData/${fetchType}`
            );
            setData(response.data);
            sessionStorage.setItem(fetchType, JSON.stringify(response.data));
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              console.error("Error sending the data: ", error.response.data);
              return { error: error.response.data };
            }
          }
        }

        return data;
        // Use preview data:
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
  }, [fetchType, idToken]); // eslint-disable-line react-hooks/exhaustive-deps
  return data;
}
