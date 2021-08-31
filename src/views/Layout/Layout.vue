<template>
  <div class="layout">
    <!-- 侧边导航 -->
    <AsideNav :isCollapse="isCollapse" />
    <!-- 内容区域 -->
    <div class="content">
      <!-- 头部 -->
      <div class="top">
        <i class="el-icon-s-fold" @click="change" v-show="!isCollapse"></i>
        <i class="el-icon-s-unfold" @click="change" v-show="isCollapse"></i>
        <div class="login">
          <!-- 国际化 -->
          <el-dropdown class="drop" @command="handleCommand">
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 登录 -->
          <i class="el-icon-switch-button" @click="login" v-if="isshow"></i>
          <div v-else>
            <span>欢迎：{{ $store.state.loginModul.userinfo.userName }}</span> |
            <span @click="logout">退出</span>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="con">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AsideNav from "../../components/asideNav.vue";
import { mapMutations } from "vuex";
export default {
  components: { AsideNav },
  data() {
    return {
      isCollapse: false,
      isshow: true,
    };
  },
  mounted() {
    // console.log(this.$store.state.loginModul.userinfo.userName);
    if (this.$store.state.loginModul.userinfo.userName) {
      this.isshow = false;
    } else {
      this.isshow = true;
    }
  },
  methods: {
    ...mapMutations("loginModul", ["del"]),
    change() {
      this.isCollapse = !this.isCollapse;
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      alert("确认退出？");
      this.isshow = true;
      // 清本地存储
      localStorage.removeItem("usertoken");
      //清store仓库
      this.del();
      //返回登录界面
      this.$router.push("/login");
    },
    // 点击切换语言
    handleCommand(command){
        // console.log(command);
        // console.log(this.$i18n.locale);
        this.$i18n.locale=command
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  .content {
    flex: 1;
    .top {
      height: 50px;
      background: aquamarine;
      line-height: 50px;
      .el-icon-s-fold,
      .el-icon-s-unfold {
        color: white;
        font-size: 24px;
      }
      .login {
        float: right;
        margin-right: 10px;
        width: 230px;
        .drop{
            float: left;
            margin-right: 10px;
        }
      }
    }
    .con {
      padding: 20px;
    }
  }
}
</style>