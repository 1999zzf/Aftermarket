<template>
  <div class="wrapper">
    <div class="login_box">
      <div class="login-box-bg" style="margin-top:100px">
        <div class="login-box-bg-top">易丰科技后台管理</div>
        <div style="border: 1px solid #f1f1f1"></div>
        <div class="login-box-bg-body">
          <div class="input-login">
            <div class="input-login-left">账号:</div>
            <div class="input-login-right">
              <input
                @keyup.enter="get_in()"
                :class="{ user: usernone }"
                v-model="user"
                placeholder="请输入账号"
                type="text"
                class="input"
              />
            </div>
          </div>
          <div class="input-login">
            <div class="input-login-left">密码</div>
            <div class="input-login-right">
              <input
                @keyup.enter="get_in()"
                :class="{ user: pwdnone }"
                v-model="pwd"
                placeholder="请输入密码"
                type="password"
                class="input"
              />
            </div>
          </div>
        </div>
        
        <div style="border: 1px solid #f1f1f1"></div>
        <div class="get-in">
          <span @click="get_in()" class="get-in-btn">提交</span>
        </div>
      </div>
    </div>
    <div :style="backgroundDiv" class="bgVideo">
    </div>
    <!-- <div class="videoUp"></div>遮罩层 -->
  </div>
</template>

<script>
let that;
history.pushState(null, null, document.URL);
window.addEventListener("popstate", function () {
  history.pushState(null, null, document.URL);
});
export default {
  components: {},
  name: "login",
  props: {},
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../assets/img_bg.png") + ")",
      },
      user: "",
      usernone: false,
      pwd: "",
      pwdnone: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    get_in() {
      if (that.user) {
        if (that.pwd) {
          that.pwdnone = false;
          that
            .$userpost("UserInfo/login", {
              userName: that.user,
              password: that.pwd,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$router.push({
                  path: "/components/adminpages/index",
                });
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          that.$message({
            message: "请填写用户密码",
            type: "warning",
          });
          that.pwdnone = true;
          that.usernone = false;
        }
      } else {
        that.$message({
          message: "请填写用户名",
          type: "warning",
        });
        that.usernone = true;
      }
    },
    refHtml() {}
  },
  created() {},
  mounted() {
    that = this;
    that.refHtml();
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>