import { useEffect, useState, useRef } from 'react'
import { Loader2, Upload, Trash2 } from 'lucide-react'
import api from '../../../utils/api.js'

const categories = ['Clinic', 'Reception', 'Waiting Area', 'Treatment Rooms', 'Equipment', 'Staff', 'Events', 'Before After']

export default function GalleryTab() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('Clinic')
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  function load() {
    setLoading(true)
    api.get('/gallery').then((res) => setImages(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('category', category)
      formData.append('caption', caption)
      await api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setCaption('')
      fileRef.current.value = ''
      load()
    } finally {
      setUploading(false)
    }
  }

  async function remove(id) {
    if (!confirm('Delete this photo?')) return
    await api.delete(`/gallery/${id}`)
    load()
  }

  return (
    <div>
      <form onSubmit={handleUpload} className="rounded-2xl bg-white p-6 shadow-card">
        <p className="font-display font-semibold text-teal-800">Upload Photo</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input type="file" accept="image/*" ref={fileRef} required className="w-full rounded-xl border border-teal-200 bg-white px-4 py-2.5 text-sm sm:col-span-2" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="input" />
        </div>
        <button type="submit" disabled={uploading} className="mt-4 flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white shadow-soft disabled:opacity-70">
          {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />} Upload
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img._id} className="overflow-hidden rounded-2xl bg-white shadow-card">
              <img src={img.imageUrl} alt={img.caption} className="h-44 w-full object-cover" />
              <div className="flex items-center justify-between p-3">
                <span className="text-xs font-medium text-ink/60">{img.category}</span>
                <button onClick={() => remove(img._id)} className="rounded-lg bg-red-50 p-1.5 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {images.length === 0 && <p className="col-span-full text-center text-sm text-ink/50">No photos uploaded yet.</p>}
        </div>
      )}
    </div>
  )
}
