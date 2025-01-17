import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard/users')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL',
    }
  }
]

export default DashboardRoutes
