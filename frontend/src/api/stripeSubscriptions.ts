import axios from "axios";
import { SubscriptionData } from "../types/typesFrontend";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const stripeSubscription = async (
  idToken: string | null,
  route: string // the action that will be done: fetch, cancel or start
) => {
  try {
    if (route == "get-subscription") {
      const storedSubscriptionStatus =
        sessionStorage.getItem("subscriptionStatus");
      // jos tilaustiedot löytyy session storagesta kun halutaan hakea tilaustiedot,
      // palautetaan ne suoraan sieltä
      if (storedSubscriptionStatus) {
        return storedSubscriptionStatus;
      }
    }
    // tilaustietoja ei löytynyt session storagesta tai halutaan aloittaa/keskeyttää tilaus
    const response = await axios.post(
      `${API_BASE_URL}/${route}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    if (!response) {
      return null;
    }
    sessionStorage.setItem(
      "storedSubscriptionStatus",
      JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Tilauksen hakeminen epäonnistui:", error.response.data);
      return { error: error.response.data };
    }
    console.error("Virhe tilausta haettaessa:", error);
    throw error;
  }
};

const getSubscriptionStatus = async (
  idToken: string | null
): Promise<boolean | null> => {
  if (idToken) {
    try {
      let subscriptionStatus: SubscriptionData;

      // Yritetään ensin hakea tilaus session storagesta
      const storedSubscriptionStatus =
        sessionStorage.getItem("subscriptionStatus");
      if (storedSubscriptionStatus) {
        subscriptionStatus = JSON.parse(storedSubscriptionStatus);
      } else {
        // Jos ei löydy, haetaan backendista
        const response = await stripeSubscription(idToken, "get-subscription");
        subscriptionStatus = response;
      }
      if (!subscriptionStatus) {
        return null;
      }
      const currentTimestampInSeconds = Math.floor(new Date().getTime() / 1000);

      if (
        subscriptionStatus.cancel_at_period_end &&
        subscriptionStatus.current_period_end < currentTimestampInSeconds
      ) {
        return false; // Tilaus on loppunut kokonaan
      } else {
        return true; // Tilaus on käynnissä tai lopetettu, mutta maksettua aikaa on vielä jäljellä
      }
    } catch (error) {
      console.error("Tilausta noudettaessa tapahtui virhe.");
      return null;
    }
  }
  return null;
};

const updateCancelAtPeriodEnd = async (idToken: string, email: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/update-cancellation`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Tilauksen hakeminen epäonnistui:", error.response.data);
      return { error: error.response.data };
    }
    console.error("Virhe tilausta haettaessa:", error);
    throw error;
  }
};

export { stripeSubscription, getSubscriptionStatus, updateCancelAtPeriodEnd };
