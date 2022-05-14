import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

import IPAdressInputLocationOutput from '../components/IPAddressInputLocationOutput'
import { useState } from 'react'

export default function Home() {
  const [latAndLng, setLatAndLng] = useState(null)
  const Map = dynamic(
    () => import('../components/Map'), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  )
  return (
    <>
      <Head>
        <title>IP Adress Tracker</title>
        <link
          rel='icon'
          type='image/x-icon'
          href='/images/favicon-32x32.png'
        ></link>
      </Head>
      <IPAdressInputLocationOutput setLatAndLng={setLatAndLng} />
      <Map latAndLng={latAndLng} />
    </>
  )
}
