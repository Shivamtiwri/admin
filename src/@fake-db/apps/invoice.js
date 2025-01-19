import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  invoices: [
    // {
    //   id: 4987,
    //   issuedDate: '13 Dec 2019',
    //   client: {
    //     address: '7777 Mendez Plains',
    //     company: 'Hall-Robbins PLC',
    //     companyEmail: 'ram@gmail.com',
    //     country: 'USA',
    //     contact: '(616) 865-4180',
    //     name: 'Ram'
    //   },
    //   service: 'Software Development',
    //   total: 3428,
    //   avatar: '',
    //   invoiceStatus: 'Paid',
    //   balance: '724',
    //   dueDate: '23 Apr 2019'
    // },
    // {
    //   id: 4988,
    //   issuedDate: '17 Jul 2019',
    //   client: {
    //     address: '04033 Wesley Wall Apt. 961',
    //     company: 'Mccann LLC and Sons',
    //     companyEmail: 'sayam@gmail.info',
    //     country: 'Haiti',
    //     contact: '(226) 204-8287',
    //     name: 'Sayam singh'
    //   },
    //   service: 'UI/UX Design & Development',
    //   total: 5219,
    //   avatar: require('@src/assets/images/avatars/10-small.png').default,
    //   invoiceStatus: 'Downloaded',
    //   balance: 0,
    //   dueDate: '15 Dec 2019'
    // },
    // {
    //   id: 4989,
    //   issuedDate: '19 Oct 2019',
    //   client: {
    //     address: '5345 Robert Squares',
    //     company: 'Leonard-Garcia and Sons',
    //     companyEmail: 'ravina@gamil.com',
    //     country: 'Denmark',
    //     contact: '(955) 676-1076',
    //     name: 'Ravina'
    //   },
    //   service: 'Unlimited Extended License',
    //   total: 3719,
    //   avatar: require('@src/assets/images/avatars/1-small.png').default,
    //   invoiceStatus: 'Paid',
    //   balance: 0,
    //   dueDate: '03 Nov 2019'
    // },
    // {
    //   id: 4990,
    //   issuedDate: '06 Mar 2020',
    //   client: {
    //     address: '19022 Clark Parks Suite 149',
    //     company: 'Smith, Miller and Henry LLC',
    //     companyEmail: 'Rinki@gamil.com',
    //     country: 'Cambodia',
    //     contact: '(832) 323-6914',
    //     name: 'Rinki'
    //   },
    //   service: 'Software Development',
    //   total: 4749,
    //   avatar: require('@src/assets/images/avatars/9-small.png').default,
    //   invoiceStatus: 'Sent',
    //   balance: 0,
    //   dueDate: '11 Feb 2020'
    // },
   
  ]
}

// ------------------------------------------------
// GET: Return Invoice List
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null, sort, sortColumn } = config
  /* eslint-enable */

  const dataAsc = data.invoices.sort((a, b) => {
    if (a[sortColumn]) {
      return a[sortColumn] < b[sortColumn] ? -1 : 1
    } else {
      const splitColumn = sortColumn.split('.')
      const columnA = a[splitColumn[0]][splitColumn[1]]
      const columnB = b[splitColumn[0]][splitColumn[1]]
      return columnA < columnB ? -1 : 1
    }
  })

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const queryLowered = q.toLowerCase()
  const filteredData = dataToFilter.filter(invoice => {
    if (String('paid').includes(queryLowered) && invoice.balance === 0) {
      return invoice.balance === 0
    } else {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        (invoice.client.companyEmail.toLowerCase().includes(queryLowered) ||
          invoice.client.name.toLowerCase().includes(queryLowered) ||
          String(invoice.id).toLowerCase().includes(queryLowered) ||
          String(invoice.total).toLowerCase().includes(queryLowered) ||
          String(invoice.balance).toLowerCase().includes(queryLowered) ||
          invoice.dueDate.toLowerCase().includes(queryLowered)) &&
        invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
      )
    }
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.invoices,
      total: filteredData.length,
      invoices: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet(/\/api\/invoice\/invoices\/\d+/).reply(config => {
  // // Get event id from URL
  const invoiceId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const invoiceIndex = data.invoices.findIndex(e => e.id === invoiceId)
  const responseData = {
    invoice: data.invoices[invoiceIndex],
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905'
    }
  }
  return [200, responseData]
})

// ------------------------------------------------
// DELETE: Deletes Invoice
// ------------------------------------------------
mock.onDelete('/apps/invoice/delete').reply(config => {
  // Get invoice id from URL
  let invoiceId = config.id

  // Convert Id to number
  invoiceId = Number(invoiceId)

  const invoiceIndex = data.invoices.findIndex(t => t.id === invoiceId)
  data.invoices.splice(invoiceIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => invoice.client)
  return [200, clients.slice(0, 5)]
})
