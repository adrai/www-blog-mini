const year = (new Date()).getFullYear()

export function Footer () {
  return (
    <footer>
      <div className='pt-15 pb-5 backdrop-blur-xs' style={{ background: 'rgba(0,0,0,0.75)' }}>
        <div className='flex mt-16 justify-center md:px-5 text-slate-300'>
          <div className='text-center'>
            <div className='w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4' />
            <p className='text-sm opacity-80'>
              © {year} me myself and i All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
