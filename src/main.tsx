import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Footer, Header } from './components'
import { About, Catalogue, Contact, Details, Home, Inspection, Missing } from './screens'
import { properties } from './data'
import '@fontsource-variable/inter'
import '@fontsource-variable/manrope'
import './styles.css'

function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/')
  const [path, query] = route.split('?')
  const filters = new URLSearchParams(query)
  const main = useRef<HTMLElement>(null)
  const previousPath = useRef(path)
  useEffect(() => {
    const update = () => setRoute(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  useEffect(() => {
    if (path !== previousPath.current) {
      window.scrollTo(0, 0)
      main.current?.focus({preventScroll: true})
      previousPath.current = path
    }
  }, [path])
  const property = path.startsWith('/property/') ? properties.find(item => path === '/property/' + item.id) : undefined
  const pages = {
    '/': <Home/>, '/properties': <Catalogue filters={filters}/>, '/about': <About/>, '/contact': <Contact/>,
    '/inspection': <Inspection key={route} selected={filters.get('property') ?? ''}/>,
  }
  return <div className="min-h-screen flex flex-col">
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); main.current?.focus(); main.current?.scrollIntoView() }}>Skip to content</a>
    <Header path={path}/>
    <main ref={main} id="main" tabIndex={-1} className="grow">{property ? <Details key={property.id} property={property}/> : Object.hasOwn(pages, path) ? pages[path as keyof typeof pages] : <Missing/>}</main>
    <Footer/>
  </div>
}

createRoot(document.getElementById('root')!).render(<App/>)
