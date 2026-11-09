import catalog from './catalog.json'

export function loadCatalog() {
  return Promise.resolve(catalog)
}
