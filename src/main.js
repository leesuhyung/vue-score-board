import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import './registerServiceWorker';
import { firestorePlugin } from 'vuefire';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

store.dispatch('bindSeasons').then(seasons => {
  const activeSeason = seasons.find(season => season.active);
  store.commit('SET_SEASON', activeSeason);
});

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
