<!-- 外框 -->
<template>
  <div class="out-frame">
    <div class="frame-header">
      <page-header></page-header>
    </div>
    <div class="frame-container">
      <router-view></router-view>
    </div>
    <div class="frame-footer">
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    PageHeader,
    PageFooter,
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.out-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
  .frame-header {
    flex-shrink: 0;
    height: 50px;
  }
  .frame-container {
    flex-grow: 1;
    overflow: hidden;
  }
  .frame-footer {
    flex-shrink: 0;
    height: 50px;
  }
}
</style>
