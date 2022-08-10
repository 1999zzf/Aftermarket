 <template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" v-if="showXZ"
      >新增</el-button
    >
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="primary" @click="leading()" v-if="showDC">导出</el-button>
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
        建档值班:
        <el-input
          placeholder="请输入内容"
          v-model="personnelDuty"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        问题类型:
        <el-input
          placeholder="请输入内容"
          v-model="problemType"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="5">
        协助处理人:
        <el-input
          placeholder="请输入内容"
          v-model="assistant"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        是否解决:
        <el-input placeholder="请输入内容" v-model="isSolve" style="width: 65%">
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="680">
      <el-table-column prop="provincesCities" label="省市" width="130">
      </el-table-column>
      <el-table-column prop="entryName" label="项目名称" width="130">
      </el-table-column>
      <el-table-column prop="personnelDuty" label="建档值班人员" width="130">
      </el-table-column>
      <el-table-column prop="questionNumber" label="问题编号" width="130">
      </el-table-column>
      <el-table-column prop="problemDescription" label="问题描述" width="130">
      </el-table-column>
      <el-table-column prop="problemType" label="问题类型" width="130">
      </el-table-column>
      <el-table-column prop="assistant" label="协助处理人" width="130">
      </el-table-column>
      <el-table-column prop="isSolve" label="是否解决" width="130">
      </el-table-column>
      <el-table-column prop="processingProgres" label="处理进度" width="130">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="130">
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="130">
      </el-table-column>
      <el-table-column prop="modifier" label="修改人" width="130">
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
        <el-form-item label="问题编号">
          <el-input v-model="form2.questionNumber"></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input v-model="form2.problemDescription"></el-input>
        </el-form-item>
        <el-form-item label="问题类型">
          <el-input v-model="form2.problemType"></el-input>
        </el-form-item>
        <el-form-item label="协助处理人">
          <el-input v-model="form2.assistant"></el-input>
        </el-form-item>
        <el-form-item label="是否解决">
          <el-input v-model="form2.isSolve"></el-input>
        </el-form-item>
        <el-form-item label="处理进度">
          <el-input v-model="form2.processingProgres"></el-input>
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
        <el-form-item label="问题编号">
          <el-input v-model="form.questionNumber"></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input v-model="form.problemDescription"></el-input>
        </el-form-item>
        <el-form-item label="问题类型">
          <el-input v-model="form.problemType"></el-input>
        </el-form-item>
        <el-form-item label="协助处理人">
          <el-input v-model="form.assistant"></el-input>
        </el-form-item>
        <el-form-item label="是否解决">
          <el-input v-model="form.isSolve"></el-input>
        </el-form-item>
        <el-form-item label="处理进度">
          <el-input v-model="form.processingProgres"></el-input>
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
      personnelDuty: "",
      problemType: "",
      assistant: "",
      isSolve: "",
      id: "",
      Num: 0,
      showXZ: false,
      showSC: false,
      showXG: false,
      showDC: false,
      dialogVisible: false,
      dialogVisible1: false,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      form: {
        provincesCities: "",
        entryName: "",
        questionNumber: "",
        problemDescription: "",
        problemType: "",
        assistant: "",
        isSolve: "",
        processingProgres: "",
      },
      form2: {
        provincesCities: "",
        entryName: "",
        questionNumber: "",
        problemDescription: "",
        problemType: "",
        assistant: "",
        isSolve: "",
        processingProgres: "",
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
    leading() {
      if (that.tableData) {
        that
          .$confirm("点击确定将下载文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            window.location.href =
              sessionStorage.getItem("IP") +
              "ProblemRecord/exportExcel" +
              "?provincesCities=" +
              that.provincesCities +
              "&entryName=" +
              that.entryName +
              "&personnelDuty=" +
              that.personnelDuty +
              "&problemType=" +
              that.problemType +
              "&assistant=" +
              that.assistant +
              "&isSolve=" +
              that.isSolve;
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
      }
    },
    onSubmit() {
      that
        .$post("ProblemRecord/saveOrUpdate", {
          provincesCities: that.form2.provincesCities,
          entryName: that.form2.entryName,
          questionNumber: that.form2.questionNumber,
          problemDescription: that.form2.problemDescription,
          problemType: that.form2.problemType,
          assistant: that.form2.assistant,
          isSolve: that.form2.isSolve,
          processingProgres: that.form2.processingProgres,
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
        .$post("ProblemRecord/findForPage", {
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
      that.form.processingProgres = row.processingProgres;
      that.form.entryName = row.entryName;
      that.form.questionNumber = row.questionNumber;
      that.form.problemDescription = row.problemDescription;
      that.form.problemType = row.problemType;
      that.form.assistant = row.assistant;
      that.form.isSolve = row.isSolve;
      that.form.provincesCities = row.provincesCities;
      that.id = row.id;
    },
    onSubmit1() {
      that
        .$post("ProblemRecord/saveOrUpdate", {
          id: that.id,
          provincesCities: that.form.provincesCities,
          entryName: that.form.entryName,
          questionNumber: that.form.questionNumber,
          problemDescription: that.form.problemDescription,
          problemType: that.form.problemType,
          assistant: that.form.assistant,
          isSolve: that.form.isSolve,
          processingProgres: that.form.processingProgres,
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
            .$post("ProblemRecord/delete", {
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
      (that.provincesCities = ""),
        (that.entryName = ""),
        (that.personnelDuty = ""),
        (that.problemType = ""),
        (that.assistant = ""),
        (that.isSolve = ""),
        that.getDate();
    },
    search() {
      that
        .$post("ProblemRecord/findForPage", {
          provincesCities: that.provincesCities,
          entryName: that.entryName,
          personnelDuty: that.personnelDuty,
          problemType: that.problemType,
          assistant: that.assistant,
          isSolve: that.isSolve,
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            console.log(data);
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "problemRecord")
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
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "导出"
              ) {
                that.showDC = true;
              }
            }
        }
      }
    }
  },
};
</script>