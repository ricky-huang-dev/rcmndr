import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export function Nav() {
  return (
    <div className="flex items-center">
      <IfAuthenticated>
        <a className="mr-4" href="/logout">
          Logout
        </a>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <a className="ml-4" href="/login">
          Login
        </a>
      </IfNotAuthenticated>

      {/* <a className="ml-4" href="/login">
    Login
  </a> */}
    </div>
  )
}

export default Nav
