import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Building2, CalendarDays, Check, ChevronLeft, ChevronRight, Compass, FileText, House, MapPin, Phone, Ruler, Search, Trees } from 'lucide-react'
import { DemoBadge, InspectionCTA, PropertyCard, PropertyImage, SearchForm, WhatsApp } from './components'
import { address, filterProperties, phone, priceLabel, properties, type Property } from './data'

export function Home() {
  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="accent-line"/> ENUGU REAL ESTATE</p>
        <h1>Find your place<br className="desktop-break"/> in <em>Enugu.</em></h1>
        <p className="lead">Explore undeveloped land and completed homes with Pradaj Global Consult. Take the next step toward a place of your own.</p>
        <div className="actions"><a className="button orange" href="#/properties">Explore properties <ArrowRight size={18}/></a><WhatsApp secondary/></div>
        <p className="hero-location"><MapPin size={16}/> Based in Ogui, Enugu State</p>
      </div>
      <figure className="hero-photo"><PropertyImage name="duplex" alt="Illustrative contemporary two-storey Nigerian home with tropical landscaping" eager/>
        <figcaption><span>ARCHITECTURAL ILLUSTRATION</span><small>Sample imagery · No property offered</small></figcaption>
      </figure>
    </section>
    <div className="wrap"><SearchForm compact filters={new URLSearchParams()}/></div>
    <section className="section wrap">
      <div className="section-title"><p className="eyebrow">Find your fit</p><h2>Two ways to make Enugu home.</h2></div>
      <div className="categories">
        <a href="#/properties?type=Land"><span className="category-icon"><Trees/></span><div><h3>Undeveloped land</h3><p>Explore sample plots and picture what you could build.</p></div><ArrowUpRight className="category-arrow"/></a>
        <a href="#/properties?type=House"><span className="category-icon"><House/></span><div><h3>Completed houses</h3><p>Explore sample homes, layouts and neighbourhoods.</p></div><ArrowUpRight className="category-arrow"/></a>
      </div>
    </section>
    <section className="section tinted"><div className="wrap">
      <div className="section-title split-title"><div><p className="eyebrow">The demo collection</p><h2>Explore sample properties.</h2><p>Fictional listings and illustrative imagery for this prototype.</p></div><a className="button outline" href="#/properties">View all properties <ArrowRight size={17}/></a></div>
      <div className="property-grid">{properties.slice(0, 3).map(property => <PropertyCard key={property.id} property={property}/>)}</div>
    </div></section>
    <section className="section wrap why"><div><p className="eyebrow">Why Pradaj</p><h2>Focused on property in Enugu.</h2><p>Pradaj Global Consult Ltd. focuses on undeveloped land and completed residential houses in Enugu State. Visit the office in Ogui or get in touch by phone or WhatsApp.</p><a className="text-link" href="#/about">About Pradaj <ArrowRight size={17}/></a></div>
      <div className="steps"><p className="eyebrow">The buying process</p><h3>From browsing to viewing</h3>
        {[[Search, 'Explore the catalogue', 'Compare sample locations, property types and price ranges.'], [FileText, 'Ask questions', 'Discuss your needs and ask which documents are available for a real property.'], [CalendarDays, 'Discuss a viewing', 'Contact the office to discuss viewing arrangements for a real property.']].map(([Icon, title, body], index) => {
          const StepIcon = Icon as typeof Search
          return <div className="step" key={String(title)}><span><StepIcon size={19}/></span><div><strong>{index + 1}. {String(title)}</strong><p>{String(body)}</p></div></div>
        })}
      </div>
    </section>
    <InspectionCTA/>
  </>
}

function PageIntro({ label, title, children }: {label: string; title: string; children: string}) {
  return <div className="page-intro"><div className="wrap"><p className="eyebrow"><span className="accent-line"/>{label}</p><h1>{title}</h1><p>{children}</p></div></div>
}

