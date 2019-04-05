<!-- 主题详情 -->
<template>
  <page-frame class="post-detail">
    <page-header slot="header" title="主题详情"></page-header>
    <div class="post-title">{{ postTitle }}</div>
    <reply-item v-for="(reply, index) in replyList" :key="reply.pid" :reply="reply" :floor="index"></reply-item>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';
import PageHeader from '@/components/PageHeader.vue';
import ReplyItem from './ReplyItem.vue';

export default {
  data() {
    return {
      postTitle: '',
      replyList: [],
      currentPage: 1,
    };
  },
  components: {
    PageFrame,
    PageHeader,
    ReplyItem,
  },
  watch: {},
  computed: {},
  created() {
    this.getPost();
  },
  mounted() {},
  methods: {
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
        tid: $route.params.id,
      };
      $http.post($urls.getPost, params)
        .then(data => {
          this.postTitle = data.tsubject;
          this.replyList = data.result;
        })
        .catch(err => {
          console.log('ERR_GETPOST: ', err);
        });
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
