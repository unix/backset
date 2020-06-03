import React from 'react'
import Head from 'next/head'
import { useTheme } from '@zeit-ui/react'

const Header: React.FC<React.PropsWithChildren<any>> = ({ meta = {} }) => {
  const theme = useTheme()

  return (
    <header>
      <Head>
        <title>{meta.title} - Backset</title>
      </Head>
      <h1>Backset</h1>
      <style jsx>{`
        header {
          height: 300pt;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        h1 {
          display: inline-flex;
          text-align: center;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          font-weight: 300;
          text-transform: uppercase;
          border-bottom: 3px solid ${theme.palette.accents_6};
        }
      `}</style>
    </header>
  )
}

export default Header
