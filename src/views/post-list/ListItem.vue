<template>
  <div class="list-item">
    <div class="item-title">{{ item.subject }}</div>
    <div class="item-info">
      <div class="author">{{ item.author }}</div>
      <div class="reply-info">
        <div class="last-reply-time">{{ formatTime(item.lastpost) }}</div>
        <div class="reply-count"></div>
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
  height: 80px;
  padding: 10px 5px;
  .item-title {
    text-align: left;
    line-height: 18px;
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
