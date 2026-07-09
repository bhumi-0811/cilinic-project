import { useState } from 'react'
import { Clock, Sparkles, HelpCircle, Image } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import SettingsTab from '../components/website/SettingsTab.jsx'
import TreatmentsTab from '../components/website/TreatmentsTab.jsx'
import FaqTab from '../components/website/FaqTab.jsx'
import GalleryTab from '../components/website/GalleryTab.jsx'

const tabs = [
  { key: 'settings', label: 'Timings & Contact', icon: Clock },
  { key: 'treatments', label: 'Treatments', icon: Sparkles },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
  { key: 'gallery', label: 'Gallery', icon: Image },
]

export default function WebsiteManagement() {
  const [tab, setTab] = useState('settings')

  return (
    <AdminLayout title="Website Management">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
              tab === t.key ? 'bg-teal-fade text-white' : 'bg-white text-teal-700 shadow-card'
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'settings' && <SettingsTab />}
        {tab === 'treatments' && <TreatmentsTab />}
        {tab === 'faq' && <FaqTab />}
        {tab === 'gallery' && <GalleryTab />}
      </div>
    </AdminLayout>
  )
}
