import axios from "axios";
import type { CountryPublicHolidays } from "./country.types";

export const useNextHolidays = () => {
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchNextHolidays = async (
    countryCode: string
  ): Promise<CountryPublicHolidays | null> => {
    try {
      const config = useRuntimeConfig();
      const apiUrl = config.public.NAGER_API_URL;
      const response = await axios.get(
        `${apiUrl}/api/v3/NextPublicHolidays/${countryCode}`
      );
      return response.data[0] || null;
    } catch (err) {
      error.value = "Error loading holidays";
      console.error(err);
      return null;
    }
  };

  return { loading, error, fetchNextHolidays };
};
