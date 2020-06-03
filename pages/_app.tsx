import Head from 'next/head'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'
import { CssBaseline, ZeitProvider } from '@zeit-ui/react'
import { PrismBaseline } from '@zeit-ui/react-prism'
import useDomClean from 'lib/use-dom-clean'

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  useDomClean()

  return (
    <>
      <Head>
        <title>Backset - Minimalist state tool for React apps</title>
        <meta name="google" content="notranslate" />
        <meta name="twitter:creator" content="@echo_witt" />
        <meta name="referrer" content="strict-origin" />
        <meta property="og:title" content="Backset" />
        <meta property="og:url" content="https://backset.now.sh" />
        <link rel="dns-prefetch" href="//backset.now.sh" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content="Minimalist state tool for React apps." />
        <meta property="og:description" content="Minimalist state tool for React apps." />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <ZeitProvider theme={{ type: 'dark' }}>
        <CssBaseline />
        <PrismBaseline />
        <Component {...pageProps} />
        <style global jsx>{`
          #__next {
            overflow-x: unset;
          }
        `}</style>
      </ZeitProvider>
    </>
  )
}

export default Application
