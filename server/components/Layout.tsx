import Header from './Header'

/* eslint-disable react/no-unknown-property */
interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="../../main.css" />
        <script
          src="https://unpkg.com/htmx.org@1.9.9"
          integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body hx-boost="false" className="bg-darkPurple h-screen text-white">
        {/* <header>
          <a href="/logout">Logout</a>
          <a href="/login">Login</a>
        </header> */}

        <main>
          {/* <Header /> */}
          {children}
        </main>
      </body>
    </html>
  )
}

export default Layout
