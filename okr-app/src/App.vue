<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      // console.log(from)
      // console.log(to)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
  },
}
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .child-view {
    position: absolute;
    width:100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    overflow: auto;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
  }
</style>
