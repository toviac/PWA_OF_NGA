<!-- 版面列表 -->
<template>
  <div class="category-list">
    <cube-scroll direction="horizontal">
      <cube-tab-bar v-model="currentTabName" show-slider>
        <cube-tab v-for="(list, index) in categoryList" :key="index" :label="list.name"></cube-tab>
      </cube-tab-bar>
    </cube-scroll>
    <cube-slide :initial-index="initialIndex" :auto-play="false" :show-dots="false">
      <cube-slide-item>
        fas;dlfkjasd
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTabName: '',
      categoryList: [],
    };
  },
  components: {},
  watch: {},
  computed: {
    initialIndex () {
      let index = 0;
      index = this.categoryList.findIndex(list => list.name === this.currentTabName);
      return index;
    }
  },
  created() {
    this.getCategories();
  },
  mounted() {},
  methods: {
    getCategories() {
      const { $urls } = this;
      const params = {};
      this.$http.post($urls.getCategory, params)
        .then(data => {
          this.categoryList = data.result;
          this.currentTabName = data.result[0] && data.result[0].name;
        })
        .catch(err => {
          console.log('err: ', err);
        });
    },
  },
};

</script>
<style lang="scss">
.category-list {
  width: 100vw;
}
</style>
