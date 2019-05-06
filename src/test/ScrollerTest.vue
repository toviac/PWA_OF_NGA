<template>
  <div class="scroller-test">
    <scroller @pull-up="pullUpHandler" @pull-down="pullDownHandler" :loading="loading" :refreshing="refreshing">
      {{ content }}
    </scroller>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller.vue';

export default {
  name: 'ScrollerTest',
  data() {
    return {
      content: '',
      loading: false,
      refreshing: false,
    };
  },
  components: {
    Scroller,
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    pullDownHandler() {
      this.refreshing = true;
      setTimeout(() => {
        this.content = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!`;
        this.refreshing = false;
      }, 3000);
    },
    pullUpHandler() {
      this.loading = true;
      setTimeout(() => {
        this.content = `${this.content}
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic debitis odio ut ratione
      , quod explicabo quos vitae reiciendis minima? A eligendi sunt pariatur harum ut aspe
      riores modi expedita quisquam maxime!`;
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.scroller-test {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>
