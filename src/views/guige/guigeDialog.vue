<template>
  <div>
    <!-- 一级弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <!-- 树状分类 -->
      <div v-if="dialogVisible">
      <Tree @sendData="sendData" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" :disabled="disable"
          >确定并添加分组</el-button
        >
      </span>
    </el-dialog>

    <!-- 二级弹框 -->
    <el-dialog
      width="40%"
      title="商品规格参数配置"
      :visible.sync="innerVisible"
      append-to-body
    >
      <!-- 动态生成表单 -->
      <p>当前选择的商品是：{{ goods.name }}</p>
      <el-button @click="addDomain">新增规格列表</el-button>
      <hr />
      <!-- 第一层 -->
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="80px"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(item, index) in dynamicValidateForm.domains"
          :label="item.title"
          :key="index"
        >
          <div class="list">
            <el-input v-model="item.title" />
            <el-button @click.prevent="addChildDomain(index)">添加子组</el-button>
            <el-button @click.prevent="removeDomain(item)">删除</el-button>
          </div>
          <!-- 第二层 -->
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="80px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(ele, i) in item.children"
              :label="ele.title"
              :key="i"
            >
              <div class="list">
                <el-input v-model="ele.title" />
                <el-button @click.prevent="delDomain(index,i)">删除</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm"
          >提交</el-button
        >
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tree from "../GoodsManage/Tree.vue";
export default {
  components: { Tree },
  data() {
    return {
      dialogVisible: false,
      disable: true,
      innerVisible: false,
      goods: "",
      // 动态生成表单的数据
      dynamicValidateForm: {
        domains: [
        //   {
        //     value: "",
        //     title: "",
        //     children: [
        //       {
        //         value: "",
        //         title: "",
        //       },
        //     ],
        //   },
        ],
      },
    };
  },
  methods: {
    //   handleClose(done) {

    //   }
    // 确定并添加
    add() {
      this.innerVisible = true;
    },
    sendData(val) {
      // console.log(val);
      this.goods = val;
      this.disable = false;
    },
    // 动态生成表单的方法
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        title: "",
        children: [],
      });
    },
    // 添加子组
    addChildDomain(index){
        this.dynamicValidateForm.domains[index].children.push({
            value: "",
            title: "",
        })
    },
    // 删除子组
    delDomain(index,i){
        this.dynamicValidateForm.domains[index].children.splice(i,1)
    },
    // 提交按钮
    submitForm(){
        // console.log(this.goods);
        let itemCatId=this.goods.cid
        let specsName=this.goods.name
        this.$api.addListData({
            itemCatId,
            content:JSON.stringify(this.dynamicValidateForm.domains) ,
            specsName
        }).then(res=>{
            console.log(res);
            if (res.status === 200) {
            //隐藏弹框
            this.innerVisible = false;
            this.dialogVisible = false;
            //清空数据
            this.dynamicValidateForm.domains = []; //清空
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
            });
            this.disable=true
            //视图更新
            this.$parent.http(1);
          } else {
              this.$message.error('错了哦，添加失败');
          }
        })
    }


 },
};
</script>

<style lang='scss' scoped>
.list {
  display: flex;
}
</style>