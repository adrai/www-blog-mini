import { Link } from '../components/index.js'

export function Header () {
  return (
    <header className='pt-2 md:pt-5 z-10'>
      <div className='px-2 md:px-10 lg:px-20 xl:px-32 2xl:px-40'>
        <div className='main-nav flex justify-between md:justify-start'>
          <div className='hidden md:flex justify-center items-center flex-9 space-x-5 xl:space-x-15'>
            <Link href='/docs'>docs</Link>
            <Link href='/blog'>blog</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
