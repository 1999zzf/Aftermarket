 <template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" v-if="showXZ">新增</el-button>
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="info" @click="alldel()">删除</el-button>
    <el-row style="margin-top: 10px">
      <el-col :span="4">
        省市:
        <el-input
          placeholder="请输入内容"
          v-model="provincesCities"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        项目名称:
        <el-input
          placeholder="请输入内容"
          v-model="entryName"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        设备类型:
        <el-input
          placeholder="请输入内容"
          v-model="equipmentType"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="5">
        项目负责人:
        <el-input
          placeholder="请输入内容"
          v-model="projectLeader"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        销售人员:
        <el-input
          placeholder="请输入内容"
          v-model="salesman"
          style="width: 65%"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 103%" height="730">
      <el-table-column prop="provincesCities" label="省市" width="103">
      </el-table-column>
      <el-table-column prop="entryName" label="项目名称" width="103">
      </el-table-column>
      <el-table-column prop="equipmentType" label="设备类型" width="103">
      </el-table-column>
      <el-table-column prop="entryAddress" label="项目地址" width="103">
      </el-table-column>
      <el-table-column prop="consoleNumber" label="上报台数量" width="103">
      </el-table-column>
      <el-table-column prop="carNumber" label="小车数量" width="103">
      </el-table-column>
      <el-table-column prop="latticeNumber" label="格口数量" width="103">
      </el-table-column>
      <el-table-column prop="projectLeader" label="项目负责人" width="103">
      </el-table-column>
      <el-table-column prop="salesman" label="销售人员" width="103">
      </el-table-column>
      <el-table-column prop="acceptanceDate" label="验收日期" width="103">
      </el-table-column>
      <el-table-column prop="otherEquipment" label="其他设备" width="103">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="103">
      </el-table-column>
      <el-table-column prop="creator" label="添加人" width="103">
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="103">
      </el-table-column>
      <el-table-column prop="Modifier" label="修改人" width="103">
      </el-table-column>
      <el-table-column label="操作" width="103">
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
      <el-form ref="form" :model="form2" label-width="80px">
        <el-form-item label="省市">
          <el-input v-model="form2.provincesCities"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form2.entryName"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input v-model="form2.equipmentType"></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="form2.entryAddress"></el-input>
        </el-form-item>
        <el-form-item label="上包台数量">
          <el-input v-model="form2.consoleNumber"></el-input>
        </el-form-item>
        <el-form-item label="小车数量">
          <el-input v-model="form2.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="格口数量">
          <el-input v-model="form2.latticeNumber"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人">
          <el-input v-model="form2.projectLeader"></el-input>
        </el-form-item>
        <el-form-item label="销售人员">
          <el-input v-model="form2.salesman"></el-input>
        </el-form-item>
        <el-form-item label="验收日期">
          <el-input v-model="form2.acceptanceDate"></el-input>
        </el-form-item>
        <el-form-item label="其他设备">
          <el-input v-model="form2.otherEquipment"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="省市">
          <el-input v-model="form.provincesCities"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form.entryName"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input v-model="form.equipmentType"></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="form.entryAddress"></el-input>
        </el-form-item>
        <el-form-item label="上包台数量">
          <el-input v-model="form.consoleNumber"></el-input>
        </el-form-item>
        <el-form-item label="小车数量">
          <el-input v-model="form.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="格口数量">
          <el-input v-model="form.latticeNumber"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人">
          <el-input v-model="form.projectLeader"></el-input>
        </el-form-item>
        <el-form-item label="销售人员">
          <el-input v-model="form.salesman"></el-input>
        </el-form-item>
        <el-form-item label="验收日期">
          <el-input v-model="form.acceptanceDate"></el-input>
        </el-form-item>
        <el-form-item label="其他设备">
          <el-input v-model="form.otherEquipment"></el-input>
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
      provincesCities: "",
      entryName: "",
      equipmentType: "",
      projectLeader: "",
      salesman: "",
      id: "",
      Num: 0,
      showXZ:false,
      showXG:false,
      showSC:false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      form: {
        provincesCities: "",
        entryName: "",
        equipmentType: "",
        consoleNumber: "",
        carNumber: "",
        latticeNumber: "",
        projectLeader: "",
        salesman: "",
        relname: "",
        acceptanceDate: "",
        otherEquipment: "",
      },
      form2: {
        provincesCities: "",
        entryName: "",
        equipmentType: "",
        consoleNumber: "",
        carNumber: "",
        latticeNumber: "",
        projectLeader: "",
        salesman: "",
        relname: "",
        acceptanceDate: "",
        otherEquipment: "",
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
        .$post("ProjectRecord/saveOrUpdate", {
          provincesCities: that.form2.provincesCities,
          entryName: that.form2.entryName,
          equipmentType: that.form2.equipmentType,
          entryAddress: that.form2.entryAddress,
          consoleNumber: that.form2.consoleNumber,
          carNumber: that.form2.carNumber,
          latticeNumber: that.form2.latticeNumber,
          projectLeader: that.form2.projectLeader,
          salesman: that.form2.salesman,
          acceptanceDate: that.form2.acceptanceDate,
          otherEquipment: that.form2.otherEquipment,
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
        .$post("ProjectRecord/findForPage", {
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
      that.form.provincesCities = row.provincesCities;
      that.form.entryName = row.entryName;
      that.form.equipmentType = row.equipmentType;
      that.form.entryAddress = row.entryAddress;
      that.form.consoleNumber = row.consoleNumber;
      that.form.carNumber = row.carNumber;
      that.form.latticeNumber = row.latticeNumber;
      that.form.projectLeader = row.projectLeader;
      that.form.salesman = row.salesman;
      that.form.acceptanceDate = row.acceptanceDate;
      that.form.otherEquipment = row.otherEquipment;
      that.id = row.id;
    },
    onSubmit1() {
      that
        .$post("ProjectRecord/saveOrUpdate", {
          id: that.id,
          provincesCities: that.form.provincesCities,
          entryName: that.form.entryName,
          equipmentType: that.form.equipmentType,
          entryAddress: that.form.entryAddress,
          consoleNumber: that.form.consoleNumber,
          carNumber: that.form.carNumber,
          latticeNumber: that.form.latticeNumber,
          projectLeader: that.form.projectLeader,
          salesman: that.form.salesman,
          acceptanceDate: that.form.acceptanceDate,
          otherEquipment: that.form.otherEquipment,
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
            .$post("ProjectRecord/delete", {
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
      that.provincesCities="",
      that.entryName= "",
      that.equipmentType= "",
      that.projectLeader= "",
      that.salesman= "",
      that.getDate();
    },
    search() {
      that
        .$post("ProjectRecord/findForPage", {
          provincesCities: that.provincesCities,
          entryName: that.entryName,
          equipmentType: that.equipmentType,
          projectLeader: that.projectLeader,
          salesman: that.salesman,
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
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "projectRecord")
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