export function Catalogue({ filters }: {filters: URLSearchParams}) {
  const results = filterProperties(filters)
  const [list, setList] = useState(false)
  return <><PageIntro label="The demo collection" title="Property catalogue">Explore fictional land and completed houses across Enugu. Every listing is a sample.</PageIntro>
    <section className="wrap section catalogue"><SearchForm key={filters.toString()} filters={filters}/>
      <div className="result-bar"><p role="status">{results.length} demo {results.length === 1 ? 'property' : 'properties'}</p><div className="actions"><a className="text-link" href="#/properties" onClick={event => { if (!filters.size) event.currentTarget.closest('section')?.querySelector('form')?.reset() }}>Reset filters</a><button className="button outline" type="button" aria-pressed={list} onClick={() => setList(!list)}>{list ? 'Grid view' : 'List view'}</button></div></div>
      {results.length ? <div className={'property-grid ' + (list ? 'list-view' : '')}>{results.map(property => <PropertyCard key={property.id} property={property}/>)}</div> :
        <div className="empty"><Search size={30}/><h2>No matching properties</h2><p>Try a different location, property type or budget.</p><a className="button orange" href="#/properties">Clear all filters</a></div>}
    </section>
  </>
}

export function Details({ property }: {property: Property}) {
  const [slide, setSlide] = useState(0)
  const gallery = [property.image, property.image + '-detail']
  return <section className="wrap section detail">
    <a className="text-link" href="#/properties"><ArrowLeft size={17}/> Back to properties</a>
    <div className="detail-heading"><DemoBadge/><h1>{property.title}</h1><p><MapPin size={17}/> {property.location}, Enugu State</p></div>
    <div className="detail-grid">
      <div>
        <figure className="detail-gallery">
          <div className="gallery-photo"><PropertyImage key={gallery[slide]} name={gallery[slide]} alt={(slide ? 'Closer crop of the illustrative ' : 'Wide view of the illustrative ') + property.type.toLowerCase()} eager/></div>
          <figcaption><span aria-live="polite">{slide + 1} / {gallery.length} · {slide ? 'Detail crop' : 'Wide view'} · Illustrative image</span><div><button className="icon-button" aria-label="Previous image" onClick={() => setSlide((slide + gallery.length - 1) % gallery.length)}><ChevronLeft/></button><button className="icon-button" aria-label="Next image" onClick={() => setSlide((slide + 1) % gallery.length)}><ChevronRight/></button></div></figcaption>
        </figure>
        <div className="detail-description"><h2>About this sample</h2><p>{property.description} The neighbourhood is real. The listing, specifications and price are fictional.</p><h2>Sample documentation</h2><p><strong>Example only.</strong> A real listing could show fields for a survey plan and title documentation. No documents are supplied or verified for this fictional listing.</p></div>
      </div>
      <aside className="detail-aside">
        <p className="eyebrow">Sample price</p><h2>{priceLabel(property.price)}</h2>
        <dl><div><dt><Building2 size={17}/> Property type</dt><dd>{property.type === 'House' ? 'Completed house' : 'Undeveloped land'}</dd></div><div><dt><Ruler size={17}/> Plot size</dt><dd>{property.area} m²</dd></div>{property.bedrooms && <div><dt><BedDouble size={17}/> Bedrooms</dt><dd>{property.bedrooms}</dd></div>}<div><dt><MapPin size={17}/> Sample area</dt><dd>{property.location}</dd></div></dl>
        <a className="button orange" href={'#/inspection?property=' + property.id}>Try inspection request <ArrowRight size={17}/></a>
        <WhatsApp secondary label="Enquire on WhatsApp" message={`Hello Pradaj Global Consult. I saw the fictional “${property.title}” example on the prototype. Could you share information about real ${property.type === 'House' ? 'houses' : 'land'} in Enugu?`}/>
        <p className="fine-print">WhatsApp opens a real conversation with Pradaj. The inspection form is a simulation.</p>
      </aside>
    </div>
  </section>
}

