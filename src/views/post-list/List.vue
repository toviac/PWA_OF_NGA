<!-- 帖子列表 -->
<template>
  <page-frame class="post-list">
    <page-header slot="header" :title="pageTitle"></page-header>
    <cube-scroll
      :data="list"
      :options="scrollOptions"
      @pulling-down="pullDownHandler"
      @pulling-up="pullUpHandler">
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
      currentPage: 1,
    };
  },
  components: {
    PageFrame,
    PageHeader,
    ListItem,
  },
  computed: {
    scrollOptions() {
      const { pullDownRefresh, pullUpLoad } = this;
      return {
        pullDownRefresh,
        pullUpLoad,
        scrollbar: {
          fade: true,
          interactive: false, // 1.8.0 新增
        },
      };
    },
    pullDownRefresh() {
      return {
        threshold: 50,
        stop: 50,
        stopTime: 500,
        txt: '刷新成功',
      };
    },
    pullUpLoad() {
      return {
        threshold: 0,
        txt: {
          more: '加载成功',
          noMore: '已经到底啦',
        },
      };
    },
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
          if (currentPage === 1) {
            this.list = data.result.data;
          } else {
            // 要进行帖子去重
            const totalList = this.list.concat(data.result.data);
            const tidArr = this.list.map(item => item.tid).concat(data.result.data.map(item => item.tid));
            const tidSet = new Set(tidArr);
            const filteredList = [...tidSet].map(tid => totalList.find(item => item.tid === tid));
            this.list = filteredList;
          }
          if (data.result.data.length) ++this.currentPage;
        })
        .catch(err => {
          console.log('err: ', err);
        });
    },
    pullDownHandler() {
      this.currentPage = 1;
      this.getList();
    },
    pullUpHandler() {
      this.getList();
    },
  },
};
</script>

<style lang="scss">
.post-list {
  background-color: $color-primary;
}
</style>
