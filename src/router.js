import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "",
  routes: [
    {
      path: "/",
      redirect: { name: "HelloWorld" },
      meta: { requireAuth: true },
      component: () =>
        import(/* webpackChunkName: "washCar" */ "./views/HelloWorld.vue")
    },
    {
      path: "/helloWord",
      meta: { requireAuth: true },
      component: () =>
        import(/* webpackChunkName: "washCar" */ "./views/HelloWorld.vue"),
      name: "HelloWorld"
    },
    {
      path: "/success",
      component: () =>
        import(/* webpackChunkName: "washCar" */ "./views/success.vue"),
      name: "success"
    },
    {
      path: "/redEnvelopes",
      component: () =>
        import(/* webpackChunkName: "washCar" */ "./views/redEnvelopes.vue"),
      name: "redEnvelopes"
    },
    {
      path: '/author',
      name: 'Author',
      meta: { keepAlive: true },
      component: () => 
        import(/* webpackChunkName: "Autho" */ './views/author.vue') // 404
    },
  ]
});
