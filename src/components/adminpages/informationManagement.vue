 <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="155">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="155">
      </el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="155">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="155"> </el-table-column>
      <el-table-column prop="permissionsId" label="管理员权限" width="155">
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" width="155">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="155">
      </el-table-column>
      <el-table-column prop="creator" label="添加人" width="155">
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="155">
      </el-table-column>
      <el-table-column prop="Modifier" label="修改人" width="155">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="chose(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.relname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit1()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

  <script>
let that;
export default {
  data() {
    return {
      dialogVisible1: false,
      tableData: [],
      form: {
        name: "",
        password: "",
        relname: "",
        email: "",
        phone: "",
        power: "",
      },
    };
  },
  methods: {
    getDate() {
      that.$post("UserInfo/findById", {}).then(function (data) {
        if (data && data.code == "0000") {
            that.id=data.data.id
          if (data.data.permissionsId === 1) {
            data.data.permissionsId = "主管理员";
          } else if (data.data.permissionsId === 2) {
            data.data.permissionsId = "子管理员";
          } else if (data.data.permissionsId === 3) {
            data.data.permissionsId = "普通用户";
          }
          that.tableData = [
            {
              userName: data.data.userName,
              password: data.data.password,
              realName: data.data.realName,
              email: data.data.email,
              permissionsId: data.data.permissionsId,
              phoneNum: data.data.phoneNum,
              gmtCreate: data.data.gmtCreate,
              creator: data.data.creator,
              gmtModified: data.data.gmtModified,
              Modifier: data.data.Modifier,
            },
          ];
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
    chose(row) {
      console.log(row)
      that.dialogVisible1 = true;
      that.form.name = row.userName;
      that.form.password = row.password;
      that.form.relname = row.realName;
      that.form.email = row.email;
      that.form.phone = row.phoneNum
    },
    onSubmit1() {
      that
        .$post("UserInfo/saveOrUpdate", {
          id: that.id,
          userName: that.form.name,
          password: that.form.password,
          realName: that.form.relname,
          email: that.form.email,
          phoneNum: that.form.phone,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.getDate();
            that.dialogVisible1 = false;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
  },
  mounted() {
    (that = this), that.getDate();
  },
};
</script>