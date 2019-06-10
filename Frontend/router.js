import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./loginFunctionality/SignIn.vue"
import MainComponent from "./Main.vue"
import GameComponent from "./GameTable.vue"
import SignInUpComponent from "./loginFunctionality/SignInUp.vue"
import RegisterComponent from "./loginFunctionality/Register.vue"

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
      path: "/signinup/register",
      name: "Register",
      component: RegisterComponent
    },

    {
      path: "/signinup/signin",
      name: "SignIn",
      component: LoginComponent
    },
    {
      path: "/main",
      name: "main",
      component: GameComponent
    }
  ]
})
