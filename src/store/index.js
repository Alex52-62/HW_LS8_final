import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: [],
    },

    mutations: {
        setPaymentListData(state, payload) {
            state.paymentsList = [...state.paymentsList, ...payload];
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoryList(state, payload) {
            state.categoryList = payload
        },
        addCategory(state, payload) {
            state.categoryList.push(payload)
            Vue.set(state.categoryList, payload.id)
        },
        delDataFromPaymentsList(state, payload) {
            state.paymentsList.splice(payload.id, 1)
        },
    },

    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = []
                    for (let i = 1; i < 50; i++) {
                        if (i < 10) {
                            items.push({
                                date: "23.12.2020",
                                category: "Sport",
                                value: i,
                                id: i
                            })
                        } else if (i < 25) {
                            items.push({
                                date: "23.12.2020",
                                category: "Food",
                                value: i,
                                id: i
                            })
                        } else if (i < 28) {
                            items.push({
                                date: "23.12.2020",
                                category: "Education",
                                value: i,
                                id: i
                            })
                        } else if (i < 38) {
                            items.push({
                                date: "23.12.2020",
                                category: "Auto",
                                value: i,
                                id: i
                            })
                        } else if (i < 48) {
                            items.push({
                                date: "23.12.2020",
                                category: "Family",
                                value: i,
                                id: i
                            })
                        } else {
                            items.push({
                                date: "23.12.2020",
                                category: "Health",
                                value: i,
                                id: i
                            })
                        }
                    }
                    resolve(items)
                }, 2000)
            }).then(res => {
                commit('setPaymentListData', res)
            })
        },
        fetchCategory({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Family', 'Health'])
                }, 1000)
            }).then(res => {
                commit('setCategoryList', res)
            })
        }
    },

    getters: {
        getPaymentList: state => [...state.paymentsList, {}],

        getFullPyamentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategoryList: state => state.categoryList
    }
})