<template>
  <div class="list-item">
    <div class="item-title" :style="titleStyle">
      {{ item.subject }}
      <span class="forum" v-if="item.forumname">[{{ item.forumname }}]</span>
    </div>
    <div class="item-info" v-if="!item.error">
      <div class="author">
        <i class="icon-author iconfont nga-user"></i>
        {{ item.author }}
      </div>
      <div class="reply-info">
        <span class="last-reply-time">
          <i class="icon-time iconfont nga-time"></i>
          {{ item.lastpost | formatDate }}
        </span>
        <span class="reply-count">
          <i class="icon-reply iconfont nga-comment"></i>
          {{ item.replies }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
    titleStyle() {
      if (!this.item.titlefont_api) return {};
      const {
        color: fontColor,
        bold,
        italic,
        underline,
      } = this.item.titlefont_api;
      return {
        fontWeight: bold ? 'bold' : 'normal',
        color: fontColor,
        fontStyle: italic ? 'italic' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
      };
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    formatTime(time) {
      const currentTime = new Date().getTime();
      const fullDate = new Date(time * 1000);
      const diff = currentTime - time * 1000;
      // 一分钟内
      if (diff < 60000) {
        return '刚刚';
      }
      // 一小时内
      if (diff < 360000) {
        return `${(diff / 60000).toFixed(0)}分钟前`;
      }
      const hourMinute = `${String(fullDate.getHours()).padStart(2, '0')}:${String(fullDate.getMinutes()).padStart(2, '0')}`;
      // 今天
      if (currentTime.getDate() === new Date(time * 1000).getDate()) {
        return hourMinute;
      }
      return `${fullDate.getMonth() + 1}-${fullDate.getDate()} ${hourMinute}`;
    },
  },
};
</script>

<style lang="scss">
.list-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 50px;
  padding: 15px 10px;
  border-bottom: 1px solid #e9dcb7;
  .item-title {
    text-align: left;
    line-height: 18px;
    color: #1d2a63;
    .forum {
      color: #c0b8a8;
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    * {
      font-size: 14px;
    }
    .author {
      .icon-author {
        color: #edc692;
      }
    }
    .reply-info {
      display: flex;
      .reply-count {
        display: flex;
        min-width: 45px;
        margin-left: 5px;
      }
      .iconfont {
        margin-right: 5px;
      }
      .icon-time {
        color: #e7adab;
      }
      .icon-reply {
        color: #9dbdda;
      }
    }
  }
}
</style>