const today = () => new Intl.DateTimeFormat('en-CA', {timeZone: 'Africa/Lagos', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date())

export function Inspection({ selected }: {selected: string}) {
  const [complete, setComplete] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()
    setComplete(true)
  }
  return <><PageIntro label="Prototype interaction" title="Request an inspection">Try how a viewing request would work. Use fictional contact details for this demo.</PageIntro>
    <section className="wrap section inspection-layout"><aside className="notice"><CalendarDays/><h2>Demo mode</h2><p>The form checks your entries and shows a simulated confirmation. It sends and stores no information.</p><p>For a real enquiry, contact the Pradaj office.</p><WhatsApp secondary/></aside>
    {complete ? <div className="form-panel confirmation" role="status" ref={node => node?.focus()} tabIndex={-1}><span className="category-icon"><Check/></span><h2>Simulation complete</h2><p>The demo form passed validation. No request was sent and no inspection was booked.</p><div className="actions"><button className="button orange" onClick={() => setComplete(false)}>Try another request</button><a className="text-link" href="#/properties">Return to properties <ArrowRight size={17}/></a></div></div> :
      <form className="form-panel" onSubmit={submit}><h2>Inspection details</h2><p>All fields are required except the message.</p><div className="form-grid">
        <label>Full name<input name="name" required minLength={2} maxLength={100} pattern={String.raw`.*\S.*`} placeholder="e.g. Ada Example"/></label>
        <label>Contact phone<input name="phone" type="tel" required pattern={String.raw`[+]?(?:[0-9][ \-]?){6,18}[0-9]`} title="Use 7 to 19 digits with optional spaces, hyphens or a leading plus." placeholder="e.g. 08000000000"/></label>
        <label>Property<select name="property" required defaultValue={properties.some(property => property.id === selected) ? selected : ''}><option value="" disabled>Choose a demo property</option>{properties.map(property => <option value={property.id} key={property.id}>{property.title}</option>)}</select></label>
        <label>Preferred date<input name="date" type="date" min={today()} required/></label>
        <label className="span-two">Message <span>(optional)</span><textarea name="message" rows={4} maxLength={600} placeholder="Anything the viewing team should know?"/></label>
      </div><button className="button orange" type="submit">Simulate inspection request <ArrowRight size={18}/></button></form>}
    </section></>
}

export function About() {
  return <><PageIntro label="About Pradaj" title="Property in Enugu.">Pradaj Global Consult Ltd. focuses on selling undeveloped land and completed residential houses in Enugu State, Nigeria.</PageIntro>
  <section className="wrap section info-grid"><div><p className="eyebrow">What we focus on</p><h2>Land and completed homes</h2><p>Explore the two property categories in the demo catalogue. For information about real properties, contact Pradaj directly.</p><a className="button orange" href="#/properties">Explore the catalogue <ArrowRight size={18}/></a></div><div className="notice"><Compass/><h2>Based in Ogui</h2><address>{address}</address><a className="text-link" href="#/contact">Contact the office <ArrowRight size={17}/></a></div></section></>
}

export function Contact() {
  return <><PageIntro label="Contact Pradaj" title="Let’s talk property.">Reach Pradaj Global Consult Ltd. by phone or WhatsApp, or find the office address below.</PageIntro>
  <section className="wrap section info-grid"><div className="notice"><MapPin/><h2>Office address</h2><address>{address}</address></div><div className="notice"><Phone/><h2>Phone and WhatsApp</h2><a className="text-link contact-number" href={'tel:' + phone}>{phone} <ArrowUpRight size={16}/></a><WhatsApp/></div></section></>
}

export function Missing() {
  return <section className="wrap section empty"><h1>Page not found</h1><p>Head to the catalogue to explore the demo collection.</p><a className="button orange" href="#/properties">Browse properties <ArrowRight size={17}/></a></section>
}
