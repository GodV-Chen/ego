<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="box">
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="password"
              v-model="ruleForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-button :plain="true" @click="open4">错误</el-button> -->

      <el-tab-pane label="注册" name="zhuce">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="password"
              v-model="ruleForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import jwt from "jwt-decode";
export default {
  data() {
    return {
      activeName: "login",
      ruleForm: {
        userName: "",
        passWord: "",
      },
      // 表单验证规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        passWord: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("loginModul", ["setUserName"]),

    // 点击tab清空
    handleClick(tab, event) {
      console.log(tab, event);
      // 切换tab重置表单内容（因为注册登录用的同一套）
      this.$refs.ruleForm.resetFields();
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(this.ruleForm);
        if (valid) {
          //判断点击的是登录还是注册
          if(this.activeName==='login'){
            // let {username,password}=this.ruleForm
          let username = this.ruleForm.userName;
          let password = this.ruleForm.passWord;
          this.$api
            .getLogin({
              username,
              password,
            })
            .then((res) => {
              console.log(res.data); //token
              console.log(jwt(res.data.data));
              let obj = {
                userName:jwt(res.data.data).username,
                token:res.data.data,
              };
              //存到store仓库
              this.setUserName(obj);
              //存在本地
              localStorage.setItem('usertoken',JSON.stringify(obj))
              // 跳转
              this.$router.push('/goodmanage')
            });
          }else{
            console.log('注册事件');
            
            // this.$message('错了哦，这是一条错误消息');
          }
        }else{
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background-color: rgb(221, 219, 219);
  overflow: hidden;
  .box {
    width: 450px;
    height: 350px;
    background-color: white;
    margin: 100px auto;
    padding: 20px;
    .el-input {
      width: 80%;
    }
  }
}
</style>