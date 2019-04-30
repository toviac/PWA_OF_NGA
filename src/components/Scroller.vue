<!-- 上拉刷新/下拉加载 -->
<template>
  <div class="scroller" :style="scrollerStyle">
    <div class="pull-down-wrapper">
      <span>{{ refreshTxt }}</span>
    </div>
    <div class="scroll-wrapper" @touchmove="touchHandler" @touchend="touchEndHandler">
      <slot></slot>
    </div>
    <div class="pull-up-wrapper">
      <span>{{ loadTxt }}</span>
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
    loading: {
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
      isLoading: false,
      offset: 0,
    };
  },
  components: {
  },
  computed: {
    scrollerStyle() {
      const { height, offset } = this;
      let style = {
        height,
        transform: `translate3D(0px,${offset}px,0px)`,
      };
      if (!offset || offset === 50) {
        style = Object.assign({}, style, {
          transition: 'all 0.2s ease 0s',
        });
      }
      return style;
    },
    refreshTxt() {
      const { offset, isRefreshing } = this;
      if (isRefreshing || !offset) return 'REFRESHING...';
      if (offset > 50) {
        return 'RELEASE TO REFRESH';
      }
      return 'PULL DOWN TO REFRESH';
    },
    loadTxt() {
      const { offset, isLoading } = this;
      if (isLoading || !offset) return 'LOADING...';
      if (offset < -50) {
        return 'RELEASE TO LOAD MORE';
      }
      return 'PULL UP TO LOAD MORE';
    },
  },
  watch: {
    refreshing(newVal) {
      this.isRefreshing = newVal;
    },
    loading(newVal) {
      this.isLoading = newVal;
    },
    isRefreshing(newVal) {
      if (!newVal) {
        this.offset = 0;
      }
    },
    isLoading(newVal) {
      if (!newVal) {
        this.offset = 0;
      }
    },
  },
  mounted() {
  },
  methods: {
    touchHandler(e) {
      const {
        offset,
        touchArr,
        // isLoading,
        // isRefreshing,
      } = this;
      const el = document.querySelector('.scroll-wrapper');
      // scrollTop === 0时滚动到顶部
      const isTop = !el.scrollTop;
      const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
      // const firstTouch = touchArr[0];
      // console.log('==> ', isTop, isBottom, e.changedTouches[0].pageY);
      // (在顶端&&下拉) || (在底端&&上拉)
      if ((isTop && offset >= 0) || (isBottom && offset <= 0)) {
        if (offset) {
          e.preventDefault();
        }
        if (touchArr.length < 2 || offset) {
          touchArr.push(e.changedTouches[0].pageY);
        }
      }
      this.setOffset();
    },
    touchEndHandler(e) {
      const { offset } = this;
      console.log('touchEnd: ', e);
      // 下拉
      if (offset > 50) {
        this.pullDown();
      } else if (offset < -50) {
        this.pullUp();
      }
      this.touchArr = [];
      this.setOffset();
    },
    // 下拉
    pullDown() {
      console.log('pullDown');
      this.$emit('pull-down');
      this.isRefreshing = true;
      setTimeout(() => {
        this.isRefreshing = false;
      }, 5000);
    },
    // 上拉
    pullUp() {
      console.log('pullUp');
    },
    setOffset() {
      const { touchArr, isRefreshing, isLoading } = this;
      // 触摸偏移
      let touchOffset = 0;
      // 上次偏移
      let lastOffset = 0;
      if (touchArr.length) {
        touchOffset = (touchArr[touchArr.length - 1] - touchArr[0]) / 2;
        lastOffset = ((touchArr[touchArr.length - 2] || touchArr[0]) - touchArr[0]) / 2;
      }
      switch (true) {
        case isRefreshing:
          this.offset = 50;
          break;
        case isLoading:
          this.offset = -50;
          break;
        // 限制最大滑动长度
        // case Math.abs(touchOffset) > 100:
        //   if (touchOffset > 0) {
        //     return 100;
        //   }
        //   return -100;
        default:
          // 防止随意拉动时产生不正确的offset
          // e.g. 在最上方向下拉, 再迅速向上拉时, 会产生一个负的offset, 导致页面上移一部分
          if (touchOffset * lastOffset < 0) {
            this.offset = 0;
          }
          this.offset = touchOffset;
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.scroller {
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
