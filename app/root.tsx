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
import { NavigationProvider } from './components/context/NavContext'
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
        <link
          href='https://fonts.googleapis.com/css?family=family=Inter:wght@450;550;650;700|Open+Sans|Montserrat|Source+Sans+Pro:400,600|Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap'
          rel='stylesheet'
        />
        <Meta />
        <Links />
      </head>
      <NavigationProvider>
        <body className='bg-gray-150 h-min-[100%] font-Inter text-[13px] h-full'>
          <div className='min-h-screen flex flex-col'>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
        </body>
      </NavigationProvider>
    </html>
  )
}
