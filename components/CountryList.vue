<template>
  <div class="country-list">
    <div class="title">Countries List</div>

    <div
      v-for="country in paginatedCountries"
      :key="country.countryCode"
      class="card-country"
    >
      <nuxt-link :to="`/country-page/${country.countryCode}`" class="country-name">
        {{ country.name }}
      </nuxt-link>
    </div>

    <div class="list-country-pagination">
      <button :disabled="currentPage === 1" @click="$emit('prev')">
        Prev
      </button>
      <span>Page {{ currentPage }} из {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="$emit('next')">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import type { Country } from '@/composables/country.types';

const props = defineProps<{
  countries: Country[];
  searchTerm: string;
  currentPage: number;
}>();

const filteredCountries = computed(() => {
  return props.countries.filter((country: Country) =>
    country.name.toLowerCase().includes(props.searchTerm.toLowerCase())
  );
});

const totalPages = computed(() => {
  const itemsPerPage = 6;
  return Math.ceil(filteredCountries.value.length / itemsPerPage);
});

const paginatedCountries = computed(() => {
  const start = (props.currentPage - 1) * 6;
  return filteredCountries.value.slice(start, start + 6);
});
</script>

<style scoped>
.country-list {
  margin-top: 20px;
}

.country-list > .title {
  margin-bottom: 20px;
  font-size: 24px;
}

.country-list > .card-country {
  border: 1px solid black;
  padding: 15px;
  text-align: center;
  width: 280px;
  margin-bottom: 20px;
}

.country-name {
  text-decoration: none;
  outline: none;
  color: rgb(0, 0, 0);
}

.list-country-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
