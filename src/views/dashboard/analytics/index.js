// ** React Imports
import { useContext } from 'react'

// ** Icons Imports
//import { List } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
//import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'

// ** Utils
import { kFormatter } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
//Card, CardHeader, CardTitle, CardBody
// ** Demo Components
import InvoiceList from '@src/views/apps/invoice/list'
//import Sales from '@src/views/ui-elements/cards/analytics/Sales'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
//import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'

// ** Images
// import jsonImg from '@src/assets/images/icons/json.png'
//import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** Vars
  
  // const data = [
  //   {
  //     title: '12 Invoices have been paid',
  //     content: 'Invoices have been paid to the company.',
  //     meta: '',
  //     metaClassName: 'me-1',
  //     customContent: (
  //       <div className='d-flex align-items-center'>
  //         <img className='me-1' src={jsonImg} alt='data.json' height='23' />
  //         <span>data.json</span>
  //       </div>
  //     )
  //   },
  //   {
  //     title: 'Client Meeting',
  //     content: 'Project meeting with john @10:15am.',
  //     meta: '',
  //     metaClassName: 'me-1',
  //     color: 'warning',
  //     customContent: (
  //       <div className='d-flex align-items-center'>
  //         <Avatar img={ceo} />
  //         <div className='ms-50'>
  //           <h6 className='mb-0'>John Doe (Client)</h6>
  //           <span>CEO of Infibeam</span>
  //         </div>
  //       </div>
  //     )
  //   },
  //   {
  //     title: 'Create a new project for client',
  //     content: 'Add files to new design folder',
  //     color: 'info',
  //     meta: '',
  //     metaClassName: 'me-1',
  //     customContent: <AvatarGroup data={avatarGroupArr} />
  //   },
  //   {
  //     title: 'Create a new project for client',
  //     content: 'Add files to new design folder',
  //     color: 'danger',
  //     meta: '',
  //     metaClassName: 'me-1'
  //   }
  // ]

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardCongratulations />
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg='3' sm='6'>
          <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        {/* <Col lg='6' sm='12'>
          <CardCongratulations />
        </Col> */}
        <Col lg='6' sm='6'>
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg='6' sm='6'>
          <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} />
        </Col>
      </Row>
      {/* <Row className='match-height'>
        <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col>
        <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col>
      </Row> */}
      {/* <Row className='match-height'>
        <Col xs='12'>
          <InvoiceList />
        </Col>
      </Row> */}
    </div>
  )
}

export default AnalyticsDashboard
