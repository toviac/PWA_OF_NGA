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
      if (!offset || Math.abs(offset) === 50) {
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
    offset() {
      const { touchArr, isRefreshing, isLoading } = this;
      const el = document.querySelector('.scroll-wrapper') || {};
      // scrollTop === 0时滚动到顶部
      const isTop = !el.scrollTop;
      const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

      // 触摸偏移
      let touchOffset = 0;
      if (touchArr.length) {
        touchOffset = (touchArr[touchArr.length - 1] - touchArr[0]) / 3;
      }
      switch (true) {
        case isRefreshing:
          return 50;
        case isLoading:
          return -50;
        // 限制最大滑动长度
        // case Math.abs(touchOffset) > 100:
        //   if (touchOffset > 0) {
        //     return 100;
        //   }
        //   return -100;
        default:
          if ((isTop && touchOffset > 0) || (isBottom && touchOffset < 0)) {
            return touchOffset;
          }
          return 0;
      }
    },
  },
  watch: {
    refreshing(newVal) {
      this.isRefreshing = newVal;
    },
    loading(newVal) {
      this.isLoading = newVal;
    },
  },
  mounted() {
  },
  methods: {
    touchHandler(e) {
      const { offset, touchArr } = this;
      this.isRefreshing = false;
      this.isLoading = false;
      if (offset && e.cancelable) {
        e.preventDefault();
      }
      touchArr.push(e.changedTouches[0].pageY);
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
    },
    // 下拉
    pullDown() {
      console.log('pullDown');
      this.$emit('pull-down');
    },
    // 上拉
    pullUp() {
      console.log('pullUp');
      this.$emit('pull-up');
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
