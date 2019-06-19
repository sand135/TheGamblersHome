import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./loginFunctionality/SignIn.vue"
import GameComponent from "./GameTable.vue"
import RegisterComponent from "./loginFunctionality/Register.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: "SignIn"
      }
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
      path: "/game",
      name: "game",
      component: GameComponent
    }
  ]
})
