<template>
  <div>
    {{ $route.params.category }}
    <br />
    {{ category }}
  </div>
</template>

<script>
import { category } from "~/queries/querys";
export default {
  data() {
    return {
      query: category
    };
  },
  apollo: {
    category: {
      query: category,
      variables() {
        return { id: this.$route.query.id };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
