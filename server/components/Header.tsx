import { useState } from 'react'

import Logo from './Logo'
import Nav from './Nav'

function Header() {
  const [navOpened, setNavOpened] = useState(false)

  function toggleMenu() {
    setNavOpened(() => !navOpened)
  }

  return (
    <div className="pl-4 pt-3 pr-4 flex justify-between items-center">
      <Logo />
      {!navOpened && (
        <div>
          <button onClick={toggleMenu}>
            <i className="fa-solid fa-bars text-4xl"></i>
          </button>
          <span className="absolute top-1 right-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            3
          </span>
        </div>
      )}
      {navOpened && (
        <button onClick={toggleMenu}>
          <i
            className={`fa-solid fa-times text-3xl transition ease-in-out focus:-rotate-45 duration-300`}
          ></i>
        </button>
      )}

      <nav
        className={`fixed left-0 top-12 h-full w-full backdrop-filter backdrop-blur-md bg-opacity-5 shadow-transparent transition-all ease-in-out duration-200 ${
          navOpened ? 'opacity-100' : 'hidden'
        }`}
      >
        <Nav toggleMenu={toggleMenu} />
      </nav>
    </div>
  )
}

export default Header
