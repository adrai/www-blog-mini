import { Header } from '../Header.jsx'
import { Footer } from '../Footer.jsx'
import '../../css/index.js'
import '../Layout.css'

export function BaseLayout ({
  children,
  containerPadding = 'px-4 md:px-10 lg:px-20 xl:px-32 2xl:px-40',
  containerMargin = 'mt-6 md:mt-12 pb-12 md:pb-20'
}) {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <div className='relative overflow-hidden'>
            <div className={`${containerMargin} relative z-10`}>
              <div className={containerPadding}>
                {children}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
