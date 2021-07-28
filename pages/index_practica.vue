<template>
  <v-container>
    <div class="mb-2" v-for="cat in categories" :key="cat.id">
      <v-btn
        :to="{
          name: 'category',
          params: { category: cat.slug },
          query: { id: cat.id }
        }"
        >{{ cat.name }} - {{ counter }}
      </v-btn>
      <v-btn @click="callMutation">Aumentar</v-btn>
      <v-btn @click="callAction">Acción aumentar</v-btn>
      <v-btn @click="callReducir">Reducir</v-btn>
      <div>Contador: {{ getCounter }}</div>
    </div>
  </v-container>
</template>
<script>
import { categories } from "~/queries/querys";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      query: categories
    };
  },
  computed: {
    ...mapGetters(["getCounter"]),
    counter() {
      return this.$store.getters.getCounter;
    }
  },
  //  computed: {
  //   categories() {
  //     return this.$store.getters.getCategories;
  //   }
  // }
  // async fetch() {
  //   const client = this.$apollo.getClient();
  //   const query = {
  //     query: require("~/queries/query.gql")
  //   };

  //   await client.query(query).then(data => {
  //     this.categories = data.data.categories;
  //   });
  // }

  //   async asyncData(context) {
  //     const client = context.app.apolloProvider.defaultClient;
  //     const query = {
  //       query: require("~/queries/query.gql")
  //     };
  //     let categories = [];
  //     await client.query(query).then(data => {
  //       categories = data.data.categories;
  //     });

  //     return { categories };
  //   }
  methods: {
    goUsers(ruta) {
      this.$router.push(ruta);
    },
    callMutation() {
      return this.$store.commit("increment");
    },
    callAction() {
      return this.$store.dispatch("incrementAct");
    },
    callReducir() {
      return this.$store.commit("reducir");
    }
  },
  apollo: {
    categories: {
      query: categories
    }
  }
};
</script>
