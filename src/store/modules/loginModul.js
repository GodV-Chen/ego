export default {
    namespaced:true,
    state: {
        userinfo:{
            userName:'',
            token:''
        }
      },
      mutations: {
        setUserName(state,payload){
          state.userinfo=payload
        },
        del(state){
          state.userinfo=''
        }
    
      },
      actions: {
      },
}