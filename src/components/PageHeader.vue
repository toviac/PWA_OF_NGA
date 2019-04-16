<!-- page header -->
<template>
  <mu-appbar class="page-header">
    <mu-button icon slot="left" @click="goBack">
      <mu-icon value="arrow_back"></mu-icon>
    </mu-button>
    <span class="page-title">{{ title }}</span>
    <slot name="right" slot="right">
      <mu-button v-if="showFavBtn" icon @click="toggleFavor">
        <mu-icon value="star" :class="{ 'color-grey': !isFavored }"></mu-icon>
      </mu-button>
      <mu-menu v-if="showMenu" cover placement="bottom-end" :open.sync="open">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button v-for="(menu, index) in menuList" :key="index" @click="menuClick(menu)">
            <mu-list-item-title>{{ menu.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </slot>
  </mu-appbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    showFavBtn: {
      type: Boolean,
      default: true,
    },
    isFavored: {
      type: Boolean,
      default: false,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      open: false,
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggleFavor() {},
    menuClick(menu) {
      this.$emit('menu-click', menu);
    },
  },
};

</script>
<style lang="scss">
.page-header {
  background-color: #31393c;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.mu-appbar {
    z-index: 1;
  }
  .mu-icon {
    color: #fbf8eb;
  }
  .color-grey {
    color: #a0a0a0;
  }
  .page-title {
    color: #d6d7d8;
    font-size: 18px;
  }
}
</style>
