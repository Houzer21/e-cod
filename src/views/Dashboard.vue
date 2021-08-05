<template>
  <section class="section">
    <div class="row m-0">
      <div class="col-md-8 col-12 p-0">
        <h2 class="section__heading">Hello, Admin</h2>
      </div>
      <div class="col-md-2 col-6 py-3 py-md-0 p-0">
        <button class="form__btn px-1 py-3" style="background-color: rgba(255,255,255, .1)" @click="teamModal = !teamModal">
          <i class="lni lni-plus"></i>
          Add New Team
        </button>
      </div>
      <div class="col-md-2 col-6 py-3 py-md-0 pr-0">
        <button class="form__btn px-1 py-3" style="background-color: rgba(255,255,255, .1)" @click="newModal = !newModal">
          <i class="lni lni-plus"></i>
          Add New Game
        </button>
      </div>
    </div>
    <div class="scoresheet mt-3">
      <div class="row m-0 mt-2 justify-content-between" v-for="score in scores" :key="score.id">
        <div class="col-11 p-0">
          {{ score.data.home.abbr }}[{{ score.data.home.country}}]
          <span class="scoresheet__score">{{ score.data.home.score }}</span>
          <strong class="mx-2">vs</strong>
          <span class="scoresheet__score">{{ score.data.away.score }}</span>
          {{ score.data.away.abbr }}[{{ score.data.away.country}}]
        </div>
        <div class="col-1 p-0" style="text-align: right;">
          <i class="lni lni-16 lni-pencil" @click="edit(score)"></i>
        </div>
      </div>
    </div>
    <!-- Edit score -->
    <section class="modal-container" v-if="scoreModal">
      <div class="modal" style="height: 40vh">
        <header class="modal__header">
          <div>
            edit game
          </div>
          <button class="modal__btn" @click="scoreModal = !scoreModal">
            <i class="lni lni-close"></i>
          </button>
        </header>
        <div class="modal__body">
          <form @submit.prevent="saveScore()" class="row m-0 justify-content-end">
            <div class="col-6">
              <label for="home" class="input-group">
                <span class="input-group__label">{{ editScore.data.home.abbr }}</span>
                <input type="number" class="input-group__input" id="home" v-model="editScore.data.home.score" />
              </label>
            </div>
            <div class="col-6">
              <label for="away" class="input-group">
                <span class="input-group__label">{{ editScore.data.away.abbr }}</span>
                <input type="number" class="input-group__input" id="away" v-model="editScore.data.away.score" />
              </label>
            </div>
            <div class="col-6 mt-5">
              <button type="button" class="form__btn" @click.prevent="deleteGame()">
                Delete this
              </button>
            </div>
            <div class="col-6 mt-5">
              <button type="submit" class="modal__btn">
                Save Score
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- Add game -->
    <section class="modal-container" v-if="newModal">
      <div class="modal" style="height: 40vh">
        <header class="modal__header">
          <div>
            create match
          </div>
          <button class="modal__btn" @click="newModal = !newModal">
            <i class="lni lni-close"></i>
          </button>
        </header>
        <div class="modal__body">
          <form @submit.prevent="newGame()" class="row m-0 justify-content-end">
            <div class="col-6">
              <label for="home" class="input-group">
                <span class="input-group__label">Home Team</span>
                <select v-model="game.home.abbr" id="home">
                  <template v-for="team in teams">
                    <template v-if="team.data.abbr !== game.away.abbr">
                      <option :value="team.data.abbr" :key="team.id">{{ team.data.name}} [{{ team.data.country }}]</option>
                    </template>
                  </template>
                </select>
              </label>
            </div>
            <div class="col-6">
              <label for="away" class="input-group">
                <span class="input-group__label">Away Team</span>
                <select v-model="game.away.abbr" id="away">
                  <template v-for="team in teams">
                    <template v-if="team.data.abbr !== game.home.abbr">
                      <option :value="team.data.abbr" :key="team.id">{{ team.data.name}} [{{ team.data.country }}]</option>
                    </template>
                  </template>
                </select>
              </label>
            </div>
            <div class="col-6 mt-5">
              <button class="modal__btn">
                Save New Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </section> 
    <!-- Add team -->
    <section class="modal-container" v-if="teamModal">
      <div class="modal" style="height: 80vh">
        <header class="modal__header">
          <div>
            add new team
          </div>
          <button class="modal__btn" @click="teamModal = !teamModal">
            <i class="lni lni-close"></i>
          </button>
        </header>
        <div class="modal__body">
          <form @submit.prevent="saveNewTeam()" class="row m-0 justify-content-end">
            <div class="col-12 col-md-6">
              <label class="input-group">
                <span class="input-group__label">Team Name</span>
                <input type="text" class="input-group__input" v-model="newTeam.name" />
              </label>
            </div>
            <div class="col-6 col-md-2">
              <label class="input-group">
                <span class="input-group__label">Team Abbr</span>
                <input type="text" class="input-group__input" v-model="newTeam.abbr" />
              </label>
            </div>
            <div class="col-6 col-md-4">
              <label class="input-group">
                <span class="input-group__label">Team Country</span>
                <input type="text" class="input-group__input" v-model="newTeam.country" />
              </label>
            </div>
            <div class="col-6 col-md-3">
              <label class="input-group">
                <span class="input-group__label">Player 1</span>
                <input type="text" class="input-group__input" id="home" v-model="newTeam.player[0].name" />
              </label>
            </div>
            <div class="col-6 col-md-3">
              <label class="input-group">
                <span class="input-group__label">Player 2</span>
                <input type="text" class="input-group__input" id="home" v-model="newTeam.player[1].name" />
              </label>
            </div>
            <div class="col-6 col-md-3">
              <label class="input-group">
                <span class="input-group__label">Player 3</span>
                <input type="text" class="input-group__input" id="home" v-model="newTeam.player[2].name" />
              </label>
            </div>
            <div class="col-6 col-md-3">
              <label class="input-group">
                <span class="input-group__label">Player 4</span>
                <input type="text" class="input-group__input" id="home" v-model="newTeam.player[3].name" />
              </label>
            </div>
            <div class="col-6 mt-5">
              <button class="modal__btn">
                Save Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['scores','teams'])
  },
  data() {
    return {
      newTeam: {
        player: [
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''}
        ]
      },
      editScore: {},
      game: {
        home: {abbr: '', score: 0},
        away: {abbr: '', score: 0}
      },
      scoreModal: false,
      teamModal: false,
      newModal: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['getTeams','getScores','addGame','addTeam','updateScore','deleteScore']),
    init() {
      this.getTeams()
      this.getScores()
    },
    edit(score) {
      this.editScore = score
      this.scoreModal = !this.scoreModal 
    },
    saveScore() {
      this.updateScore(this.editScore).then(() =>{
        alert('Success')
        this.init()
        this.scoreModal = false
      }).catch((error) => {
        alert(`Error: ${error.message}`)
      })
    },
    saveNewTeam() {
      this.addTeam(this.newTeam).then(() => {
        alert('Success')
        this.init()
        this.teamModal = false
      }).catch((error)=> {
        alert(`Error: ${error.message}`)
      })
    },
    newGame() {
      this.teams.forEach((team) => {
        if (team.data.abbr === this.game.home.abbr) {
          this.game.home.country = team.data.country
        }
      })
      this.teams.forEach((team) => {
        if (team.data.abbr === this.game.away.abbr) {
          this.game.away.country = team.data.country
        }
      })
      this.addGame(this.game).then(() => {
        alert('Success')
        this.newModal = !this.newModal
        this.init()
      }).catch((error) => {
        alert(`Error: ${error.message}`)
      })
    },
    deleteGame() {
      this.deleteScore(this.editScore).then(() => {
        alert('Success')
        this.init()
        this.scoreModal = false
      })
    }
  }
}
</script>