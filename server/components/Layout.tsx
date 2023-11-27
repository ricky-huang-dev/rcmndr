import Rcmndr from './Rcmndr'

/* eslint-disable react/no-unknown-property */
interface Props {
  title: string
  children: React.ReactNode
}

function Layout({ children, title }: Props) {
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
      </head>
      <body hx-boost="true" className="bg-darkPurple h-screen text-white">
        <header className="flex justify-between items-center">
          <Rcmndr />

          <div className="flex items-center">
            <a className="mr-4" href="/logout">
              Logout
            </a>

            <a className="ml-4" href="/login">
              Login
            </a>
          </div>
        </header>
        <h1 className=" tx-2xl font-bold">{title}</h1>

        <main>{children}</main>
      </body>
    </html>
  )
}

export default Layout
