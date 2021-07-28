export const state = () => ({
    counter: 0,
    categories: [],
    loadRecipes: []
})

export const getters = {
    getRecipes(state) {
        return state.loadRecipes
    },
    getCategories(state) {
        return state.categories
    },
    getCounter(state) {
        return state.counter
    }
}

export const mutations = {
    setLoadRecipes(state, payload) {
        return state.loadRecipes = payload
    },
    setCategories(state, payload) {
        return state.categories = payload
    },
    increment(state) {
        state.counter++;
    },
    reducir(state) {
        state.counter--;
    }
}

export const actions = {

    async nuxtServerInit({ commit }) {

        // return new Promise((resolve, reject) => {

        const client = this.app.apolloProvider.defaultClient
        const query = {
            query: require('~/queries/query.gql')
        }
        await client.query(query).then(data => {
            commit('setCategories', data.data.categories)
            // commit('setLoadRecipes', data.data.recipes)
            // resolve()
        }).catch(error => {
            console.log(error)
            // reject()
        })

        // })

    },

    incrementAct(context) {
        setTimeout(() => {
            context.commit('increment')
        }, 1000)
    },
    searchRecipe({ commit }, payload) {
        const client = this.app.apolloProvider.defaultClient
        const query = {
            query: require('~/queries/searchRecipe.gql'),
            variables: { term: payload }
        }

        client.query(query).then(data => {
            commit('setLoadRecipes', data.data.recipes)
        }).catch(error => console.log(error))
    }
}






























