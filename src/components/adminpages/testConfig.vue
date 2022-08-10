 <template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" v-if="showXZ">新增</el-button>
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="info" @click="alldel()">删除</el-button>
    <el-row style="margin-top: 10px">
      <el-col :span="6">
        职位:
        <el-select v-model="name" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.jobTitle"
            :value="item.jobTitle"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="730">
      <el-table-column prop="jobTitle" label="职位" width="173">
      </el-table-column>
      <el-table-column prop="cBusiness" label="业务问题" width="173">
      </el-table-column>
      <el-table-column prop="cElectrical" label="电气问题" width="173">
      </el-table-column>
      <el-table-column prop="cMechanics" label="机械问题" width="173">
      </el-table-column>
      <el-table-column prop="cSoftware" label="软件问题" width="173">
      </el-table-column>
      <el-table-column prop="cOperation" label="操作问题" width="173">
      </el-table-column>
      <el-table-column prop="cRepair" label="维修问题" width="173">
      </el-table-column>
      <el-table-column prop="cPreSales" label="售前问题" width="173">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="173">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="del(scope.row)" type="text" size="small"
          v-if="showSC"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="chose(scope.row)"
          v-if="showXG"
            >修改</el-button
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="职位">
          <el-select v-model="form.jobTitle" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.jobTitle"
              :value="item.jobTitle"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务问题">
          <el-input v-model="form.cBusiness"></el-input>
        </el-form-item>
        <el-form-item label="电气问题">
          <el-input v-model="form.cElectrical"></el-input>
        </el-form-item>
        <el-form-item label="机械问题">
          <el-input v-model="form.cMechanics"></el-input>
        </el-form-item>
        <el-form-item label="软件问题">
          <el-input v-model="form.cSoftware"></el-input>
        </el-form-item>
        <el-form-item label="操作问题">
          <el-input v-model="form.cOperation"></el-input>
        </el-form-item>
        <el-form-item label="维修问题">
          <el-input v-model="form.cRepair"></el-input>
        </el-form-item>
        <el-form-item label="售前问题">
          <el-input v-model="form.cPreSales"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="40%">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="职位">
          <el-select v-model="form1.jobTitle" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.jobTitle"
              :value="item.jobTitle"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务问题">
          <el-input v-model="form1.cBusiness"></el-input>
        </el-form-item>
        <el-form-item label="电气问题">
          <el-input v-model="form1.cElectrical"></el-input>
        </el-form-item>
        <el-form-item label="机械问题">
          <el-input v-model="form1.cMechanics"></el-input>
        </el-form-item>
        <el-form-item label="软件问题">
          <el-input v-model="form1.cSoftware"></el-input>
        </el-form-item>
        <el-form-item label="操作问题">
          <el-input v-model="form1.cOperation"></el-input>
        </el-form-item>
        <el-form-item label="维修问题">
          <el-input v-model="form1.cRepair"></el-input>
        </el-form-item>
        <el-form-item label="售前问题">
          <el-input v-model="form1.cPreSales"></el-input>
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
      name: "",
      id: "",
      Num: 0,
      showXZ:false,
      showSC:false,
      showXG:false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      options: [],
      form: {
        jobTitle: "",
        cBusiness: "",
        cElectrical: "",
        cMechanics: "",
        cSoftware: "",
        cOperation: "",
        cRepair: "",
        cPreSales: "",
      },
      form1: {
        jobTitle: "",
        cBusiness: "",
        cElectrical: "",
        cMechanics: "",
        cSoftware: "",
        cOperation: "",
        cRepair: "",
        cPreSales: "",
      },
    };
  },
  methods: {
    getter() {
      that.$post("Config/findAll", {}).then(function (data) {
        if (data && data.code == "0000") {
          console.log(data);
          that.options = data.data;
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
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
        .$post("Config/saveOrUpdate", {
          jobTitle: that.form.jobTitle,
          cBusiness: that.form.cBusiness,
          cElectrical: that.form.cElectrical,
          cMechanics: that.form.cMechanics,
          cSoftware: that.form.cSoftware,
          cRepair: that.form.cRepair,
          cOperation: that.form.cOperation,
          cPreSales: that.form.cPreSales,
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
        .$post("Config/findForPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.tableData = data.page.list;
            that.Num = data.page.count;
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
      that.form1.jobTitle = row.jobTitle;
      that.form1.cBusiness = row.cBusiness;
      that.form1.cElectrical = row.cElectrical;
      that.form1.cMechanics = row.cMechanics;
      that.form1.cSoftware = row.cSoftware;
      that.form1.cOperation = row.cOperation;
      that.form1.cRepair = row.cRepair;
      that.form1.cPreSales = row.cPreSales;
      that.id = row.id;
    },
    onSubmit1() {
      that
        .$post("Config/saveOrUpdate", {
          id: that.id,
          jobTitle: that.form1.jobTitle,
          cBusiness: that.form1.cBusiness,
          cElectrical: that.form1.cElectrical,
          cMechanics: that.form1.cMechanics,
          cSoftware: that.form1.cSoftware,
          cRepair: that.form1.cRepair,
          cOperation: that.form1.cOperation,
          cPreSales: that.form1.cPreSales,
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
            .$post("Config/deleteConfig", {
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
      that.getDate();
    },
    search() {
      that
        .$post("Config/findForPage", {
          jobTitle: that.name,
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.tableData = data.page.list;
            that.Num = data.page.count;
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
    that.getter();
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "testConfig")
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
                "修改"
              ) {
                that.showXG = true;
              }
            }
        }
      }
    }
  },
};
</script>