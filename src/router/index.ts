import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FrensView from '@/views/FrensView.vue'
import FrensDetailsView from '@/views/FrensDetailsView.vue'
import ContestView from '@/views/ContestView.vue'
import ProfileView from '@/views/ProfileView.vue'
import GuildView from '@/views/GuildView.vue'
import GuildCreateView from '@/views/GuildCreateView.vue'
import GuildInfoView from '@/views/GuildInfoView.vue'
import GuildJoinView from '@/views/GuildJoinView.vue'
import InitDataView from '@/views/InitDataView.vue'
import ClickLimitView from '@/views/ClickLimitView.vue'
import BoosterView from '@/views/BoosterView.vue'
import EarnView from '@/views/EarnView.vue';
import InvestmentView from '@/views/InvestmentView.vue';
import LicenseView from '@/views/LicenseView.vue';
import HistoryView from '@/views/HistoryView.vue';
import StartMineView from '@/views/StartMineView.vue';
import BuyEquipmentView from '@/views/BuyEquipmentView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/frens',
      name: 'frens',
      component: FrensView
    },
    {
      path: '/frens/details',
      name: 'frensDetails',
      component: FrensDetailsView
    },
    {
      path: '/contest',
      name: 'contest',
      component: ContestView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/guild',
      name: 'guild',
      component: GuildView
    },
    {
      path: '/guild/create',
      name: 'guildCreate',
      component: GuildCreateView
    },
    {
      path: '/guild/join/:id',
      name: 'guildJoin',
      component: GuildJoinView
    },
    {
      path: '/guild/:id',
      name: 'guildInfo',
      component: GuildInfoView
    },
    {
      path: '/test',
      name: 'initData',
      component: InitDataView
    },
    {
      path: '/limit',
      name: 'limit',
      component: ClickLimitView
    },
    {
      path: '/earn',
      name: 'earn',
      component: EarnView
    },
    {
      path: '/earn/invest/:id',
      name: 'invest',
      component: InvestmentView
    },
    {
      path: '/earn/license/:id',
      name: 'licence',
      component: LicenseView
    },
    {
      path: '/earn/history/:id',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/earn/start-mine/:id',
      name: 'startMine',
      component: StartMineView
    },
    {
      path: '/earn/buy-equipment/:id',
      name: 'buyEquipment',
      component: BuyEquipmentView
    },
    {
      path: '/booster',
      name: 'booster',
      component: BoosterView
    },
    {
      path: '/frozen',
      name: 'frozen',
      component: () => import('@/views/FrozenView.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('@/views/StatisticsView.vue')
    },
    {
      path: '/captcha',
      name: 'captcha',
      component: () => import('@/views/CaptchaView.vue')
    },
    {
      path: '/active-usdt-balance',
      name: 'activeUsdtBalance',
      component: () => import('@/views/ActiveUsdtBalance.vue')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('@/views/WithdrawView.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import('@/views/BuyView.vue')
    },
    {
      path: '/gold',
      name: 'gold',
      component: () => import('@/views/GoldView.vue')
    },
    {
      path: '/gold-dust',
      name: 'goldDust',
      component: () => import('@/views/GoldDustView.vue')
    },
    {
      path: '/verification',
      name: 'verification',
      component: () => import('@/views/VerificationView.vue')
    },
    {
      path: '/users-limit',
      name: 'usersLimit',
      component: () => import('@/views/blockers/UserLimitView.vue')
    },
    {
      path: '/buy-booster',
      name: 'buyBooster',
      component: () => import('@/views/blockers/BuyBoosterView.vue')
    },
    {
      path: '/market',
      name: 'market',
      children: [
        {
          path: '',
          name: 'market',
          component: () => import('@/views/market/MarketView.vue'),
        },
        {
          path: 'new-order',
          name: 'newOrder',
          component: () => import('@/views/market/NewOrder.vue')
        },
        {
          path: 'buy',
          name: 'buy',
          component: () => import('@/views/market/GoldPurchaseView.vue')
        }
      ]
    },
    {
      path: '/tasks',
      name: 'tasksHome',
      component: () => import('@/views/tasks/TasksHomeView.vue'),
    },
    {
      path: '/tasks/:id',
      name: 'taskInfo',
      component: () => import('@/views/tasks/TaskInfoView.vue')
    },
    {
      path: '/tasks/partnership',
      name: 'tasksPartnership',
      component: () => import('@/views/tasks/PartnershipView.vue'),
    },
    {
      path: '/apps',
      name: 'appsHome',
      component: () => import('@/views/apps/AppsHomeView.vue'),
    },
    {
      path: '/apps/:type',
      name: 'appsAll',
      component: () => import('@/views/apps/AllAppsView.vue'),
    },
    {
      path: '/apps/partnership',
      name: 'appsPartnership',
      component: () => import('@/views/apps/PartnershipView.vue'),
    },
    {
      path: '/stacking',
      name: 'stacking',
      component: () => import('@/views/StackingView.vue'),
    },

  ]
})

export default router
