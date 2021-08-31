<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="cancel"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类目选择：" prop="category">
        <el-dialog
          width="30%"
          title="类目选择"
          :visible.sync="innerVisible"
          append-to-body
        >
          <!-- 树状导航 -->
          <Tree @sendData="sendData" />

          <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="showLeiMuData">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary" @click="innerVisible = true"
          >类目选择</el-button
        >
        <span>{{ ruleForm.category }}</span>
      </el-form-item>
      <el-form-item label="商品名称:" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格:" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量:" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点:" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="图片：" prop="image">
        <!-- 图片上传二级弹窗 -->
        <el-dialog
          width="50%"
          title="上传图片"
          :visible.sync="imgInnerVisible"
          append-to-body
        >
          <!-- 上传图片组件 -->
          <ImgUpload @imgurlData="imgurlData" />

          <span slot="footer" class="dialog-footer">
            <el-button @click="imgInnerVisible = false">取 消</el-button>
            <el-button type="primary" @click="imgInnerVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>

        <el-button type="primary" @click="imgInnerVisible = true"
          >上传图片</el-button
        >
        <img
          :src="ruleForm.image"
          alt=""
          style="width: 100px; vertical-align: middle; margin-left: 10px"
        />
      </el-form-item>

      <!-- 文本编辑器 -->
      <el-form-item label="商品描述:" prop="desc">
        <Wangeditor @getWangData="getWangData" ref="wangRef" />
      </el-form-item>
    </el-form>

    <!-- 规格参数回显 -->
      <!-- <span></span> -->
    <!-- 页脚的两个按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tree from "./Tree.vue";
import ImgUpload from "./imgUpload.vue";
import Wangeditor from "./Wangeditor.vue";
export default {
  components: { Tree, ImgUpload, Wangeditor },
  props: {
    title: {
      type: String,
      default: "类目选择",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    pageNum: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    rowData(val) {
      // console.log(val);
      // 渲染商品信息条目
      this.ruleForm = val;
      // 渲染第三方的富文本框
      this.$nextTick(() => {
        this.$refs.wangRef.editor.txt.html(val.descs);
      });
    },
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      leiMuData: {},

      // 上传图片的参数
      imgInnerVisible: false,
      url: "",

      ruleForm: {
        title: "",
        cid: "", //类目cid
        category: "", //类目
        sellPoint: "",
        price: "",
        num: "",
        desc: "", //编译信息
        image: "", //图片地址
        id: "",
      },

      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        num: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    sendData(data) {
      // console.log(data);
      this.leiMuData = data;
    },
    showLeiMuData() {
      //关闭弹窗
      this.innerVisible = false;
      this.ruleForm.category = this.leiMuData.name;
      // console.log(this.dataName);
    },
    //回显图片
    imgurlData(val) {
      // console.log(val);
      this.ruleForm.image = val;
    },
    //得到文本框的值
    getWangData(val) {
      this.ruleForm.desc = val;
    },

    //点击确定添加商品到后台
    add() {
      if (this.title == "类目选择") {
        let {
          title,
          cid,
          category,
          sellPoint,
          price,
          num,
          desc,
          paramsInfo,
          image,
        } = this.ruleForm;
        this.$api
          .addGoodsData({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            paramsInfo,
            image,
          })
          .then((res) => {
            // console.log(res.data.msg);
            if (res.data.status === 200) {
              this.dialogVisible = false;
              // 提示信息
              this.$message({
                message: "恭喜你，添加成功",
                type: "success",
              });
              // 刷新页面
              this.$parent.http(this.pageNum);
              // 清空页面
              this.ruleForm = {
                title: "",
                cid: "", //类目cid
                category: "", //类目
                sellPoint: "",
                price: "",
                num: "",
                desc: "", //编译信息
                image: "", //图片地址
              };
              // 清空wangeditor
              this.$refs.wangRef.editor.txt.clear();
            } else {
              this.$message.error("错了哦，添加失败");
            }
          });
      } else {
        console.log("bianji");
        let {
          title,
          cid,
          category,
          sellPoint,
          price,
          num,
          desc,
          paramsInfo,
          image,
          id,
        } = this.rowData;
        this.$api
          .changeGoods({
            title,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            paramsInfo,
            image,
            id,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.dialogVisible = false;
              // 提示信息
              this.$message({
                message: "恭喜你，修改成功",
                type: "success",
              });
              // 刷新页面
              this.$parent.http(this.pageNum);
              // 清空页面
              this.ruleForm = {
                title: "",
                cid: "", //类目cid
                category: "", //类目
                sellPoint: "",
                price: "",
                num: "",
                desc: "", //编译信息
                image: "", //图片地址
              };
              // 清空wangeditor
              this.$refs.wangRef.editor.txt.clear();
            } else {
              this.$message.error("错了哦，修改失败");
            }
          });
      }
    },
    //点击取消按钮
    cancel() {
      this.dialogVisible = false;
      // 清空商品配置
      (this.ruleForm = {
        title: "",
        cid: "", //类目cid
        category: "", //类目
        sellPoint: "",
        price: "",
        num: "",
        desc: "", //编译信息
        image: "", //图片地址
      }),
        // 清空wangeditor
        this.$refs.wangRef.editor.txt.clear();
    },
  },
};
</script>

<style scoped lang='scss'>
.el-input {
  width: 80%;
}
</style>