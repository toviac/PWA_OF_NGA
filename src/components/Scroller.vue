<!-- 上拉刷新/下拉加载 -->
<template>
  <div class="scroller" :style="{ 'height': height, 'transform': `translate3D(0px,${offset}px,0px)` }">
    <div class="pull-down-wrapper">
      <span>REFRESH...</span>
    </div>
    <div class="scroll-wrapper" @touchmove="touchHandler" @touchend="touchEndHandler">
      <slot></slot>
    </div>
    <div class="pull-up-wrapper">
      <span>LOAD MORE...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroller',
  props: {
    refreshing: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
      touchArr: [],
      isRefreshing: false,
    };
  },
  components: {
  },
  computed: {
    offset() {
      const { touchArr, isRefreshing, isLoading } = this;
      let scrollOffset = 0;
      if (touchArr.length) {
        scrollOffset = touchArr[touchArr.length - 1] - touchArr[0];
      }
      switch (true) {
        case isRefreshing:
          return 50;
        case isLoading:
          return -50;
        case Math.abs(scrollOffset) > 100:
          if (scrollOffset > 0) {
            return 100;
          }
          return -100;
        default:
          return scrollOffset;
      }
    },
    pullDownStyle() {
      const { offset, isRefreshing } = this;
      let height = 0;
      switch (true) {
        case isRefreshing:
          height = 50;
          break;
        case offset < 0:
          height = 0;
          break;
        case offset > 100:
          height = 100;
          break;
        default:
          height = offset;
          break;
      }
      return {
        height: `${height}px`,
      };
    },
    pullUpStyle() {
      const { offset, isLoading } = this;
      let height = 0;
      switch (true) {
        case isLoading:
          height = 50;
          break;
        case offset > 0:
          height = 0;
          break;
        case offset < -100:
          height = 100;
          break;
        default:
          height = -offset;
          break;
      }
      return {
        height: `${height}px`,
      };
    },
  },
  watch: {
    refreshing(newVal) {
      this.isRefreshing = newVal;
    },
  },
  mounted() {
  },
  methods: {
    touchHandler(e) {
      // 触摸点相对于浏览器的viewport上边缘的y坐标, 不会包括上边的滚动距离
      this.touchArr.push(e.changedTouches[0].clientY);
    },
    touchEndHandler(e) {
      const { offset } = this;
      console.log('touchEnd: ', e);
      // 下拉
      if (offset > 0) {
        this.pullDown();
      } else {
        this.pullUp();
      }
      this.touchArr = [];
    },
    // 下拉
    pullDown() {
      console.log('pullDown');
      this.$emit('pull-down');
      // this.isRefreshing = true;
      setTimeout(() => {
        this.isRefreshing = false;
      }, 5000);
    },
    // 上拉
    pullUp() {
      console.log('pullUp');
    },
  },
};
</script>

<style lang="scss">
.scroller {
  transition: all 0.3s ease-out;
  .pull-down-wrapper,
  .pull-up-wrapper {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .pull-down-wrapper {
    margin-top: -50px;
  }
  .pull-up-wrapper {
    margin-bottom: -50px;
  }
  .scroll-wrapper {
    height: 100%;
    overflow: scroll;
  }
}
</style>
