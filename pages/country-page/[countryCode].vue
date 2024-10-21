<template>
  <div>
    <h1>{{ countryName }}</h1>
    <div class="holidays">
      <div v-if="holidays.length === 0">
        No holidays available for this year.
      </div>

      <div v-for="holiday in holidays" :key="holiday.date" class="card-holiday">
        <div class="holiday-name">{{ holiday.name }}</div>
        <div class="holiday-date">{{ holiday.date }}</div>
      </div>
    </div>
    <div class="list-years">
      <button
        v-for="year in years"
        :key="year"
        :class="{ active: selectedYear === year }"
        @click="fetchHolidays(year)"
      >
        {{ year }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useHolidays } from "@/composables/useHolidays";
import type { CountryPublicHolidays } from "@/composables/country.types";
import { useCountriesStore } from "@/stores/countriesStore";

const route = useRoute();
const countryCode = Array.isArray(route.params.countryCode)
  ? route.params.countryCode[0]
  : route.params.countryCode;

const countriesStore = useCountriesStore();

onMounted(async () => {
  if (countriesStore.countries.length === 0) {
    await countriesStore.loadCountries();
  }
});

const countryName = ref<string | null>(null);
const holidays = ref<CountryPublicHolidays[]>([]);
const selectedYear = ref(new Date().getFullYear());
const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

watchEffect(() => {
  const country = countriesStore.getCountryByCode(countryCode);
  countryName.value = country ? country.name : "Loading";
});

const { fetchHolidaysByYear } = useHolidays();

const fetchHolidays = async (year: number) => {
  selectedYear.value = year;
  holidays.value = (await fetchHolidaysByYear(countryCode, year)) || [];
};

onMounted(async () => {
  await fetchHolidays(selectedYear.value);
});
</script>

<style scoped>
.holidays {
  margin-top: 20px;
  height: 382.13px;
  overflow: auto;
}

.list-years {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.list-years button {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: white;
}

.list-years button.active {
  background-color: #007bff;
  color: white;
}

.card-holiday {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
