import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./loginFunctionality/SignIn.vue"
import MainComponent from "./Main.vue"
import SignInUpComponent from "./loginFunctionality/SignInUp.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: "SignInUp"
      }
    },
    {
      path:"/signinup",
      name: "SignInUp",
      component: SignInUpComponent
    },
    {
      path: "/signin",
      name: "SignIn",
      component: LoginComponent
    },
    {
      path: "/main",
      name: "main",
      component: MainComponent
    }
  ]
})
