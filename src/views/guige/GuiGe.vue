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

    <!-- 表格 -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="itemCatId" label="规格参数ID" width="180"></el-table-column>
        <el-table-column prop="id" label="类目ID" width="180"></el-table-column>
        <el-table-column prop="specsName" label="规格名称" width="180"></el-table-column>
        <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180">
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
    </template>

    <!-- 分页 -->
    <Pagination @changePage='changePage' :pageSize='pageSize' :total="total" class="pagination" />

    <!-- 弹框 -->
    <GuigeDialog ref="myref"/>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue'
import GuigeDialog from './guigeDialog.vue';
export default {
  components:{Pagination, GuigeDialog},
  created(){
    this.http(1);
  },
  data() {
    return {
      // 输入框内容
      input: "",
      // 表格数据
      tableData: [],
      // 分页
      page:1,
      pageSize:8,
      total:80,

    };
  },
  methods: {
    // 搜索框搜索事件
    search() {},
    // 点击添加显示弹框
    showDialog() {
      this.$refs.myref.dialogVisible=true
    },
    // 编辑
    handleEdit(){

    },
    // 删除
    handleDelete(){

    },
    // 分页
    changePage(val){
      this.page=val
      this.http(val);
    },
    //网络请求
    http(page) {
      this.$api.GuiGeListData({
        page,
      }).then(res=>{
      console.log(res.data);
      if (res.data.status===200) {
        this.tableData=res.data.data
        this.total=res.data.total
        this.pageSize=res.data.pageSize
      }
    })
    },
    
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