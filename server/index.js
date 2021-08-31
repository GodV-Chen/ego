const  express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//配跨域资源共享
const cors = require('cors')
app.use(cors())

const router = require('./router')
//路由
app.use('/',router)

//静态托管
app.use(express.static('upload'))

app.listen(8888,()=>{
    console.log(8888);
})