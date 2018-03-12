import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import HomePassword from '../pages/HomePassword.vue'
import HomeTelephone from '../pages/HomeTelephone.vue'
import HomeCode from '../pages/HomeCode.vue'
import UserInformation from '../pages/UserInformation.vue'
import UserInformationEdit from '../pages/UserInformationEdit.vue'
import TechnicalMaintenance from '../pages/TechnicalMaintenance.vue'
import CertificationProcess from '../pages/CertificationProcess.vue'
import Renew from '../pages/Renew.vue'
import Record from '../pages/Record.vue'
import Game from '../pages/Game.vue'
import Pay from '../pages/Pay.vue'
import PayStatus from '../pages/PayStatus.vue'
import EditPassword from '../pages/EditPassword.vue'
import Test from '../pages/Test.vue'
import Agreement from '../pages/Agreement.vue'
import Wait from '../pages/Wait.vue'
import Error from '../pages/Error.vue'
import RiskWarning from '../pages/RiskWarning.vue'
import Cropper from '../components/Cropper.vue'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: '/mobile/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HomeTelephone',
          component: HomeTelephone,
        },
        {
          path: '/password',
          name: 'HomePassword',
          component: HomePassword,
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/code',
          name: 'HomeCode',
          component: HomeCode,
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/edit',
          name: 'EditPassword',
          component: EditPassword,
          meta: {
            requireAuth: true
          },
        },
      ]
    },

    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
    },
    {
      path: '/wait',
      name: 'Wait',
      component: Wait,
    },
    {
      path: '/certificationProcess',
      name: 'CertificationProcess',
      component: CertificationProcess,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/service',
      name: 'TechnicalMaintenance',
      component: TechnicalMaintenance,

    },
    {
      path: '/user-edit',
      name: 'UserInformationEdit',
      component: UserInformationEdit,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/user',
      name: 'UserInformation',
      component: UserInformation,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/renew',
      name: 'renew',
      component: Renew,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/risk',
      name: 'RiskWarning',
      component: RiskWarning
    },
    {
      path: '/pay-status',
      name: 'PayStatus',
      component: PayStatus
    },
    {
      path: '/cropper',
      name: 'Cropper',
      component: Cropper,
      meta: {
        requireAuth: true
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  // mode: 'history'
});
router.beforeEach((to, from, next) => {
  next();
  // if (!Vue.cookies.isKey('nasid')||!Vue.cookies.isKey('nasid')) {
  //   next({path: '/'})
  // } else {
  //   next();
  // }
    // next({ path: '/' })
    // to.path === '/user'
    // if (!store.state.user && (to.path === '/watchHouse' || to.path === '/AgentMsg')) {
    //   next({ path: '/login' })
    // } else {
    //   next()
    // }
    // if (!store.state.user && (from.path === '/my') && (to.path === '/ToolCompute')) {
    //   next({ path: '/login' })
    // }

})
export default router;
