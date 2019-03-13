<!-- 版面列表 -->
<template>
  <div class="category-list">
    <cube-scroll-nav-bar
      ref="scrollNav"
      :current="currentTabName"
      :labels="labelList"
      :txts="labelList"
      @change="handleTabChange"></cube-scroll-nav-bar>
    <cube-slide
      ref="slide"
      :data="categoryList"
      :initial-index="initialIndex"
      :options="slideOptions"
      :refreshResetCurrent="false"
      :auto-play="false"
      :show-dots="false"
      :loop="false"
      @change="handleSlideChangePage">
      <cube-slide-item v-for="(list, index) in categoryList" :key="index">
        <cube-sticky :pos="stickyY">
          <cube-scroll :scroll-events="['scroll']" :options="scrollOptions" @scroll="handleScroll">
            <div class="list-group" v-for="group in list.groups" :key="group.id">
              <cube-sticky-ele :ele-key="group.name">
                <div class="title">{{ group.name }}</div>
              </cube-sticky-ele>
              <div class="tile-group">
                <div class="tile" v-for="item in group.forums" :key="item.id" @click="handleTileClick(item.id)">
                  <img class="tile-img" :src="`/img/icons/${item.id}.png`" @error="handleImgError">
                  <div>{{ item.name | length5 }}</div>
                </div>
              </div>
            </div>
          </cube-scroll>
        </cube-sticky>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  filters: {
    length5(val) {
      if (val.length > 5) {
        return `${val.slice(0, 4)}...`;
      }
      return val;
    },
  },
  data() {
    return {
      currentTabName: '',
      initialIndex: 0,
      categoryList: [],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        // 保留纵向滚动
        eventPassthrough: 'vertical',
      },
      scrollOptions: {
        // 多层scroll嵌套时防止点击事件冒泡重复触发
        // stopPropagation: true,
        click: false,
      },
      stickyY: 0,
    };
  },
  components: {},
  watch: {},
  computed: {
    labelList() {
      return this.categoryList.map(list => list.name);
    },
  },
  created() {
    this.getCategories();
  },
  mounted() {},
  methods: {
    handleImgError(e) {
      const el = e.srcElement;
      el.src = '/img/icons/00.png';
      el.onerror = null;
    },
    handleTabChange(current) {
      this.currentTabName = current;
      this.initialIndex = this.labelList.findIndex(label => label === current);
    },
    handleSlideChangePage(current) {
      this.currentTabName = this.labelList[current];
      console.log('change page: ', this.currentTabName);
    },
    handleScroll({ y }) {
      this.stickyY = -y;
    },
    handleTileClick(fid) {
      console.log('tile-click: ', fid);
    },
    getCategories() {
      const { $urls } = this;
      const params = {};
      this.$http.post($urls.getCategory, params)
        .then(data => {
          this.categoryList = data.result;
          this.currentTabName = data.result[0] && data.result[0].name;
        })
        .catch(err => {
          console.log('ERR_GET_CATEGORIES: ', err);
        });
    },
  },
};

</script>
<style lang="scss">
.category-list {
  background-color: $color-primary;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  .cube-scroll-nav-bar {
    border-bottom: 1px solid #ccc;
    .cube-scroll-nav-bar-item {
      padding: 15px 15px;
    }
  }
  .cube-slide {
    width: 100vw;
    height: calc(100% - 45px);
    .cube-slide-item {
      padding: 5px;
      height: 100%;
      overflow-y: scroll;
      .title {
        background-color: $color-primary;
        padding: 5px 10px;
        text-align: left;
      }
      .tile-group {
        display: flex;
        flex-wrap: wrap;
      }
      .tile {
        width: calc((100vw - 10px) / 3);
        height: calc((100vw - 10px) / 3);
      }
    }
  }
}
</style>
