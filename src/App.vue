<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <button type="button" @click="addDocuments">addDocuments</button>

    {{ documents }}
  </div>
</template>

<script>
import { db } from '@/firebase/db';

export default {
  name: 'App',
  data() {
    return {
      documents: [],
    };
  },
  firebase: {
    documents: db.ref('documents'),
  },
  methods: {
    addDocuments() {
      this.$firebaseRefs.documents.push({
        name: 'test',
        data: [
          {
            key1: 'foo',
            key2: 'bar',
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
