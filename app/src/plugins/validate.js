//vee-validate插件：表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
//中文提示
import zh_CH from 'vee-validate/dist/locale/zh_CN'
import zh_tw from 'vee-validate/dist/locale/zh_TW'
Vue.use(VeeValidate)
console.log(zh_CH);
console.log(zh_tw);

VeeValidate.Validator.localize(zh_CH,{
    messages:{
        ...zh_CH.messages,
        is:(field)=>`${field}必须与密码相同`//修改内置规则的message让确认密码跟密码相同
    },
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        ischeck:'协议'
    }
})