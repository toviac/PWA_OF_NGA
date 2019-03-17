<!-- 帖子列表 -->
<template>
  <page-frame class="post-list">
    <page-header slot="header"></page-header>
  </page-frame>
</template>

<script>
import PageFrame from '@/components/PageFrame.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  data() {
    return {
      token: '',
    };
  },
  components: {
    PageFrame,
    PageHeader,
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
      const { $http, $urls } = this;
      const params = 'sign=bd2f80c1cbbe85f7ba6f3beac0cbae13&t=1552827859&fid=540&app_id=1010&page=1&stid=0';
      // const params = `sign=e165dc9edfddb073f699239e6d7816d2&t=${this.token}&fid=540&app_id=1010&page=1&stid=0`;
      $http.post($urls.getList, params)
        .then(data => {
          console.log('data: ', data);
          this.token = data.guest_token;
          // this.getList();
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
