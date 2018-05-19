<template>
  <div id="app">
      <div class="btn_wrap">
        <lv-button size="mini">删除单体</lv-button>
        <lv-button size="mini">新建单体</lv-button>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    getList(){

    }
  },
  computed: {
    ...mapState(["projectId"])
  },
  created() {
    let _pId = window.location.hash.split("/")[1];
    this.$store.commit("INIT_PROJECT_ID", _pId);
    this.getList();
  }
};
</script>

<style lang="less">
#app {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  .btn_wrap{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ddd;
    .lv_btn_wrap{
      margin: 6px 6px 0 0;
      float: right;
    }
  }
}
</style>
