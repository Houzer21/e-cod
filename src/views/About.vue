<template>
  <div>
    <section class="section">
      <div class="row m-0">
        <div class="col-md-6 p-0">
          <h2 class="section__heading">teams</h2>
          <p class="section__paragraph">
            Below are teams registered so far. Click on any image below to see more information.
          </p>
        </div>
      </div>
      <div class="row m-0 mt-5 justify-content-center justify-content-md-between">
        <div class="col-6 col-md-2 p-2" v-for="team in teams" :key="team.id">
          <div class="card card--teams flex-column" @click="openDialog(team)">
            <img src="@/assets/img/placeholder-with-text.png" class="card__img" :placeholder="`${team.name} logo`" />
            <div class="card__text">
              <h3 class="card__heading">{{team.data.name}}&nbsp;&nbsp;[{{team.data.abbr}}]</h3>
              <h4 class="card__heading card__heading--small">{{team.data.country}}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Dialog for teams --->
    <section class="modal-container" v-if="dialog">
      <div class="modal">
        <header class="modal__header">
          <div>
            team information
          </div>
          <button class="modal__btn" @click="closeDialog()">
            <i class="lni lni-close"></i>
          </button>
        </header>
        <div class="modal__body">
          <div class="row m-0">
            <div class="col-md-3 p-0">
              <img src="@/assets/img/placeholder-with-text.png" class="modal__img" placeholder="Team logo" />
            </div>
            <div class="col-md-4 p-0">
              <h3 class="modal__heading mb-2 mb-md-0">
                {{ dialogData.data.name }}
              </h3>
              <div class="row m-0">
                <div class="col-6 p-0">
                  <i class="lni lni-world"></i>
                  {{ dialogData.data.country }}
                </div>
                <div class="col-6 p-0">
                  <i class="lni lni-users"></i>
                  {{ dialogData.data.players.length }}
                </div>
              </div>
            </div>
          </div>
          <div class="my-5">
            <h2 class="section__heading">team members</h2>
            <div class="row m-0 justify-content-center justify-content-md-between">
              <div class="col-6 col-md-3 p-3" v-for="player in dialogData.data.players" :key="player.name">
                <div class="card card--teams flex-column">
                  <img src="@/assets/img/placeholder-with-text.png" class="card__img" placeholder="Team logo" />
                  <h3 class="card__heading">
                    {{ player.name }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 class="section__heading">last five match ups</h2>
            <div class="row m-0 justify-content-center justify-content-md-between">
              <div class="col-6 col-md-3 py-2 px-2" v-for="score in scores" :key="score.id">                
                <template v-if="dialogData.data.abbr === score.data.away.abbr || dialogData.data.abbr === score.data.home.abbr">
                  <div class="card card--activity">
                    <div class="card__top">
                      <div class="row m-0 justify-content-between align-items-center">
                        <div class="col-6 p-0">
                          <h3 class="card__heading">
                            {{ score.data.home.abbr }}
                          </h3>
                          <h4 class="card__heading card__heading--small">
                            {{ score.data.home.country }}
                          </h4>
                        </div>
                        <div class="col-3 p-0">
                          <h3 class="card__heading card__heading--big">
                            {{ score.data.home.score }}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div class="card__top" style="border: none;">
                      <div class="row m-0 justify-content-between align-items-center">
                        <div class="col-6 p-0">
                          <h3 class="card__heading">
                            {{ score.data.away.abbr }}
                          </h3>
                          <h4 class="card__heading card__heading--small">
                            {{ score.data.away.country }}
                          </h4>
                        </div>
                        <div class="col-3 p-0">
                          <h3 class="card__heading card__heading--big">
                            {{ score.data.away.score }}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeroVue from '@/components/AppHero.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    'app-hero': AppHeroVue
  },
  data() {
    return {
      dialog: false,
      dialogData: {}
    }
  },
  computed: {
    ...mapState(['teams','scores'])
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['getTeams','getScores']),
    init() {
      this.getTeams()
      this.getScores()
    },
    openDialog(team) {
      this.dialogData = team
      this.dialog = !this.dialog
    },
    closeDialog() {
      this.dialogData = []
      this.dialog = !this.dialog
    }
  }
}
</script>
