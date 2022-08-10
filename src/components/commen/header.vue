<template>
  <div class="wrapper_h">
    <div style="flex: 6"></div>
    <div class="logout">
      <span @click="get_logout()" class="logout_btn"> 退出 </span>
    </div>
  </div>
</template>

<script>
let that;
export default {
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    return {
      formLabelWidth: "80px",
    };
  },
  watch: {},
  methods: {
    //退出账号
    get_logout() {
      that
        .$confirm("此操作将退出账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          // that.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          sessionStorage.removeItem("token");
          // that.reload();
          // sessionStorage.clear();
          that.$router.push({
            path: "/",
          });
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    that = this;
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/commen/header.scss";
</style>