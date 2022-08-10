 <template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" v-if="showXZ">新增</el-button>
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="info" @click="alldel()">删除</el-button>
    <el-row style="margin-top: 10px">
      <el-col :span="6">
        问题:
        <el-input placeholder="请输入内容" v-model="problem" style="width: 65%">
        </el-input>
      </el-col>
      <el-col :span="9">
        归类项:
        <el-select v-model="number" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="730">
      <el-table-column prop="problem" label="问题" width="260">
      </el-table-column>
      <el-table-column prop="answer" label="回答" width="260">
      </el-table-column>
      <el-table-column prop="classification" label="问题类型" width="260">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="260">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" width="260">
      </el-table-column>
      <el-table-column prop="label" label="标签" width="260">
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
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="问题">
          <el-input v-model="form1.problem"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="form1.answer"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form1.remarks"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form1.label"></el-input>
        </el-form-item>
        <el-form-item label="归类项">
          <el-select v-model="form1.number" placeholder="请选择">
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
        <el-form-item label="问题">
          <el-input v-model="form.problem"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="form.answer"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="归类项">
          <el-select v-model="form.number" placeholder="请选择">
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
  </div>
</template>

  <script>
let that;
export default {
  data() {
    return {
      problem: "",
      id: "",
      Num: 0,
      showXZ:false,
      showXG:false,
      showSC:false,
      dialogVisible: false,
      dialogVisible1: false,
      pageNum: 1, //当前页
      number:'',
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      options: [
        {
          value: "0",
          label: "业务",
        },
        {
          value: "1",
          label: "软件",
        },
        {
          value: "2",
          label: "机械",
        },
        {
          value: "3",
          label: "电气",
        },
        {
          value: "4",
          label: "操作",
        },
        {
          value: "5",
          label: "维修",
        },
        {
          value: "6",
          label: "售前",
        },
      ],
      form: {
        problem: "",
        answer: "",
        remarks: "",
        label: "",
        number: "",
      },
     form1: {
        problem: "",
        answer: "",
        remarks: "",
        label: "",
        number: "",
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
        .$post("QuestionLibrary/saveOrUpdate", {
          lProblem: that.form1.problem,
          lAnswer: that.form1.answer,
          lRemarks: that.form1.remarks,
          lNumber: that.form1.number,
          lLabel: that.form1.label,
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
        .$post("QuestionLibrary/findForPage", {
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
      console.log(row);
      that.dialogVisible1 = true;
      that.form.problem = row.lProblem;
      that.form.answer = row.lAnswer;
      that.form.remarks = row.lRemarks;
      that.form.number = row.lNumber;
      that.form.label = row.lLabel;
      that.id = row.id;
    },
    onSubmit1() {
      that
        .$post("QuestionLibrary/saveOrUpdate", {
          id: that.id,
          lProblem: that.form.problem,
          lAnswer: that.form.answer,
          lRemarks: that.form.remarks,
          lNumber: that.form.number,
          lLabel: that.form.label,
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
            .$post("QuestionLibrary/deleteQuestion", {
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
      that.problem = "";
      that.number = "";
      that.getDate()
    },
    search() {
      that
        .$post("QuestionLibrary/findForPage", {
          lProblem: that.problem,
          lNumber: that.number,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "questionLibrary")
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