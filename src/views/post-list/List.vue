<!-- 帖子列表 -->
<template>
  <page-frame class="post-list">
    <page-header slot="header" :title="pageTitle"></page-header>
    <cube-scroll>
      <list-item v-for="item in list" :key="item.tid" :item="item"></list-item>
    </cube-scroll>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';
import PageHeader from '@/components/PageHeader.vue';
import ListItem from './ListItem.vue';

export default {
  data() {
    return {
      list: [],
      pageTitle: '',
      currentPage: '1',
    };
  },
  components: {
    PageFrame,
    PageHeader,
    ListItem,
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const {
        $http,
        $urls,
        $route,
        currentPage,
      } = this;
      const params = {
        // sign: 'bd2f80c1cbbe85f7ba6f3beac0cbae13',
        // t: new Date().getTime(),
        fid: $route.params.id,
        // app_id: 1010,
        page: currentPage,
        // stid: 0,
      };
      $http.post($urls.getList, params)
        .then(data => {
          this.pageTitle = data.forumname;
          this.list = data.result.data;
        })
        .catch(err => {
          console.log('err: ', err);
        });
    },
  },
};
</script>

<style lang="scss">
</style>
