<!-- 主页面 -->
<template>
  <page-frame class="home-page">
    <div slot="header"></div>
    <categories></categories>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';
import Categories from '@/views/categories/Categories.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    PageFrame,
    Categories,
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.out-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
  .frame-header {
    flex-shrink: 0;
    height: 50px;
  }
  .frame-container {
    flex-grow: 1;
    overflow: hidden;
  }
  .frame-footer {
    flex-shrink: 0;
    height: 50px;
  }
}
</style>
