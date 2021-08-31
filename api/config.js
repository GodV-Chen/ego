const base={
    baseUrl:'http://localhost:8888',
    loginUrl:'/api/login',//登录接口
    GoodsList:"/api/projectList",//商品列表接口
    searchUrl:"/api/search",//商品查询接口
    itemCategoryUrl:"/api/backend/itemCategory/selectItemCategoryByParentId",//一级标题结构接口
    imgUpLoadUrl:'/upload',//图片上传
    addGoodsUrl:"/api/backend/item/insertTbItem",//添加商品
    delGoodsUrl:'/api/backend/item/deleteItemById',//删除商品
    changeGoodsUrl:'/api/backend/item/updateTbItem',//修改商品
    GuiGeList:"/api/backend/itemParam/selectItemParamAll",//规格参数信息列表
    addList:"/api/backend/itemParam/insertItemParam",//规格参数增加

}

export default base