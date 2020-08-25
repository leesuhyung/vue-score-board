<template>
  <v-app>
    <v-app-bar app flat color="white">
      <v-btn text>
        player
      </v-btn>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-on="on" v-bind="attrs">
            <v-icon small dense>mdi-flag</v-icon>
            {{ $store.state.season.title }}
          </v-btn>
        </template>

        <v-list flat>
          <v-list-item
            v-for="season in $store.state.seasons"
            :key="season.id"
            @click="setSeason(season)"
          >
            <v-list-item-title
              :class="{
                'primary--text': $store.state.season.id === season.id,
              }"
            >
              <template v-if="season.active">
                <v-badge inline class="ma-0" content="진행중">
                  {{ season.title }}
                </v-badge>
              </template>
              <template v-else>
                {{ season.title }}
              </template>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>season</v-card-title>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="season in $store.state.seasons" :key="season.id">
                      <td>{{ season.id }}</td>
                      <td>{{ season.title }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>players</v-card-title>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>teamId</th>
                      <th>tier</th>
                      <th>tribe</th>
                      <th>role</th>
                      <th>update</th>
                      <th>delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="player in players" :key="player.id">
                      <td>{{ player.id }}</td>
                      <td>{{ player.name }}</td>
                      <td>{{ player.teamId }}</td>
                      <td>{{ player.tier }}</td>
                      <td>{{ player.tribe }}</td>
                      <td>{{ player.role }}</td>
                      <td>
                        <v-btn
                          x-small
                          color="primary"
                          @click="bindPlayer(player)"
                          >update</v-btn
                        >
                      </td>
                      <td>
                        <v-btn
                          x-small
                          color="error"
                          @click="
                            $firestoreRefs.players.doc(player.id).delete()
                          "
                          >delete</v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <v-card-actions>
                <v-spacer />
                <v-btn x-small @click="setPlayer">add</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-form>
              <v-text-field label="name" v-model="player.name" />
              <v-text-field label="teamId" v-model="player.teamId" />
              <v-text-field label="tier" v-model="player.tier" />
              <v-text-field label="tribe" v-model="player.tribe" />
              <v-text-field label="role" v-model="player.role" />
            </v-form>
            <v-card-actions>
              <v-spacer />
              <v-btn x-small @click="dialog = !dialog">close</v-btn>
              <v-btn x-small color="primary" @click="addPlayer">create</v-btn>
              <v-btn x-small color="success" @click="updatePlayer"
                >update</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '@/firebase/db';
const players = db.collection('players');

export default {
  name: 'App',
  data: () => ({
    players: [],
    player: {},
    dialog: false,
  }),
  firestore: {
    players: players,
  },
  methods: {
    setSeason(season) {
      this.$store.commit('SET_SEASON', season);
    },
    setPlayer() {
      this.player = {};
      this.dialog = true;
    },
    async addPlayer() {
      this.$firestoreRefs.players.add(Object.assign(this.player));
      this.dialog = false;
    },
    async bindPlayer(player) {
      await this.$bind('player', players.doc(player.id), { reset: false });
      this.dialog = true;
    },
    async updatePlayer() {
      await this.$firestoreRefs.player.update(this.player);
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .v-badge__badge {
    font-size: 10px;
    height: auto;
  }
}
</style>
