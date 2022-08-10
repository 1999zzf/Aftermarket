 <template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" v-if="showXZ"
      >新增</el-button
    >
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="info" @click="alldel()">删除</el-button>
    <el-button type="primary" @click="search1()">当前用户信息查询</el-button>
    <el-row style="margin-top: 10px">
      <el-col :span="6">
        用户名:
        <el-input placeholder="请输入内容" v-model="name" style="width: 65%">
        </el-input>
      </el-col>
      <el-col :span="6">
        真实姓名:
        <el-input placeholder="请输入内容" v-model="relname" style="width: 65%">
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="730">
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
          <el-button
            @click="del(scope.row)"
            type="text"
            size="small"
            v-if="showSC"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="chose(scope.row)"
            v-if="showBJ"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15, 30, 45, 60]"
      :page-size="15"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Num"
    >
    </el-pagination>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form2" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form2.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form2.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form2.relname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form2.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form2.phone"></el-input>
        </el-form-item>
        <el-form-item label="管理员权限">
          <el-select v-model="form2.power" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        <el-form-item label="管理员权限">
          <el-select v-model="form.power" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit1()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="当前用户" :visible.sync="dialogVisible2" width="40%">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form1.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form1.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form1.relname" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form1.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form1.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-input v-model="form1.gmtCreate" disabled></el-input>
        </el-form-item>
        <el-form-item label="添加人">
          <el-input v-model="form1.creator" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="form1.gmtModified" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改人">
          <el-input v-model="form1.Modifier" disabled></el-input>
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
      name: "",
      relname: "",
      id: "",
      Num: 0,
      showXZ: false,
      showBJ: false,
      showSC: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      options: [
        {
          value: "1",
          label: "主管理员",
        },
        {
          value: "2",
          label: "子管理员",
        },
        {
          value: "3",
          label: "普通用户",
        },
      ],
      form: {
        name: "",
        password: "",
        relname: "",
        email: "",
        phone: "",
        power: "",
      },
      form2: {
        name: "",
        password: "",
        relname: "",
        email: "",
        phone: "",
        power: "",
      },
      form1: {
        name: "",
        password: "",
        relname: "",
        email: "",
        phone: "",
        gmtCreate: "",
        creator: "",
        gmtModified: "",
        Modifier: "",
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      that.pageSize = val;
      that.getDate();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      that.getDate();
    },
    onSubmit() {
      that
        .$post("UserInfo/saveOrUpdate", {
          userName: that.form2.name,
          password: that.form2.password,
          realName: that.form2.relname,
          email: that.form2.email,
          phoneNum: that.form2.phone,
          permissionsId: that.form2.power,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.getDate();
            that.dialogVisible = false;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getDate() {
      that
        .$post("UserInfo/findForPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.tableData = data.page.list;
            that.Num = data.page.count;
            for (let i = 0; i < data.page.list.length; i++) {
              if (data.page.list[i].permissionsId === 1) {
                that.tableData[i].permissionsId = "主管理员";
              } else if (data.page.list[i].permissionsId === 2) {
                that.tableData[i].permissionsId = "子管理员";
              } else if (data.page.list[i].permissionsId === 3) {
                that.tableData[i].permissionsId = "普通用户";
              }
            }
            console.log(data);
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    chose(row) {
      that.dialogVisible1 = true;
      that.form.name = row.userName;
      that.form.password = row.password;
      that.form.relname = row.realName;
      that.form.email = row.email;
      that.form.phone = row.phoneNum;
      that.form.power = row.permissionsId;
      that.id = row.id;
    },
    onSubmit1() {
      if (that.form.power === "主管理员") {
        that.form.power = 1;
      } else if (that.form.power === "子管理员") {
        that.form.power = 2;
      } else if (that.form.power === "普通用户") {
        that.form.power = 3;
      }
      that
        .$post("UserInfo/saveOrUpdate", {
          id: that.id,
          userName: that.form.name,
          password: that.form.password,
          realName: that.form.relname,
          email: that.form.email,
          phoneNum: that.form.phone,
          permissionsId: that.form.power,
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
    del(row) {
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that
            .$post("UserInfo/deleteUserInfo", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.getDate();
                that.dialogVisible1 = false;
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        });
    },
    alldel() {
      that.name = "";
      that.relname = "";
      that.getDate();
    },
    search() {
      that
        .$post("UserInfo/findForPage", {
          userName: that.name,
          password: that.relname,
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.tableData = data.page.list;
            that.Num = data.page.count;
            for (let i = 0; i < data.page.list.length; i++) {
              if (data.page.list[i].permissionsId === 1) {
                that.tableData[i].permissionsId = "主管理员";
              } else if (data.page.list[i].permissionsId === 2) {
                that.tableData[i].permissionsId = "子管理员";
              } else if (data.page.list[i].permissionsId === 3) {
                that.tableData[i].permissionsId = "普通用户";
              }
            }
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    search1() {
      that.dialogVisible2 = true;
      that.$post("UserInfo/findById", {}).then(function (data) {
        if (data && data.code == "0000") {
          console.log(data.data);
          (that.form1.name = data.data.userName),
            (that.form1.password = data.data.password),
            (that.form1.relname = data.data.realName),
            (that.form1.email = data.data.email),
            (that.form1.phone = data.data.phoneNum),
            (that.form1.gmtCreate = data.data.gmtCreate),
            (that.form1.creator = data.data.creator),
            (that.form1.gmtModified = data.data.gmtModified),
            (that.form1.Modifier = data.data.Modifier);
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
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "userList")
            for (
              var tiss = 0;
              tiss < that.asideData[ti].chrildList[tis].buttonList.length;
              tiss++
            ) {
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "新增"
              ) {
                that.showXZ = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "删除"
              ) {
                that.showSC = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "编辑"
              ) {
                that.showBJ = true;
              }
            }
        }
      }
    }
  },
};
</script>