<!-- transition-router-view -->
<template>
  <transition name="page-move">
    <router-view :key="key"/>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  components: {},
  watch: {},
  computed: {
    key() {
      return new Date().getTime();
    },
  },
  created() {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.page-move-enter,
.page-move-leave-active {
  transform: translate(100%, 0);
}

.page-move-enter-active,
.page-move-leave-active {
  transition: transform 0.3s;
}
</style>
