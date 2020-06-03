import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children, ReactHTMLElement } from 'react'

const ActiveLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({ children, href }) => {
  const { pathname } = useRouter()
  const child = Children.only(children) as ReactHTMLElement<any>
  const className = pathname === href ? 'active' : ''

  return <Link href={href}>{React.cloneElement(child, { className })}</Link>
}

export default ActiveLink
