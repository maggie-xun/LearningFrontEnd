<template>
  <div id="tags-view-container"
       class="tags-view-container">
    <ScrollPane class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews"
                   :key="tag.path"
                   :to="tag.path"
                   tag="span"
                   class="tags-view-item">{{tag.name}}
        <span v-if="!isAffix(tag)"
              class="el-icon-close"
              @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </ScrollPane>
  </div>
</template>

<script>
import path from "path";
import ScrollPane from "./ScrollPane";
export default {
  name: "TagsView",
  components: {
    ScrollPane,
  },
  watch: {
    $route() {
      this.addTags();
    },
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$store.state.permission.routes;
    },
  },
  mounted() {
    this.initTags();
  },
  methods: {
    addTags() {
      const name = this.$route.name;
      if (name) this.$store.dispatch("tagsView/add_visited_view", this.$route);
    },
    initTags() {
      const affixTags = this.filterAffixTags(this.routes);
      affixTags.forEach((element) => {
        if (element.name) {
          this.$store.dispatch("tagsView/add_visited_view", element);
        }
      });
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          let childrenTags = this.filterAffixTags(route.children, route.path);
          tags = [...tags, ...childrenTags];
        }
      });
      return tags;
    },
    isAffix(route) {
      return route.meta && route.meta.affix;
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .el-scrollbar .el-scrollbar__view {
    float: left;
  }
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>