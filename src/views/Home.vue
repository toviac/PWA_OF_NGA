<!-- 主页面 -->
<template>
  <page-frame class="home-page">
    <div class="home-header" slot="header">
      <div class="home-title">论坛</div>
      <div class="search">搜索</div>
    </div>
      <transition-router-view></transition-router-view>
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
  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .home-title {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .home-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
