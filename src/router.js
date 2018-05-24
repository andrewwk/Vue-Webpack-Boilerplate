import Vue          from 'vue';
import VueRouter    from 'vue-router';
import vueSimpleSvg from 'vue-simple-svg';

// Because Vue is not global we tie Vue
// and VueRouter together manually
Vue.use(VueRouter);
Vue.use(vueSimpleSvg);

// Initialize router
const router = new VueRouter({
  base   : '/',
  mode   : 'history',
  routes : [
    {
      path      : '/',
      name      : 'home',
      component : () => import('./components/sections/Home.vue')
    },
    {
      path     : '*',
      redirect : '/'
    }
  ]
});

export default router;
