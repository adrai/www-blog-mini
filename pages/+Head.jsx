// https://vike.dev/Head
import faviconUrl from '../public/favicon.svg'

export default function HeadDefault () {
  return (
    <>
      <link rel='icon' href={faviconUrl} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes' />
      <meta name='theme-color' content='#3700FF' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='My Site' />
    </>
  )
}
