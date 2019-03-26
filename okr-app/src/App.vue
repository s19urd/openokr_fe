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

  // .m-prev-btn,
  // .m-next-btn {
  //   display :inline-block;
  //   position: relative;
  //   width: 20px;
  //   height: 20px;
  // }

  // .m-prev-btn::after,
  // .m-next-btn::after {
  //   display: inline-block;
  //   content: " ";
  //   height: 10px;
  //   width: 10px;
  //   border-width: 1px 1px 0 0;
  //   border-color: #1989fa;
  //   border-style: solid;
  //   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  //   position: absolute;
  //   top: 50%;
  //   right: 6px;
  //   margin-top: -5px;
  // }
  // .m-prev-btn::after {
  //   border-width: 0 0 1px 1px;
  // }
</style>
