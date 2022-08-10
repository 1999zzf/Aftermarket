<template>
  <div
    @mouseenter="false_showaside()"
    @mouseleave="false_closeaside()"
    :class="[carousel ? 'wrapper_a' : 'wrapper_a_false']"
  >
    <div class="aside_header_title">
      <i class="admin_hengl"></i>
      <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
        <span :class="[carousel ? 'span_word_a' : 'span_word_false']"
          >易丰科技</span
        >
      </div>
    </div>
    <div class="aside_header_title">
      <i class="admin_logo"></i>
      <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
        <span :class="[carousel ? 'span_word_a' : 'span_word_false']">{{
          userInfo.realName
        }}</span>
      </div>
    </div>
    <!-- <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="chose10()" v-if="showDQ"
            >当前用户</el-menu-item
          >
          <el-menu-item index="1-2" @click="chose1()" v-if="showYH"
            >用户列表</el-menu-item
          >
          <el-menu-item index="1-3" @click="chose2()" v-if="showQX"
            >权限管理</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>培训题库</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="chose3()" v-if="showWD"
            >问答库</el-menu-item
          >
          <el-menu-item index="2-2" @click="chose4()" v-if="showTX"
            >题型管理</el-menu-item
          >
          <el-menu-item index="2-3" @click="chose9()" v-if="showTM"
            >题目生成</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>售后服务</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="chose5()" v-if="showWT"
            >问题记录</el-menu-item
          >
          <el-menu-item index="3-2" @click="chose6()" v-if="showCC"
            >出差记录</el-menu-item
          >
          <el-menu-item index="3-3" @click="chose7()" v-if="showBJ"
            >备件记录</el-menu-item
          >
          <el-menu-item index="3-4" @click="chose8()" v-if="showXM"
            >项目信息</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
    <div v-for="(i1, index1) in list" :key="index1" class="aside_header_item">
      <div
        @click="getThisAside(i1, index1)"
        @mouseenter="changeActive(index1)"
        @mouseleave="removeActive(index1)"
        :class="[{ test: index1 === basicindex }, { op: needsop === index1 }]"
        class="aside_header_item_up"
      >
        <i v-if="i1.menuName == '用户管理'" class="admin_xtgl"></i>
        <i v-if="i1.menuName == '售后服务'" class="admin_yggl"></i>
        <i v-if="i1.menuName == '培训题库'" class="admin_gklb"></i>
        <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
          <span
            style="line-height: 30px"
            :class="[carousel ? 'span_word_a' : 'span_word_false']"
          >
            {{ i1.menuName }}
          </span>
        </div>
        <i
          v-if="i1.chrildList && i1.chrildList.length > 0"
          :class="[
            showaside === index1 ? 'admin_item_down' : 'admin_item_left',
          ]"
        ></i>
      </div>
      <collapse>
        <div v-if="showaside === index1">
          <div v-for="(i2, index2) in i1.chrildList" :key="index2">
            <div
              @click="choosechild(index2, index1, i2)"
              @mouseenter="choosechildenter(index2)"
              @mouseleave="choosechildlever(index2)"
              :class="[
                {
                  aside_header_item_conetnt_hover: index2 === choosechildindex,
                },
                {
                  childbg:
                    index2 === childbasicindex && index1 === childonlyindex,
                },
              ]"
              class="aside_header_item_conetnt"
            >
              <i v-if="i2.menuName == '用户列表'"></i>
              <i v-if="i2.menuName == '信息管理'"></i>
              <i v-if="i2.menuName == '权限管理'"></i>
              <i v-if="i2.menuName == '问题记录'"></i>
              <i v-if="i2.menuName == '用户管理'"></i>
              <i v-if="i2.menuName == '项目记录'"></i>
              <i v-if="i2.menuName == '出差记录'"></i>
              <i v-if="i2.menuName == '备件信息'"></i>
              <i v-if="i2.menuName == '问答库'"></i>
              <i v-if="i2.menuName == '测试卷界面'"></i>
              <i v-if="i2.menuName == '题型配置'"></i>
              <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
                <span
                  :style="{
                    color:
                      index2 === childbasicindex && index1 === childonlyindex
                        ? '#000'
                        : '#f5f5f5',
                  }"
                  :class="[carousel ? 'span_word_a' : 'span_word_false']"
                  >{{ i2.menuName }}</span
                >
              </div>
              <i
                v-if="i2.chrildList && i2.chrildList.length > 0"
                :class="[
                  showinchild === index2
                    ? 'admin_item_down_black'
                    : 'admin_item_left_black',
                ]"
              ></i>
            </div>
          </div>
        </div>
      </collapse>
    </div>
  </div>
