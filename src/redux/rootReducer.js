// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'

const rootReducer = {
  auth,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions
}

export default rootReducer
