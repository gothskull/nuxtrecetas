<template>
  <div>
    <v-card
      :to="{
        name: 'category-recipe',
        params: { category: recipe.category.slug, recipe: recipe.id }
      }"
    >
      <v-img :src="recipe.img" height="180"></v-img>
      <v-card-text>
        <v-row>
          <v-col cols="7" class="">
            <h3>{{ recipe.name }}</h3>
          </v-col>
          <v-col cols="5" class="d-flex justify-end">
            <div>
              <v-icon> mdi-heart </v-icon>
              <span> {{ recipe.likes }} </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
