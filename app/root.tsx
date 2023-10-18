import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './tailwind.css'
import cssGlobals from './css/global.css'
import '@fontsource/inter/400.css'
// Supports weights 100-900
// import '@fontsource-variable/inter'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: cssGlobals },
]

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=Red+Hat+Display&family=Red+Hat+Text:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap'
          rel='stylesheet'
        ></link> */}
        <Meta />
        <Links />
      </head>
      <body className='bg-gray-100 '>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
