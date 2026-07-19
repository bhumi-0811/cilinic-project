import axios from 'axios'

// In local dev, Vite's proxy forwards /api to localhost:5000 (see vite.config.js).
// In production (GitHub Pages), there is no backend on the same domain, so we
// must point directly at the deployed Render backend using an env variable.
const baseURL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vc_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
