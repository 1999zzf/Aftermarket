 <template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" v-if="showXZ"
      >新增</el-button
    >
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="primary" @click="leading()" v-if="showDC">导出</el-button>
    <el-button type="info" @click="alldel()">删除</el-button>
    <el-row style="margin-top: 10px">
      <el-col :span="6">
        省市:
        <el-input
          placeholder="请输入内容"
          v-model="provincesCities"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="6">
        项目名称:
        <el-input
          placeholder="请输入内容"
          v-model="entryName"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="6">
        备件名称:
        <el-input
          placeholder="请输入内容"
          v-model="spareName"
          style="width: 65%"
        >
        </el-input>
      </el-col>
      <el-col :span="6">
        是否送达:
        <el-input
          placeholder="请输入内容"
          v-model="isService"
          style="width: 65%"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="730">
      <el-table-column prop="provincesCities" label="省市" width="120">
      </el-table-column>
      <el-table-column prop="entryName" label="项目名称" width="120">
      </el-table-column>
      <el-table-column prop="spareName" label="备件名称" width="120">
      </el-table-column>
      <el-table-column prop="spareNumber" label="备件数量" width="120">
      </el-table-column>
      <el-table-column prop="sparePurpose" label="备件用途" width="120">
      </el-table-column>
      <el-table-column prop="deliveryDate" label="寄送日期" width="120">
      </el-table-column>
      <el-table-column prop="expressDelivery" label="快递单号" width="120">
      </el-table-column>
      <el-table-column prop="isService" label="是否送达" width="120">
      </el-table-column>
      <el-table-column prop="spareCost" label="备件费用" width="120">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="120">
      </el-table-column>
      <el-table-column prop="creator" label="添加人" width="120">
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="120">
      </el-table-column>
      <el-table-column prop="Modifier" label="修改人" width="120">
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
        <el-form-item label="备件名称">
          <el-input v-model="form2.spareName"></el-input>
        </el-form-item>
        <el-form-item label="备件数量">
          <el-input v-model="form2.spareNumber"></el-input>
        </el-form-item>
        <el-form-item label="备件用途">
          <el-input v-model="form2.sparePurpose"></el-input>
        </el-form-item>
        <el-form-item label="寄送日期">
          <el-date-picker
            v-model="form2.deliveryDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="form2.expressDelivery"></el-input>
        </el-form-item>
        <el-form-item label="是否送达">
          <el-input v-model="form2.isService"></el-input>
        </el-form-item>
        <el-form-item label="备件费用">
          <el-input v-model="form2.spareCost"></el-input>
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
        <el-form-item label="备件名称">
          <el-input v-model="form.spareName"></el-input>
        </el-form-item>
        <el-form-item label="备件数量">
          <el-input v-model="form.spareNumber"></el-input>
        </el-form-item>
        <el-form-item label="备件用途">
          <el-input v-model="form.sparePurpose"></el-input>
        </el-form-item>
        <el-form-item label="寄送日期">
          <el-date-picker
            v-model="form.deliveryDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="form.expressDelivery"></el-input>
        </el-form-item>
        <el-form-item label="是否送达">
          <el-input v-model="form.isService"></el-input>
        </el-form-item>
        <el-form-item label="备件费用">
          <el-input v-model="form.spareCost"></el-input>
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
      spareName: "",
      isService: "",
      id: "",
      Num: 0,
      showXZ: false,
      showDC: false,
      showXG: false,
      showSC: false,
      dialogVisible: false,
      dialogVisible1: false,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      currentPage: 1,
      tableData: [],
      form: {
        provincesCities: "",
        entryName: "",
        spareName: "",
        spareNumber: "",
        sparePurpose: "",
        deliveryDate: "",
        expressDelivery: "",
        isService: "",
        spareCost: "",
      },
      form2: {
        provincesCities: "",
        entryName: "",
        spareName: "",
        spareNumber: "",
        sparePurpose: "",
        deliveryDate: "",
        expressDelivery: "",
        isService: "",
        spareCost: "",
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
              "SpareParts/exportExcel" +
              "?provincesCities=" +
              that.provincesCities +
              "&entryName=" +
              that.entryName +
              "&spareName=" +
              that.spareName +
              "&isService=" +
              that.isService;
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
        .$post("SpareParts/saveOrUpdate", {
          provincesCities: that.form2.provincesCities,
          entryName: that.form2.entryName,
          spareName: that.form2.spareName,
          spareNumber: that.form2.spareNumber,
          sparePurpose: that.form2.sparePurpose,
          deliveryDate: that.form2.deliveryDate,
          expressDelivery: that.form2.expressDelivery,
          isService: that.form2.isService,
          spareCost: that.form2.spareCost,
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
        .$post("SpareParts/findForPage", {
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
      that.form.spareName = row.spareName;
      that.form.spareNumber = row.spareNumber;
      that.form.sparePurpose = row.sparePurpose;
      that.form.deliveryDate = row.deliveryDate;
      that.form.expressDelivery = row.expressDelivery;
      that.form.isService = row.isService;
      that.form.spareCost = row.spareCost;
      that.id = row.id;
    },
    onSubmit1() {
      that
        .$post("SpareParts/saveOrUpdate", {
          id: that.id,
          provincesCities: that.form.provincesCities,
          entryName: that.form.entryName,
          spareName: that.form.spareName,
          spareNumber: that.form.spareNumber,
          sparePurpose: that.form.sparePurpose,
          deliveryDate: that.form.deliveryDate,
          expressDelivery: that.form.expressDelivery,
          isService: that.form.isService,
          spareCost: that.form.spareCost,
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
            .$post("SpareParts/deleteSpareParts", {
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
        (that.spareName = ""),
        (that.isService = ""),
        that.getDate();
    },
    search() {
      that
        .$post("SpareParts/findForPage", {
          provincesCities: that.provincesCities,
          entryName: that.entryName,
          spareName: that.spareName,
          isService: that.isService,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "spareParts")
            for (
              var tiss = 0;
              tiss < that.asideData[ti].chrildList[tis].buttonList.length;
              tiss++
            ) {
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "增加"
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