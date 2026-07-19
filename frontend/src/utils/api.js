import axios from 'axios'

// Local dev (npm run dev) uses the Vite proxy to localhost:5000.
// Production build (npm run build, deployed to GitHub Pages) talks to the live Render backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vc_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api