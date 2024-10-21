import axios from "axios";
import type { Country } from "./country.types";

export const useCountries = () => {
  const countries = ref<Country[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchCountries = async () => {
    try {
      const config = useRuntimeConfig();
      const apiUrl = config.public.NAGER_API_URL;

      const response = await axios.get(`${apiUrl}/api/v3/AvailableCountries`);

      countries.value = response.data;

      return countries.value;
    } catch (err) {
      error.value = "Load error";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { countries, loading, error, fetchCountries };
};
