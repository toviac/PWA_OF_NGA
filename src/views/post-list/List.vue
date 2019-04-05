<!-- 帖子列表 -->
<template>
  <page-frame class="post-list">
    <page-header slot="header" :title="pageTitle" :menuList="menuList" @menuClick="menuClickHandler"></page-header>
    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="loadMore">
      <list-item v-for="item in list" :key="item.tid" :item="item" @click.native="goPost(item.tid)"></list-item>
    </mu-load-more>
    <transition-router-view></transition-router-view>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';
import PageHeader from '@/components/PageHeader.vue';
import ListItem from './ListItem.vue';

export default {
  data() {
    return {
      menuList: [
        { name: '提醒' },
        { name: '消息' },
        { name: '历史浏览' },
        { name: '搜索' },
        { name: '字号' },
      ],
      refreshing: false,
      loading: false,
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
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  mounted() {
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
      return new Promise((resolve, reject) => {
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
            resolve();
          })
          .catch(err => {
            console.log('err: ', err);
            reject(err);
          });
      });
    },
    async refresh() {
      this.refreshing = true;
      this.currentPage = 1;
      await this.getList();
      this.refreshing = false;
    },
    async loadMore() {
      this.loading = true;
      await this.getList();
      this.loading = false;
    },
    goPost(tid) {
      this.$router.push({
        path: `/post/${tid}`,
      });
    },
    menuClickHandler(menu) {
      console.log('menuClick: ', menu);
    },
  },
};
</script>

<style lang="scss">
.post-list {
  background-color: $color-primary;
  .mu-refresh-control {
    color: #EFB973;
  }
  .mu-circle-spinner {
    border-color: #EFB973;
  }
}
</style>
