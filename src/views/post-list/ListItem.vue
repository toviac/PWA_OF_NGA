<template>
  <div class="list-item">
    <div class="item-title" :class="titleClass">
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
    titleClass() {
      const { titlefont_api: titleFont } = this.item;
      if (!titleFont) return [];
      return Object.keys(titleFont).map(key => {
        if (key === 'color' && titleFont[key] && !['red', 'blue', 'green', 'orange'].includes(titleFont[key])) console.log('UNSET_COLOR: ', this.item, titleFont[key]);
        if (key === 'color' && titleFont[key]) return titleFont[key];
        if (titleFont[key]) return key;
        return '';
      });
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {},
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
      font-size: 12px;
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
