import { firestoreAction, vuexfireMutations } from 'vuexfire';
import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/firebase/db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seasons: [],
    season: {},
  },
  getters: {},
  mutations: {
    SET_SEASON: (state, payload) => {
      state.season = payload;
    },
    ...vuexfireMutations,
  },
  actions: {
    bindSeasons: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('seasons', db.collection('seasons'));
    }),
  },
});
