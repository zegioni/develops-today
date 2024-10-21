import { defineStore } from "pinia";
import type { Country } from "@/composables/country.types";
import { useCountries } from "@/composables/useCountries";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countries: [] as Country[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getCountryByCode: (state) => (countryCode: string) => {
      return state.countries.find(country => country.countryCode === countryCode);
    }
  },
  actions: {
    async loadCountries() {
      const { fetchCountries } = useCountries();
      this.loading = true;
      try {
        this.countries = await fetchCountries();
      } catch (error) {
        console.error("error", error);
        this.error = "error";
        this.countries = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
