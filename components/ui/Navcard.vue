<template>
  <v-card :to="{ name: 'category', params: { category: category.slug } }">
    <v-img :src="category.img" height="180"></v-img>
    <v-card-title class="body-1">
      <v-icon color="primary" class="mr-2">{{ category.icon }} </v-icon>
      {{ category.name }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
