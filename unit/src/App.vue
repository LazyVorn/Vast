<template>
  <div id="app">
      <div class="tag_wrap wrap_box">
        <div class="title">
          <span class="title_name">已有标签</span>
          <lv-button size="mini" @on-click="needEdit=!needEdit">{{needEdit ? "退出编辑" : "管理标签"}}</lv-button>
          <lv-button size="mini" @on-click="addTag">新增标签</lv-button>
        </div>
        <div class="wrap">
          <lv-tag v-for="ele in allTags" :key="ele.id" :info="ele" :needEdit="needEdit" @edit="editTag" @del="delTag"></lv-tag>
        </div>
      </div>
      <div class="left_dic wrap_box">
        <div class="title"><span class="title_name">能力列表</span><lv-button size="mini" @on-click="addDic">新增能力</lv-button></div>
        <div class="wrap">
          <dic-list :data="dicList" @reload="getList" @edit="editDic"></dic-list>
        </div>
      </div>
      <lv-modal v-if="addDicStatu" title="新增能力" :width='500' :needBtn="false" @close="addDicStatu = false">
          <div style="height:300px">
              <add-dic type="add" @reload="getList" @close="addDicStatu = false"></add-dic>
          </div>
      </lv-modal>
      <lv-modal v-if="editDicStatu" title="编辑能力" :width='500' :needBtn="false" @close="editDicStatu = false">
          <div style="height:300px">
              <add-dic type="edit" :editData="editDicObj" @reload="getList" @close="editDicStatu = false"></add-dic>
          </div>
      </lv-modal>
      <lv-modal v-if="addTagStatu" title="新增标签" :width='500' :needBtn="false" @close="addTagStatu = false">
          <div style="height:300px">
              <add-tag type="add" @reload="getList('tag')" @close="addTagStatu = false"></add-tag>
          </div>
      </lv-modal>
      <lv-modal v-if="editTagStatu" title="编辑标签" :width='500' :needBtn="false" @close="editTagStatu = false">
          <div style="height:300px">
              <add-tag type="edit" :editData="editTagObj" @reload="getList('tag')" @close="editTagStatu = false"></add-tag>
          </div>
      </lv-modal>
  </div>
</template>

<script>
import AddTag from "./components/AddTag";
import AddDic from "./components/AddDic";
import DicList from "./components/DicList";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    DicList,
    AddDic,
    AddTag
  },
  data() {
    return {
      addTagStatu: false,
      addDicStatu: false,
      editDicStatu: false,
      editTagStatu: false,
      editDicObj: {},
      editTagObj: {},
      dicList: [],
      needEdit: false
    };
  },
  methods: {
    addDic() {
      this.addDicStatu = true;
    },
    addTag() {
      this.addTagStatu = true;
    },
    editDic(ele) {
      this.editDicObj = ele;
      this.editDicStatu = true;
    },
    editTag(ele) {
      this.editTagObj = ele;
      this.editTagStatu = true;
    },
    delTag(ele) {
      this.$del(this.$api.delTag(ele.id, 7, this.projectId)).then(res => {
        this.$Message.success("删除成功");
        this.getList("tag");
      });
    },
    getList(type) {
      this.$get(this.$api.getDicList(this.projectId)).then(res => {
        !res.rows
          ? ""
          : res.rows.forEach(ele => {
              ele.tagIds = ele.tags.map(_ele => _ele.id);
            });
        this.dicList = res.rows || [];
      });
      type == "tag" ? this.getAllTags() : "";
    },
    getAllTags() {
      this.$get(this.$api.getAllTage(this.projectId)).then(res => {
        this.$store.commit("INIT_ALL_TAGS", res.rows);
      });
    }
  },
  computed: {
    ...mapState(["projectId", "allTags"])
  },
  created() {
    let _pId = window.location.hash.split("/")[1];
    this.$store.commit("INIT_PROJECT_ID", _pId);
    this.getList();
    this.getAllTags();
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
  padding: 10px;
  .top_bar {
    width: 100%;
    height: 32px;
  }
  .wrap_box {
    box-sizing: border-box;
    position: absolute;
    border-radius: 6px;
    border: 1px solid #dddee1;
    .title {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #dddee1;
      border-radius: 5px 5px 0 0;
      color: #424242;
      line-height: 40px;
      text-indent: 20px;
      font-size: 14px;
      font-weight: 600;
      .title_name {
        margin-right: 20px;
      }
      .lv_btn_wrap {
        margin-right: 5px;
      }
    }
    .wrap {
      position: absolute;
      top: 40px;
      left: 10px;
      right: 10px;
      bottom: 10px;
    }
  }
  .left_dic {
    left: 275px;
    top: 10px;
    bottom: 10px;
    right: 10px;
  }
  .tag_wrap {
    width: 255px;
    left: 10px;
    top: 10px;
    bottom: 10px;
    .wrap {
      top: 50px;
      .lv_tag_label {
        display: block;
        margin: 5px auto;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        .iconfont {
          font-size: 14px;
        }
        .hide {
          display: block;
          float: right;
          border-left: none;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-right: 10px solid #fff;
        }
      }
    }
  }
}
</style>
