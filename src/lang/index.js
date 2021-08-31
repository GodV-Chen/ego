import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages={
    en:{
        home:{
            product:'product Message',  
        },
        ...enLocale
    },
    zh:{
        home:{
            product:'商品管理',
        },
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale:'zh',
    messages,
})

Element.i18n((key, value) => i18n.t(key, value))

// new Vue({i18n}).$mount('#app')

export default i18n