<!-- 主题回复 -->
<template>
  <div class="reply-item">
    <div class="author-info">
      <mu-avatar size="45">
        <img :src="computedAvatar">
      </mu-avatar>
      <div class="user-info">
        <div class="user-name">{{ reply.author.username }}</div>
        <div class="user-detail">
          <span>级别: {{ reply.author.member }}</span>
          <span>威望: {{ reply.author.rvrc }}</span>
          <span>发帖: {{ reply.author.postnum }}</span>
        </div>
        <div class="medal-list">-</div>
      </div>
      <div class="floor">
        <span>{{ reply.lou === 0 ? '楼主' : `${reply.lou}楼` }}</span>
      </div>
    </div>
    <div class="reply-content" v-html="formattedContent"></div>
    <div class="post-time">
      <span>{{ reply.postdatetimestamp | formatDate }}</span>
      <mu-icon :value="systemIcon" size="14"></mu-icon>
    </div>
    <div class="post-fun">
      <div class="vote">
        <mu-icon value="thumb_up" size="14"></mu-icon>
        <span>{{ reply.vote }}</span>
        <mu-icon value="thumb_down" size="14"></mu-icon>
      </div>
      <div class="fun">
        <mu-icon value="chat_bubble" size="14"></mu-icon>
        <mu-menu cover placement="bottom-end" :open.sync="openMenu">
          <mu-icon value="more_horiz" size="14"></mu-icon>
          <mu-list slot="content">
            <mu-list-item button @click="openMenu = false">
              <mu-list-item-title>只看TA</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="openMenu = false">
              <mu-list-item-title>礼物</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="openMenu = false">
              <mu-list-item-title>贴条</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="openMenu = false">
              <mu-list-item-title>举报</mu-list-item-title>
            </mu-list-item>
          </mu-list>
      </mu-menu>
      </div>
    </div>
  </div>
</template>

<script>
import format from '@/utils/formatComment';

export default {
  props: {
    reply: {
      type: Object,
      default() {
        return {
          author: {},
        };
      },
    },
  },
  data() {
    return {
      openMenu: false,
    };
  },
  components: {},
  watch: {},
  computed: {
    computedAvatar() {
      const { author } = this.reply;
      return author.avatar;
    },
    formattedContent() {
      return format(this.reply.content);
    },
    systemIcon() {
      const { from_client: fromClient } = this.reply;
      const regAndroid = /Android/;
      const regIos = /iOS/;
      if (regAndroid.test(fromClient)) return 'android';
      if (regIos.test(fromClient)) return 'phone_iphone';
      return '';
    },
  },
  created() {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.reply-item {
  border-top: 1px solid #F1E9CE;
  .author-info {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #BDB59B;
    border-bottom: 1px solid #F1E9CE;
    .mu-avatar {
      margin-right: 10px;
    }
    .user-info {
      flex-grow: 1;
      > div {
        text-align: left;
      }
      .user-name {
        color: #EFB973;
      }
    }
    .floor {
      align-self: flex-start;
    }
  }
  .reply-content {
    padding: 10px;
    text-align: left;
    .reply-to-btn {
      padding: 0 4px;
      margin-right: 5px;
      color: #fff;
      background-color: #EFB973;
      border-radius: 4px;
    }
    quote {
      display: block;
      margin-bottom: 5px;
      padding: 5px;
      border: 1px solid #b7b4ad;
      background-color: #f1e9ce;
    }
    img,
    video {
      max-width: 100%;
    }
  }
  .post-time {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 10px;
    color: #b9b196;
    span {
      margin-right: 5px;
    }
  }
  .post-fun {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    padding: 10px 0;
    border-top: 1px solid #F1E9CE;
    color: #a0a0a0;
    .vote {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 50px;
    }
    .fun {
      width: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mu-menu {
        height: 14px;
      }
    }
  }
}
</style>
