<template>
  <div class="adv">
      <!-- 左边树 -->
      <AdLeftTree class="left"/>
      <!-- 右边内容 -->
      <AdCon class="right"/>
  </div>
</template>

<script>
import AdCon from './adCon.vue'
import AdLeftTree from './AdLeftTree.vue'
export default {
  components: { AdLeftTree, AdCon },

}
</script>

<style lang="scss" scoped>
.adv{
  display: flex;
  .left{
    width: 250px;
  }
}
</style>