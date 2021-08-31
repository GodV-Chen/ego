<template>
  <div>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
      this.$emit("changePage", val);
    },
  },
};
</script>

<style>
</style>