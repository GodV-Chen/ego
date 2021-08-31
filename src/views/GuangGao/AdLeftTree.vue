<template>
  <el-tree
      :data="data"
      :props="props"
      :load="loadNode"
      lazy
      @node-click='nodeClick'
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
</template>

<script>
export default {
    
    data() {
    return {
    
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
        console.log(node);
      if (node.level === 0) {
          this.$api.YiTitle().then(res=>{
              // console.log(res.data);
              if (res.data.status===200) {
                  return resolve(res.data.result);//这个name与props里的name必须相同
              }
          })
      }else{
        //  console.log('二级的菜单'); 
        //  this.$api.YiTitle({
        //      id:node.data.cid
        //  }).then(res=>{
        //       // console.log(res.data);
        //       if (res.data.status===200) {
        //           return resolve(res.data.result);//这个name与props里的name必须相同
        //       }else{
        //           return resolve([])
        //       }
        //   })
      } 
    },

    //点击树节点返回点击内容
    nodeClick(data){//data是个对象
      // console.log(data);
      this.$emit('sendData',data)
    }
  },
}
</script>

<style>

</style>