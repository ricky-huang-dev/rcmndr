import LoginButton from '../../components/Login/Login'
import RegisterButton from '../../components/RegisterButton/RegisterButton'
import { motion } from 'framer-motion'
import useUpdateTitle from '../../hooks/useUpdateTitle'

function Home() {
  const slogan = ['collate.', 'recommend.', 'discover.']
  useUpdateTitle('Home')

  return (
    <div>
      <div className="flex flex-col pt-44 pb-10 px-4 gap-4">
        {slogan.map((word, i) => (
          <div key={word}>
            <motion.p
              initial={{ opacity: 1, translateX: -250 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.7, delay: i * 1 }}
              className="text-4xl"
            >
              {word}
            </motion.p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <LoginButton />
        <RegisterButton />
      </div>
    </div>
  )
}

export default Home
