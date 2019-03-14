<!-- 页面框架 -->
<template>
  <div class="page-frame">
    <div class="page-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="page-body">
      <div class="wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="page-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.page-frame {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  overflow: hidden;
  > .page-header,
  > .page-footer {
    flex-grow: 0;
    height: 50px;
  }
  > .page-body {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%; // 此处不能添加overflow
    }
  }
}
</style>
