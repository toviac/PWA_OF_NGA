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
        <div class="register-time">-</div>
      </div>
      <div class="floor">
        <span>{{ floor === 0 ? '楼主' : `${floor}楼` }}</span>
      </div>
    </div>
    <div class="reply-content" v-html="reply.content"></div>
  </div>
</template>

<script>
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
    floor: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    };
  },
  components: {},
  watch: {},
  computed: {
    computedAvatar() {
      const { author } = this.reply;
      return author.avatar;
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
    img,
    video {
      max-width: 100%;
    }
  }
}
</style>
