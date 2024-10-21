import axios from "axios";
import type { CountryPublicHolidays } from "./country.types";

export const useHolidays = () => {
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchHolidaysByYear = async (
    countryCode: string,
    year: number
  ): Promise<CountryPublicHolidays[] | []> => {
    try {
      const config = useRuntimeConfig();
      const apiUrl = config.public.NAGER_API_URL;
      const response = await axios.get(
        `${apiUrl}/api/v3/PublicHolidays/${year}/${countryCode}`
      );
      return response.data || [];
    } catch (err) {
      console.error("Error fetching holidays by year:", error);
      console.error(err);
      return [];
    }
  };

  return { loading, error, fetchHolidaysByYear };
};
