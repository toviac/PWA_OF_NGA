<!-- page header -->
<template>
  <div class="page-header">
    <div class="left">
      <div class="back">返回</div>
      <div class="page-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.page-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left {
    display: flex;
    .back {}
    .page-title {
      font-size: 18px;
    }
  }
}
</style>
