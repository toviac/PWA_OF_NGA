<!-- 主页面 -->
<template>
  <page-frame class="home-page">
      <router-view></router-view>
    <div class="home-footer" slot="footer">
      <div class="footer-btn">论坛</div>
      <div class="footer-btn">我</div>
    </div>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    PageFrame,
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.home-page {
  .home-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
