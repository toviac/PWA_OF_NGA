<!-- page header -->
<template>
  <div class="page-header">
    <div class="left">
      <div class="back" @click="goBack">
        <i class="iconfont nga-icon-back"></i>
      </div>
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};

</script>
<style lang="scss">
.page-header {
  background-color: #31393c;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left {
    display: flex;
    .back {
      margin-right: 20px;
      color: #fbf8eb;
    }
    .page-title {
      color: #d6d7d8;
      font-size: 18px;
    }
  }
}
</style>
