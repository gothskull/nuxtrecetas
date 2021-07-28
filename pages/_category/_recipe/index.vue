<template>
  <v-container>
    <h1 class="secondary--text">{{ recipe.name }}</h1>
    <h5 class="secondary--text">{{ recipe.category.name }}</h5>
    <v-card class="mt-3">
      <v-card-title>
        <v-icon class="mr-2">mdi-information</v-icon>
        Información
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="black--text">
            <v-chip class="px-4 mr-2" color="primary" outlined>
              <v-icon left>mdi-account-group</v-icon>
              Servicios: {{ recipe.servings }}
            </v-chip>
            <v-chip class="px-4 mr-2" color="primary" outlined>
              <v-icon left>mdi-clock</v-icon>
              Duración: {{ formatedTime }}
            </v-chip>
            <v-chip class="px-4 mr-2" color="primary" outlined>
              <v-icon left>mdi-account-edit</v-icon>
              Autor: {{ recipe.duration }}
            </v-chip>
            <v-divider class="my-3"></v-divider>
            <h4 class="body-1">Descripción</h4>
            <div v-html="recipe.description"></div>
          </v-col>
          <v-col cols="6">
            <v-img :src="recipe.img" height="200"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="mt-3">
      <v-row>
        <v-col cols="5">
          <v-card>
            <v-card-title>
              <v-icon class="mr-2">mdi-fridge</v-icon> Ingredientes
            </v-card-title>
            <v-list dense>
              <v-list-item v-for="(item, i) in recipe.ingredients" :key="i">
                - {{ item }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card>
            <v-card-title>
              <v-icon class="mr-2">mdi-stove</v-icon> Preparación
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item
                small
                v-for="(item, k) in recipe.steps"
                :key="k + Math.random()"
                color="secondary"
              >
                {{ item }}
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mt-3">
      <BwcUiBackBtn label="Volver a recetas" />
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    formatedTime() {
      let hours = Math.floor(this.recipe.duration / 60);
      let minutes = this.recipe.duration % 60;
      let total = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
      return total;
    }
  },
  async asyncData({ app, route }) {
    const client = app.apolloProvider.defaultClient;
    const id = route.params.recipe;
    const query = {
      query: require("~/queries/recipe.gql"),
      variables: { id }
    };
    let recipe = [];
    await client
      .query(query)
      .then(data => {
        console.log(data);
        recipe = data.data.recipe;
      })
      .catch(error => {
        console.log(error);
      });
    return { recipe };
  }
};
</script>

<style lang="scss" scoped></style>
