export default [
  {
    path: '/avabet',
    name: 'avabet',
    component: () => import('@/views/avabet/AvabetHomeView.vue'),
  },
  {
    path: '/avabet/history',
    name: 'avabetHistory',
    component: () => import('@/views/avabet/AvabetStatisticsView.vue'),
  },
]