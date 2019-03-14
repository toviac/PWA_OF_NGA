<template>
  <div id="app">
    <transition name="page-move">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .page-move-enter,
  .page-move-leave-active {
    transform: translate(100%, 0);
  }

  .page-move-enter-active,
  .page-move-leave-active {
    transition: transform 0.3s;
  }
}
</style>
