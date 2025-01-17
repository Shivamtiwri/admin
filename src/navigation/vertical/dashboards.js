// ** Icons Import
import { Home } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    navLink: '/dashboard',
    permissions: ['editor'],
    action: 'read',
    resource: 'ACL',
  }
]
