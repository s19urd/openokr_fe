<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from './pages/Header'
export default {
  name: 'app',

  components: {
    Header
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
@import '~@/assets/style/common.scss';
</style>
