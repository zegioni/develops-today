<template>
  <div class="country-search">
    <div class="search-input">
      <input
        v-model="localSearchTerm"
        type="text"
        placeholder="Search Input"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  searchTerm: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["search"]);

const localSearchTerm = ref(props.searchTerm);

const handleInput = () => {
  emit("search", localSearchTerm.value);
};
</script>

<style scoped>
.search-input > input {
  height: 25px;
}
</style>
