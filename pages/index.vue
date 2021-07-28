<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="cat in getCategories" :key="cat.id">
        <BwcUiNavcard :category="cat" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCategories"])
  }
};
</script>

<style lang="scss" scoped></style>
