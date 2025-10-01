import { rootRoute, route, index, layout, physical } from '@tanstack/virtual-file-routes'

console.log('ROUTERS')

export const routes = rootRoute('_app.tsx', [
  index('index.tsx'),
  // layout('pathlessLayout.tsx', [
  //   route('/dashboard', 'app/dashboard.tsx', [
  //     index('app/dashboard-index.tsx'),
  //     route('/invoices', 'app/dashboard-invoices.tsx', [
  //       index('app/invoices-index.tsx'),
  //       route('$id', 'app/invoice-detail.tsx'),
  //     ]),
  //   ]),
  //   physical('/posts', 'posts'),
  // ]),
])
