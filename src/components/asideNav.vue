<template>
  <div class="aside">
    <el-menu
      :default-active="$route.path"
      :router='true'
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <!-- <i class="iconfont icon-hetongguanli"></i>  -->
        <span slot="title">易购商品管理系统</span>
      </el-menu-item>
      <el-menu-item index="/goodmanage">
        <i class="iconfont icon-icon-service"></i> 
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{$t('home.product')}}</span>
      </el-menu-item>
      <el-menu-item index="/guige">
        <i class="iconfont icon-product"></i> 
        <span slot="title">规格参数</span>
      </el-menu-item>
      <el-menu-item index="/guanggao">
        <i class="iconfont icon-tuichu"></i> 
        <span slot="title">广告分类</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="iconfont icon-tuichu"></i> 
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/dingdanlist">订单列表</el-menu-item>
        <el-menu-item index="/tuihuo">退货管理</el-menu-item>
        <el-submenu index="1-3">
          <template slot="title">生产管理</template>
          <el-menu-item index="shengchanlist">生产列表</el-menu-item>
          <el-menu-item index="/shenhe">审核管理</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
    props:{
        isCollapse:{
            type:Boolean,
              default: false,
        }
    },
  data() {
    return {
    
        
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    
  },
};
</script>

<style lang="scss">
.aside {
//   width: 200px;
  background: #545c64;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>