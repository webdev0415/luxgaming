import { Provider } from 'next-auth/client'
import Router from 'next/router'

import 'tailwindcss/tailwind.css'
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 4,
  color: '#30A1CF',
  className:'z-50',
  delay: 100
});

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <Component {...pageProps}/>
    </Provider>
  )
}

export default MyApp

