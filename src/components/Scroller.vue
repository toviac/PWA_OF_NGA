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
      const { offset } = this;
      const el = document.querySelector('.scroll-wrapper');
      // scrollTop === 0时滚动到顶部
      const isTop = !el.scrollTop;
      const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
      const firstTouch = this.touchArr[0];
      // (在顶端&&下拉) || (在底端&&上拉)
      if ((isTop && (firstTouch || 0) < e.changedTouches[0].pageY) || (isBottom && (firstTouch || el.scrollHeight) > e.changedTouches[0].pageY)) {
        console.log('==> ', isTop, isBottom, firstTouch, e.changedTouches[0].pageY);
        if (offset) {
          e.preventDefault();
        }
        // 触摸点相对于浏览器的viewport上边缘的y坐标, 不会包括上边的滚动距离
        this.touchArr.push(e.changedTouches[0].clientY);
      }
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
  transition: all 0 ease-out;
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
