import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Background from '../../components/UI/Background/Background'

function ErrorPage() {
  return (
    <Background>
      <div className="bg-darkPurple text-white">
        <Header />

        {/* displying the triangle exclamation */}
        <div className="flex flex-col gap-20 items-center h-screen justify-center">
          <div className="bg-white rounded-full h-52 w-52">
            <i
              className="self-centered fa-solid fa-triangle-exclamation h-40 ps-6 pt-2 "
              style={{ color: '#DBC3FA' }}
            ></i>
          </div>

          {/* displaying text */}
          <div className="text-lightPurple">
            <p>Something went wrong</p>
          </div>

          {/* displaying button linking to home page */}
          <div>
            <Link
              to="/"
              className="w-auto py-2 px-4 rounded-lg hover:shadow-[0px_0px_9px_2px_#FF17CE] bg-white text-primary"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </Background>
  )
}

export default ErrorPage
