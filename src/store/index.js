import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import '../firebase.config.js'

var db = firebase.firestore()
window.db = db
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    teams: [],
    scores: []
  },
  mutations: {
    SAVE_TEAMS: (state, payload) => {
      state.teams = payload
    },
    SAVE_SCORES: (state, payload) => {
      state.scores = payload
    }
  },
  actions: {
    loginUser: (state, payload) => {
      return new Promise((resolve, reject) => {
        console.log(payload)
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          state.user = result.user
          console.log(result.user)
          resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
    },
    getTeams: ({commit}) => {
      let stateTeams = []
      db.collection('teams').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          stateTeams.push({'doc': doc.id,'data': doc.data()})
        })
      })
      commit('SAVE_TEAMS',stateTeams)
    },
    getScores: ({commit}) => {
      let stateScores = []
      db.collection('scores').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          stateScores.push({'doc': doc.id,'data': doc.data()})
        })
      })
      commit('SAVE_SCORES', stateScores)
    },
    addGame: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        db.collection('scores').add({
          home: payload.home,
          away: payload.away,
          played: false
        }).then((docRef) => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    addTeam: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        db.collection('teams').add({
          name: payload.name,
          abbr: payload.abbr,
          country: payload.country,
          players: payload.player
        }).then((docRef) => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    updateScore: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        db.collection('scores').doc(payload.doc).update({
          home: payload.data.home,
          away: payload.data.away 
        }).then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    deleteScore: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        db.collection('scores').doc(payload.doc).delete().then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
