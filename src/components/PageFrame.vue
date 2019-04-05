<!-- 页面框架 -->
<template>
  <div class="page-frame">
    <div class="frame-header">
      <slot name="header">
        <page-header></page-header>
      </slot>
    </div>
    <div class="frame-body">
      <div class="wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="frame-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
  data() {
    return {};
  },
  components: {
    PageHeader,
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.page-frame {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  overflow: hidden;
  > .frame-header,
  > .frame-footer {
    flex-grow: 0;
    height: 50px;
    display: flex;
    > * {
      flex-grow: 1;
    }
  }
  > .frame-body {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%; // 此处不能添加overflow
      overflow: auto;
    }
  }
}
</style>
