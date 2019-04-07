<!-- 主题详情 -->
<template>
  <page-frame class="post-detail">
    <page-header slot="header" title="主题详情"></page-header>
    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="loadMore" :loadedAll="loadedAll">
      <div class="post-title">{{ postTitle }}</div>
      <reply-item v-for="reply in replyList" :key="reply.pid" :reply="reply"></reply-item>
    </mu-load-more>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';
import PageHeader from '@/components/PageHeader.vue';
import ReplyItem from './ReplyItem.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      refreshing: false,
      // 是否全部加载, 为true则不显示loadMore元素
      loadedAll: false,
      postTitle: '',
      replyList: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  components: {
    PageFrame,
    PageHeader,
    ReplyItem,
  },
  watch: {},
  computed: {
    ...mapGetters(['currentFid']),
  },
  created() {
    this.refresh();
  },
  mounted() {},
  methods: {
    ...mapMutations('current', ['updateTid', 'updateFid']),
    getPost() {
      const {
        $http,
        $urls,
        $route,
        currentPage,
      } = this;
      const params = {
        // app_id: 1010,
        // sign: 'd98c17b6c735556878729abaf07e2022',
        // t: 1554466080,
        page: currentPage,
        tid: $route.params.tid,
      };
      return new Promise((resolve, reject) => {
        $http.post($urls.getPost, params)
          .then(data => {
            this.postTitle = data.tsubject;
            this.totalPage = data.totalPage;
            this.updateFid(data.fid);
            if (currentPage === 1) {
              this.replyList = data.result;
            } else {
              this.replyList = this.replyList.concat(data.result);
            }
            this.currentPage++;
            resolve();
          })
          .catch(err => {
            console.log('ERR_GETPOST: ', err);
            reject(err);
          });
      });
    },
    async refresh() {
      this.refreshing = true;
      this.currentPage = 1;
      await this.getPost();
      this.refreshing = false;
    },
    async loadMore() {
      if (this.currentPage > this.totalPage) {
        this.loadedAll = true;
        return;
      }
      this.loading = true;
      await this.getPost();
      this.loading = false;
    },
  },
};

</script>
<style lang="scss">
.post-detail {
  .wrapper {
    background-color: $color-primary;
    .post-title {
      padding: 10px;
      font-size: 18px;
      line-height: 20px;
      font-weight: bold;
      text-align: left;
    }
  }
}
</style>
