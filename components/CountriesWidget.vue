<template>
  <div class="countries-widget">
    <div class="country-random-list">
      <div class="title">Random Countries Widget</div>
      <div class="container-random-country">
        <div
          v-for="(country, index) in randomCountries"
          :key="index"
          class="card-random-country"
        >
          <nuxt-link
            :to="`/country-page/${country.countryCode}`"
            class="country-name"
          >
            {{ country.name }}
          </nuxt-link>
          <div class="country-holiday">
            {{ holidays[index]?.name }}
          </div>
          <div class="country-date">
            {{ holidays[index]?.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import type {
  Country,
  CountryPublicHolidays,
} from "@/composables/country.types";
import { useNextHolidays } from "@/composables/useNextHolidays";

const props = defineProps<{
  countries: Country[];
}>();

const { fetchNextHolidays } = useNextHolidays();

const randomCountries = ref<Country[]>([]);
const holidays = ref<(CountryPublicHolidays | null)[]>([]);

const getRandomCountries = (countries: Country[]) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    return [];
  }
  const shuffled = countries.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const fetchHolidays = async () => {
  holidays.value = [];
  for (const country of randomCountries.value) {
    const holiday = await fetchNextHolidays(country.countryCode);
    holidays.value.push(holiday);
  }
};

watch(
  () => props.countries,
  (newCountries) => {
    randomCountries.value = getRandomCountries(newCountries);
    fetchHolidays();
  },
  { immediate: true }
);
</script>

<style scoped>
.countries-widget {
  flex: 1;
}

.country-random-list > .title {
  font-size: 24px;
  margin-bottom: 20px;
}

.country-random-list > .container-random-country {
  border: 1px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.card-random-country {
  border: 1px solid black;
  padding: 15px 5px 16px 5px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.country-name {
  text-decoration: none;
  outline: none;
  color: rgb(0, 0, 0);
}
</style>
