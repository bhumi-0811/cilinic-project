import { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/api.js'
import { clinic as staticClinic, doctor as staticDoctor, treatmentCategories as staticCategories, allTreatments as staticAllTreatments } from '../utils/clinicData.js'

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [settings, setSettings] = useState(staticClinic)
  const [doctor, setDoctor] = useState(staticDoctor)
  const [treatments, setTreatments] = useState(staticAllTreatments)
  const [treatmentCategories, setTreatmentCategories] = useState(staticCategories)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      api.get('/settings'),
      api.get('/doctor'),
      api.get('/treatments'),
    ]).then(([settingsRes, doctorRes, treatmentsRes]) => {
      if (settingsRes.status === 'fulfilled' && settingsRes.value.data) {
        const s = settingsRes.value.data
        setSettings({
          name: s.clinicName,
          phone: s.phone,
          phoneAlt: s.phoneAlt,
          email: s.email,
          address: s.address,
          instagram: s.instagram,
          hours: s.hours?.length ? s.hours : staticClinic.hours,
          mapEmbed: staticClinic.mapEmbed,
        })
      }
      if (doctorRes.status === 'fulfilled' && doctorRes.value.data) {
        const d = doctorRes.value.data
        setDoctor({
          name: d.name || staticDoctor.name,
          designation: d.designation || staticDoctor.designation,
          bio: d.bio || staticDoctor.bio,
          qualifications: d.qualifications?.length ? d.qualifications : staticDoctor.qualifications,
          specializations: d.specializations?.length ? d.specializations : staticDoctor.specializations,
          languages: d.languages?.length ? d.languages : staticDoctor.languages,
          photoUrl: d.photoUrl || '',
          experienceYears: d.experienceYears || 12,
        })
      }
      if (treatmentsRes.status === 'fulfilled' && treatmentsRes.value.data?.length) {
        const list = treatmentsRes.value.data.map((t) => ({ slug: t.slug, name: t.name, category: t.category, overview: t.overview, benefits: t.benefits, duration: t.duration, beforeAfterCare: t.beforeAfterCare }))
        setTreatments(list)
        const grouped = Object.values(
          list.reduce((acc, t) => {
            acc[t.category] = acc[t.category] || { id: t.category, label: t.category, treatments: [] }
            acc[t.category].treatments.push(t)
            return acc
          }, {})
        )
        setTreatmentCategories(grouped)
      }
    }).finally(() => setLoading(false))
  }, [])

  return (
    <SiteDataContext.Provider value={{ settings, doctor, treatments, treatmentCategories, loading }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider')
  return ctx
}
