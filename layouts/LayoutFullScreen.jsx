import { BaseLayout } from './components/BaseLayout.jsx'

export function LayoutFullScreen ({ children }) {
  return (
    <BaseLayout
      containerPadding=''
      containerMargin=''
    >
      {children}
    </BaseLayout>
  )
}
