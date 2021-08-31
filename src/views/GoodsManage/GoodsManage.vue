<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="search"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <!-- 商品列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="120"> </el-table-column>
      <el-table-column prop="title" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="120">
      </el-table-column>
      <el-table-column prop="category" label="规格类目" width="120">
      </el-table-column>
      <el-table-column
        prop="image"
        label="商品图片"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" width="120">
      </el-table-column>
      <el-table-column
        prop="descs"
        label="商品描述"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @changePage="changePage"
      />
    </div>

    <!-- 弹框组件 -->
    <Dialog ref="myRef" :title='title' :rowData='rowData' :pageNum='pageNum'/>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Dialog from "./Dialog.vue";
export default {
  components: { Pagination, Dialog },
  data() {
    return {
      tableData: [], //表格数据
      pageSize: 10,
      total: 100,
      pageNum:1,
      input: "",
      title:'类目选择',
      rowData:{}
    };
  },

  methods: {
    //编辑商品
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.myRef.dialogVisible = true;
      this.title='编辑页面'
      this.rowData={...row}
    },
    // 点击分页改变当前页
    changePage(val) {
      console.log(val);
      this.pageNum=val
      this.http(val);
    },
    //网络请求
    http(page) {
      this.$api
        .GoodsList({
          page,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.pageSize = res.data.pageSize;
            this.total = res.data.total;
          }
        });
    },
    //输入框回车失去焦点触发
    search() {
      console.log(this.input);
      if (this.input) {
        this.$api
          .GoodsSearch({
            search: this.input,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              (this.pageSize = 8), (this.total = res.data.result.length);
            } else {
              console.log("无数据");
              this.tableData = [];
              (this.pageSize = 1), (this.total = 0);
            }
          });
      } else {
        //如果输入框没有输入搜索字，请求第一页数据
        this.http(1);
      }
    },
    //点击添加按钮出现弹框
    showDialog() {
      this.title='类目选择'
      this.$refs.myRef.dialogVisible = true;
    },
    //删除商品
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        this.$api
          .delGoods({
            id: row.id,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.http(this.pageNum);
              this.$message({
                  type: "success",
                  message: "删除成功!",
                });
            }else{
              this.$message.error('错了哦，删除失败');
            }
          });
      })
    },
    
  },
  
  created() {
    this.http(1);
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.header {
  display: flex;
  justify-content: center;
  margin-left: 20px;
}
</style>