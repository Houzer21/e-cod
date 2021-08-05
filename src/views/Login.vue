<template>
  <section class="section" style="height: 85vh;">
    <div class="row m-0 align-items-center justify-content-center" style="height: 100%;">
      <div class="col-md-4 p-0">
        <form @submit.prevent="login()" class="form form--auth">
          <div class="form__body">
            <h2 class="form__heading">log in</h2>
            <label class="input-group" for="email">
              <span class="input-group__label">email</span>
              <input type="email" v-model="user.email" class="input-group__input" id="email" placeholder="Your Email" required/>
            </label>
            <label class="input-group" for="password">
              <span class="input-group__label">password</span>
              <input type="password" v-model="user.password" class="input-group__input" id="password" placeholder="Your Password" required/>
            </label>
          </div>
          <div class="form__footer">
            <div class="row m-0 justify-content-end">
              <div class="col-md-6 p-0">
                <button class="form__btn">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    login() {
      this.loginUser(this.user).then(() => {
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        alert(`${error}`)
      })
    }
  }
}
</script>
