export const API_ROOT = 'https://api-ebac.vercel.app/api/efood'

export async function loadCatalog(signal) {
  const response = await fetch(API_ROOT + '/restaurantes', { signal })
  if (!response.ok) throw new Error('Falha ao consultar o catálogo')
  return response.json()
}
