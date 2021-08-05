<template>
  <header class="header">
    <div class="header__logo">
      888<span>gc</span>
    </div>
    <nav class="header__nav">
      <input type="checkbox" id="menu" class="hamburger__toggler" ref="menu" />
      <!---ul class="nav">
        <li class="nav__list">Leadership Board</li>
        <li class="nav__list">Teams</li>
      </ul --->
      <router-link to="/login" class="header__link">
        <i class="lni lni-lock"></i>
        admin access
      </router-link>
      <!---label for="menu" class="hamburger"></label-->
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeaderVue'
}
</script>