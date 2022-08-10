 <template>
  <div>
    <el-button type="primary" @click="query()" v-if="showSC">查询</el-button>
    <el-button type="primary" @click="getUpLoad()">导入</el-button>
    <el-button type="primary" @click="leading()" v-if="showDC"
      >导出有答案</el-button
    >
    <el-button type="primary" @click="noleading()" v-if="showNO"
      >导出无答案</el-button
    >
    <el-row style="margin-top: 10px">
      <el-col :span="6">
        职位:
        <el-select v-model="name" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.jobTitle"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="730">
      <el-table-column prop="problem" label="问题" width="415">
      </el-table-column>
      <el-table-column prop="answer" label="答案" width="415">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" width="415">
      </el-table-column>
      <el-table-column prop="classification" label="问题类型" width="415">
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
    <div class="showEditToast">
      <el-dialog title="上传" :visible.sync="showUpLoad" width="400px">
        <el-upload
          drag
          :limit="limitNum"
          :auto-upload="false"
          accept=".xlsx"
          :action="UploadUrl()"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            只能上传xlsx文件，且不超过10M
          </div>
        </el-upload>
        <br />
        <el-button size="small" type="primary" @click="uploadFile"
          >立即上传</el-button
        >
      </el-dialog>
    </div>
  </div>
</template>

  <script>
let that;
export default {
  data() {
    return {
      name: "",
      Num: 0,
      limitNum: 1,
      showSC: false,
      showDC: false,
      showNO: false,
      showUpLoad: false,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      options: [],
      fileList: [], // excel文件列表
    };
  },
  methods: {
    handleError() {
      this.$message.error("文件上传失败");
    },
    handleSuccess() {
      this.$message.success("文件上传成功");
    },
    fileChange(file) {
      this.fileList.push(file.raw);
    },
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$message.warning("只能上传后缀是.xlsx的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${
          files.length + fileList.length
        } 个`
      );
    },
    getUpLoad() {
      that.showUpLoad = true;
    },
    uploadFile: function () {
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        that
          .$confirm("点击确定将上传文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            let form = new FormData();
            form.append("file", this.fileList[0]);
            // form.append("type", this.type);
            console.log(this.fileList[0])
            // that
            //   .$upload("sortingPlanBs/import", {
            //     data:form,
            //   })
            //   .then(function (data) {
            //     if (data && data.code == "0000") {
            //       that.$message({
            //         message: '导入成功',
            //         type: "success",
            //       });
            //       this.visible = false;
            //     } else {
            //       that.$message({
            //         message: data.msg,
            //         type: "warning",
            //       });
            //     }
            //   });
            that
              .$axios({
                method: "post",
                url: sessionStorage.getItem("IP") + "QuestionLibrary/import",
                headers: {
                  "Content-type": "multipart/form-data",
                },
                data: form,
                Headers:sessionStorage.getItem("token")
              })
              .then(
                (res) => {
                  that.visible = false;
                  that.showUpLoad = false;
                  that.fileList = [];
                  if (res.data.code == "0000") {
                    this.$message({
                      message: "上传成功",
                      type: "success",
                    });
                  }
                },
                () => {}
              );
          })
          .catch(() => {
            that.visible = false;
            that.showUpLoad = false;
            that.fileList = [];
          });
      }
    },
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
      that.query();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      that.query();
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
              "TestPaper/exportExcel" +
              "?id=" +
              that.name;
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
      }
    },
    noleading() {
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
              "TestPaper/exportExcelNo" +
              "?id=" +
              that.name;
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
      }
    },
    query() {
      that
        .$post("TestPaper/findTestPaper", {
          id: that.name,
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
  },
  mounted() {
    that = this;
    that.getter();
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "testPaper")
            for (
              var tiss = 0;
              tiss < that.asideData[ti].chrildList[tis].buttonList.length;
              tiss++
            ) {
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "生成"
              ) {
                that.showSC = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "导出"
              ) {
                that.showDC = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "无答案导出"
              ) {
                that.showNO = true;
              }
            }
        }
      }
    }
  },
};
</script>