import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, BedDouble, MapPin, Menu, MessageCircle, Ruler, Search, X } from 'lucide-react'
import { address, locations, phone, priceLabel, whatsapp, type Property } from './data'

export function Brand() {
  return <a className="brand" href="#/" aria-label="Pradaj Global Consult home">
    <img className="brand-logo" src={window.previewImages?.['pradaj-logo.png'] ?? './images/pradaj-logo.png'} alt="Pradaj Global Consult Ltd." width="492" height="340"/>
  </a>
}

export function WhatsApp({ message, label = 'WhatsApp us', secondary = false }: {message?: string; label?: string; secondary?: boolean}) {
  return <a className={'button ' + (secondary ? 'outline' : 'navy')} href={whatsapp(message)} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{label}<ArrowUpRight size={15}/></a>
}

const links = [['/', 'Home'], ['/properties', 'Properties'], ['/about', 'About'], ['/contact', 'Contact']]

export function Header({ path }: {path: string}) {
  const [open, setOpen] = useState(false)
  const active = path.startsWith('/property/') ? '/properties' : path
  return <header className="header" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); document.getElementById('menu-toggle')?.focus() } }}>
    <div className="wrap nav-row"><Brand/>
      <button className="icon-button menu-toggle" id="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav id="main-nav" aria-label="Main navigation" className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([href, title]) => <a key={href} href={'#' + href} aria-current={active === href ? 'page' : undefined} onClick={() => setOpen(false)}>{title}</a>)}
        <a className="button navy nav-cta" href="#/inspection" onClick={() => setOpen(false)}>Request inspection <ArrowUpRight size={16}/></a>
      </nav>
    </div>
  </header>
}

export function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-grid">
    <div><Brand/><p>Land and completed residential homes in Enugu State, Nigeria.</p></div>
    <nav aria-label="Footer navigation"><strong>Explore</strong>{links.slice(1).map(([href, title]) => <a key={href} href={'#' + href}>{title}</a>)}<a href="#/inspection">Request inspection</a></nav>
    <div><strong>Get in touch</strong><address>{address}</address><a href={'tel:' + phone}>{phone}</a><a href={whatsapp()} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={14}/></a></div>
  </div><div className="footer-bottom"><span>Pradaj Global Consult Ltd.</span><span>Website prototype · All listings are fictional</span></div></div></footer>
}

export function PropertyImage({ name, alt, eager = false }: {name: string; alt: string; eager?: boolean}) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className="photo-fallback" role="img" aria-label={alt + '. Image unavailable.'}>Illustration unavailable</div> :
    <img src={window.previewImages?.[name + '.webp'] ?? './images/' + name + '.webp'} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)}/>
}

export function DemoBadge() { return <span className="demo-badge">DEMO / NOT FOR SALE</span> }

export function PropertyCard({ property }: {property: Property}) {
  return <article className="property-card">
    <a className="card-photo" href={'#/property/' + property.id} aria-label={'View demo: ' + property.title}>
      <PropertyImage name={property.image} alt={'Illustrative ' + property.type.toLowerCase() + ' exterior'}/><DemoBadge/>
    </a>
    <div className="card-body">
      <div className="card-meta"><span>{property.type === 'House' ? 'Completed house' : 'Undeveloped land'}</span><span><MapPin size={14}/>{property.location}</span></div>
      <h3><a href={'#/property/' + property.id}>{property.title}</a></h3>
      <div className="specs"><span><Ruler size={16}/>{property.area} m²</span>{property.bedrooms && <span><BedDouble size={16}/>{property.bedrooms} beds</span>}</div>
      <div className="card-bottom"><div><small>Sample price</small><strong>{priceLabel(property.price)}</strong></div><a className="icon-button" href={'#/property/' + property.id} aria-label={'View details for ' + property.title}><ArrowUpRight size={20}/></a></div>
    </div>
  </article>
}

export function SearchForm({ filters, compact = false }: {filters: URLSearchParams; compact?: boolean}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, name) => { if (String(value).trim()) query.set(name, String(value).trim()) })
    window.location.hash = '/properties' + (query.size ? '?' + query : '')
  }
  return <form className={'search-panel ' + (compact ? 'home-search' : '')} onSubmit={submit} aria-label="Search demo properties">
    {!compact && <label>Keyword<input name="q" type="search" placeholder="Try Emene" defaultValue={filters.get('q') ?? ''}/></label>}
    <label>Property type<select name="type" defaultValue={filters.get('type') ?? ''}><option value="">All property types</option><option value="Land">Undeveloped land</option><option value="House">Completed house</option></select></label>
    <label>Location<select name="location" defaultValue={filters.get('location') ?? ''}><option value="">All Enugu locations</option>{locations.map(location => <option key={location}>{location}</option>)}</select></label>
    <label>Maximum budget<select name="budget" defaultValue={filters.get('budget') ?? ''}><option value="">Any budget</option>{[20000000, 30000000, 60000000, 100000000, 200000000, 250000000].map(budget => <option key={budget} value={budget}>{priceLabel(budget)}</option>)}</select></label>
    {!compact && <label>Sort by<select name="sort" defaultValue={filters.get('sort') ?? ''}><option value="">Featured</option><option value="low">Price low to high</option><option value="high">Price high to low</option></select></label>}
    <button className="button orange" type="submit"><Search size={18}/>{compact ? 'Search properties' : 'Apply filters'}</button>
  </form>
}

export function InspectionCTA() {
  return <section className="wrap section"><div className="inspection-banner"><div><p className="eyebrow">See it in person</p><h2>Ready to explore the next step?</h2><p>Try the inspection request flow, or contact the Pradaj office for a real enquiry.</p></div><a className="button orange" href="#/inspection">Try an inspection request <ArrowRight size={18}/></a></div></section>
}
