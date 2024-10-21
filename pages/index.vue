<template>
    <div class="country-view">
      <div class="left-content">
        <CountrySearch :search-term="searchTerm" @search="searchCountries" />
        <CountryList
          :countries="countriesStore.countries"
          :search-term="searchTerm"
          :current-page="currentPage"
          @next="nextPage"
          @prev="prevPage"
        />
      </div>
      <div class="right-content">
        <CountriesWidget :countries="countriesStore.countries" />
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useCountriesStore } from "@/stores/countriesStore";
import CountrySearch from "@/components/CountrySearch.vue";
import CountriesWidget from "@/components/CountriesWidget.vue";

const countriesStore = useCountriesStore();

const currentPage = ref(1);
const searchTerm = ref("");

onMounted(loadCountries);

async function loadCountries() {
  await countriesStore.loadCountries();
}

const searchCountries = (term: string) => {
  searchTerm.value = term;
  currentPage.value = 1;
};

const nextPage = () => {
  currentPage.value++;
};

const prevPage = () => {
  currentPage.value--;
};
</script>

<style>
.country-view {
  display: flex;
  gap: 35px;
}

.left-content {
  display: flex;
  flex-direction: column;
}

.right-content {
  flex: 1;
}
</style>
