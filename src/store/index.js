import { firestoreAction, vuexfireMutations } from 'vuexfire';
import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/firebase/db';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seasons: [],
    season: {},
    players: [],
    player: {},
  },
  getters: {},
  mutations: {
    SET_SEASON: (state, payload) => {
      state.season = {
        id: payload.id,
        ...payload,
      };
    },
    ...vuexfireMutations,
  },
  actions: {
    bindSeasons: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('seasons', db.collection('seasons'));
    }),
    bindPlayers: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('players', db.collection('players'));
    }),
    deletePlayer: firestoreAction(async (context, playerId) => {
      return await db
        .collection('players')
        .doc(playerId)
        .delete();
    }),
    addPlayer: firestoreAction(async (context, payload) => {
      return await db.collection('players').add(
        Object.assign({}, payload, {
          season: context.state.season,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
      );
    }),
  },
});
