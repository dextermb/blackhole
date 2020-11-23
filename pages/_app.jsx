import Head from 'next/head'
import { Provider } from 'next-auth/client'

import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Blackhole - Fake SMTP Server</title>
      </Head>
      <Provider session={pageProps.session}>
        <Component
          {...pageProps}
        />
      </Provider>
    </>
  )
}

export default App