</template>

<script>
let that;
import collapse from "../../utils/col.js";
export default {
  components: {
    collapse,
  },
  props: ["message"],
  data() {
    return {
      isopen: "",
      showDQ: false,
      showQX: false,
      showYH: false,
      showWD: false,
      showTX: false,
      showTM: false,
      showWT: false,
      showCC: false,
      showBJ: false,
      showXM: false,
      showaside: false,
      showinchild: false,
      basicindex: 0,
      childbasicindex: -1,
      choosechildindex: -1,
      childonlyindex: -1,
      infirstIndex: -1,
      needsop: -1,
      false_isshow: false,
      list: [],
      userInfo: [],
    };
  },
  watch: {},
  computed: {
    carousel() {
      return this.$store.state.isopen;
    },

    getNewList() {
      if (this.$store.state.isChangeAsideList) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getData() {
      that.$post("Menu/getTreeMenuList", {}).then(function (data) {
        if (data && data.code == "0000") {
          console.log(data);
          that.list = data.data;
          sessionStorage.setItem("asideData", JSON.stringify(data.data));
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
    getThisAside(i1, index1) {
      console.log([i1,index1])
      that.basicindex = index1;
      that.needsop = false;
      that.showinchild = false;
      // that.childbasicindex=-1;

      if (i1.chrildList && i1.chrildList.length > 0) {
        if (that.showaside === index1) {
          that.showaside = false;
        } else {
          that.showaside = index1;
        }
      } else {
        that.showaside = false;
        // this.$emit("geturl", [i1, index1]);
      }
    },
    //外面鼠标划入
    changeActive(index1) {
      if (that.basicindex != index1) {
        that.needsop = index1;
      } else if (that.basicindex === index1) {
        that.name = false;
      }
    },
    //外面鼠标离开
    removeActive() {
      that.needsop = false;
    },
    //内层点击
    choosechild(index2, index1, i2) {
      console.log(i2.pageUrl);
      if (i2.chrildList && i2.chrildList.length > 0) {
        if (that.showinchild === index2) {
          that.choosechildindex = -1;
          that.childbasicindex = index2;
          that.childonlyindex = index1;
          // that.sendMsg(i2,index1,index2)
          that.showinchild = false;
        } else {
          that.choosechildindex = -1;
          that.childbasicindex = index2;
          that.childonlyindex = index1;
          // that.sendMsg(i2,index1,index2)
          that.showinchild = index2;
        }
      } else {
        (that.infirstIndex = -1), (that.showinchild = false);
        that.choosechildindex = -1;
        that.childbasicindex = index2;
        that.childonlyindex = index1;
        this.$emit("geturl", [i2, index1, index2]);

        // that.sendMsg(i2, index1, index2);
      }
    },
    sendMsg(i2, index1, index2) {
      //geturl: 是父组件指定的传数据绑定的函数
      this.$emit("geturl", [i2, index1, index2]);
    },
    //内层划入
    choosechildenter(index2) {
      that.choosechildindex = index2;
      // console.log(index2)
    },
    //内层离开
    choosechildlever() {
      that.choosechildindex = -1;
    },
    false_showaside() {
      if (window.innerWidth > 900 && !this.$store.state.isshowaside) {
        that.$store.commit({
          type: "change_isopen",
          isopen: true,
        });
      }
    },
    false_closeaside() {
      if (window.innerWidth > 900 && !this.$store.state.isshowaside) {
        that.$store.commit({
          type: "change_isopen",
          isopen: false,
        });
      }
    },
  },
  created() {},
  mounted() {
    that = this;
    that.isopen = that.$store.state.isopen;
    that.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    that.getData();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/commen/aside.scss";
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #f5f5f5;
}
</style>