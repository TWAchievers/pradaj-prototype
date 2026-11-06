export type Property = {
  id: string
  title: string
  type: 'House' | 'Land'
  location: string
  price: number
  area: number
  bedrooms?: number
  image: string
  description: string
}

export const properties: Property[] = [
  { id: 'independence-duplex', title: 'Contemporary Four-Bedroom Duplex', type: 'House', location: 'Independence Layout', price: 185000000, area: 480, bedrooms: 4, image: 'duplex', description: 'An illustrative two-storey home with generous windows, a private front court and space for family living and entertaining.' },
  { id: 'thinkers-plot', title: 'Residential Plot in Thinkers Corner', type: 'Land', location: 'Thinkers Corner', price: 28000000, area: 500, image: 'plot', description: 'An illustrative undeveloped residential plot with a simple rectangular layout and an example unpaved approach.' },
  { id: 'trans-ekulu-bungalow', title: 'Three-Bedroom Courtyard Bungalow', type: 'House', location: 'Trans-Ekulu', price: 92000000, area: 420, bedrooms: 3, image: 'bungalow', description: 'An illustrative single-level home with a sheltered entry and a courtyard designed for quiet outdoor evenings.' },
  { id: 'emene-plot', title: 'Open Residential Plot in Emene', type: 'Land', location: 'Emene', price: 17000000, area: 450, image: 'open-plot', description: 'A fictional example of an undeveloped plot with open frontage and room to explore a compact home layout.' },
  { id: 'golf-estate-duplex', title: 'Four-Bedroom Garden Duplex', type: 'House', location: 'Enugu Golf Estate', price: 215000000, area: 570, bedrooms: 4, image: 'garden', description: 'A fictional contemporary duplex with timber accents, a planted forecourt and space for outdoor seating.' },
  { id: 'new-haven-plot', title: 'Spacious Plot in New Haven', type: 'Land', location: 'New Haven', price: 54000000, area: 650, image: 'palm-plot', description: 'A fictional residential plot that illustrates how a larger site could accommodate a house and outdoor space.' },
]

export const locations = [...new Set(properties.map(property => property.location))].sort()
export const phone = '+2348035489691'
export const address = 'No. 7 Nkpokiti Road, Ogui, Enugu State, Nigeria'
export const priceLabel = (price: number) => '₦' + price.toLocaleString('en-NG')
export const whatsapp = (message = 'Hello Pradaj Global Consult. I would like to ask about land and houses in Enugu.') =>
  'https://wa.me/2348035489691?text=' + encodeURIComponent(message)

export function filterProperties(filters: URLSearchParams) {
  const query = (filters.get('q') ?? '').trim().toLowerCase()
  const type = filters.get('type')
  const location = filters.get('location')
  const budget = Number(filters.get('budget'))
  const results = properties.filter(property =>
    (!query || [property.title, property.type, property.location].join(' ').toLowerCase().includes(query)) &&
    (!type || property.type === type) && (!location || property.location === location) &&
    (!budget || property.price <= budget))
  if (filters.get('sort') === 'low') results.sort((a, b) => a.price - b.price)
  if (filters.get('sort') === 'high') results.sort((a, b) => b.price - a.price)
  return results
}
