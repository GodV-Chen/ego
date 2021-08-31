import base from './config'
import axios,{get,post} from '../src/utils/request'
/**
 * 请求
 */

const api = {
    // 登录接口
    getLogin(params){
        return axios.post(base.loginUrl,params)
    },

    //商品列表接口分页
    GoodsList(params){//{page:1}
        return axios.get(base.GoodsList,{params:params})
    },

    //商品查询接口
    GoodsSearch(params){
        return axios.get(base.searchUrl,{params:params})
    },

    //一级标题接口
    YiTitle(params){
        return axios.get(base.itemCategoryUrl,{params:params})
    },

    //添加商品的接口
    addGoodsData(params){
        return axios.get(base.addGoodsUrl,{params:params})
    },

    //删除商品
    delGoods(params){
        return axios.get(base.delGoodsUrl,{params:params})
    },

    //修改商品
    changeGoods(params){
        return axios.get(base.changeGoodsUrl,{params:params})
    },

    //规格参数列表数据
    GuiGeListData(params){
        return axios.get(base.GuiGeList,{params:params})
    },

    //增加规格参数
    addListData(params){
        return axios.get(base.addList,{params:params})
    },
}

export default api