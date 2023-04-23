<template>
  <div id="app">
    <!-- 左侧路由导航 -->
    <div class="leftRoute">
      <div
        class="routeItem"
        :class="{ highlighC: index == highligh }"
        v-for="(item, index) in routeArr"
        :key="index"
        @click="jumpRoute(item.path, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 右侧内容区 -->
    <div class="rightContent">
      <!-- 主应用 -->
      <div v-show="isHome" id="homeContainer">
        Welcome to the Micro front end 🧐🧐🧐
      </div>
      <!-- 子应用（放置子应用dom容器，id为appContainer） -->
      <div v-show="!isHome" id="appContainer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      routeArr: [
        {
          name: "主应用",
          path: "/",
        },
        {
          name: "子应用1",
          path: "/child1",
        },
      ],
      highligh: 0, // highlight为0表示首页选项卡
      isHome: true, // 默认在home页
    };
  },
  watch: {
    highligh(newVal) {
      this.isHome = newVal == 0;
    },
  },
  methods: {
    jumpRoute(path, index) {
      this.highligh = index;
      this.$router.push({ path });
    },
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 12px;
  .leftRoute {
    width: 72px;
    height: 100%;
    .routeItem {
      width: 100%;
      height: 72px;
      line-height: 72px;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #999;
      font-size: 17px;
      font-family: "楷体";
      cursor: pointer;
      margin-bottom: 6px;
      border-radius: 6px;
      user-select: none;
    }
    .routeItem:first-child {
      font-weight: 700;
    }
    .routeItem:hover {
      background-color: #e9e9e9;
    }
    .highlighC {
      background-color: #e9e9e9;
    }
  }
  .rightContent {
    flex: 1;
    margin-left: 12px;
    box-sizing: border-box;
    border: 2px solid #e9e9e9;
    border-radius: 10px;
    #homeContainer {
      font-size: 32px;
      font-weight: 700;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #appContainer {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    // 不加scoped
    // #appContainer > div {
    //   height: 100%;
    // }
    #appContainer > div[id^="__qiankun_microapp_wrapper_"] {
      height: 100%;
    }
  }
}
</style>
