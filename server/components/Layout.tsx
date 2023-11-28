import Rcmndr from './Rcmndr'

/* eslint-disable react/no-unknown-property */

interface Props {
  title: string
  children: React.ReactNode
}

interface LayoutProps extends Props {
  AuthenicationControl: React.ReactNode
}

export function LayoutLoggedIn({ children, title }: Props) {
  return (
    <Layout
      title={title}
      AuthenicationControl={
        <a className="mr-4" href="/logout" hx-boost="false">
          Logout
        </a>
      }
    >
      {children}
    </Layout>
  )
}

export function LayoutLoggedOut({ children, title }: Props) {
  return (
    <Layout
      title={title}
      AuthenicationControl={
        <a className="ml-4" href="/login" hx-boost="false">
          Login
        </a>
      }
    >
      {children}
    </Layout>
  )
}

function Layout({ AuthenicationControl, children, title }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="../../main.css" />
        <script src="/htmx.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js"
          integrity="sha512-rpLlll167T5LJHwp0waJCh3ZRf7pO6IT1+LZOhAyP6phAirwchClbTZV3iqL3BMrVxIYRbzGTpli4rfxsCK6Vw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          defer
        ></script>

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <title>{title}</title>
      </head>
      <body hx-boost="true" className="bg-darkPurple h-screen text-white">
        <header className="flex justify-between items-center">
          <Rcmndr />

          <div className="flex items-center">{AuthenicationControl}</div>
        </header>
        <h1 className=" tx-2xl font-bold">{title}</h1>

        <main>{children}</main>
      </body>
    </html>
  )
}
