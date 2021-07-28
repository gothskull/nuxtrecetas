<template>
  <v-container>
    <h1 class="secondary--text">
      <v-icon large class="secondary--text">{{ category.icon }} </v-icon>
      {{ category.name }}
    </h1>
    <p class="secondary--text">
      {{ category.descripcion }}
    </p>
    <v-row>
      <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
        <BwcUiNavCardRecipe :recipe="recipe" />
      </v-col>
    </v-row>
    <div class="mt-3" v-if="recipes.length == 0">
      <v-alert type="info">No hay recetas para mostrar</v-alert>
    </div>
    <div class="mt-3">
      <BwcUiBackBtn label="Volver al inicio" />
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    category() {
      const slug = this.$route.params.category;
      return this.$store.getters.getCategories.find(
        category => category.slug == slug
      );
    }
  },
  async asyncData({ app, route }) {
    const client = app.apolloProvider.defaultClient;
    const slug = route.params.category;
    const query = {
      query: require("~/queries/recipes.gql"),
      variables: { slug }
    };
    let recipes = [];
    await client
      .query(query)
      .then(data => {
        console.log(data.data.recipes);
        recipes = data.data.recipes;
      })
      .catch(e => console.log(e));
    return { recipes };
  }
};
</script>

<style lang="scss" scoped></style>
