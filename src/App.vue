<template>
  <div id="app">
    <app-header />
    <router-view/>
  </div>
</template>

<script>
import AppHeaderVue from '@/components/AppHeader.vue'

export default {
  components: {
    'app-header': AppHeaderVue
  }
}
</script>