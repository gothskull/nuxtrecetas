<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
    >
      <v-list color="primary--text">
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                Inicio
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="link in links"
            :key="link.id"
            :to="{ name: 'category', params: { category: link.slug } }"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ link.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="titulo"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-model="search" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Buscar receta</v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              dense
              label="Nombre receta"
              v-model="findReceta"
              @input="searchRecipe"
            ></v-text-field>

            <v-list v-if="findReceta.length != 0">
              <v-list-item
                v-for="recipe in recipes"
                :key="recipe.id"
                @click="seeRecipe(recipe.category.slug, recipe.id)"
              >
                {{ recipe.name }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      titulo: "Bogotá Web Company",
      search: false,
      findReceta: ""
    };
  },
  computed: {
    ...mapGetters({
      links: "getCategories",
      recipes: "getRecipes"
    }),
    filtrarRecipe() {
      return this.recipes.filter(recipe =>
        recipe.name.toLowerCase().match(this.findReceta.toLowerCase())
      );
    }
  },
  methods: {
    seeRecipe(category, recipe) {
      (this.findReceta = ""),
        (this.search = false),
        this.$router.push({
          name: "category-recipe",
          params: { category, recipe }
        });
    },
    searchRecipe() {
      this.$store.dispatch("searchRecipe", this.findReceta);
    }
  }
};
</script>

<style lang="scss" scoped></style>
