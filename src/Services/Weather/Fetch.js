import api, { handleError } from '@/Services'

export default async (woeid) => {
  if (!woeid) {
    return handleError({ message: 'WOEID is required' })
  }
  const response = await api.get(`location/${woeid}`)
  return response.data
}
