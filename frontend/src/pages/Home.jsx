import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStudyData } from '../hooks/useStudyData'
import Navbar from '../components/Navbar'

function StatCard({ value, label, color, icon }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col items-center gap-2 ${color} animate-fadeSlideUp`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-3xl font-black font-display text-slate-700">{value}</span>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">{label}</span>
    </div>
  )
}

export default function Home() {
  const { user } = useAuth()
  const { completedToday, currentStreak, longestStreak, consistencyRate } = useStudyData()
  const navigate = useNavigate()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-12">

        {/* Header */}
        <div className="mb-8 animate-fadeSlideUp">
          <p className="text-sm font-medium text-violet-400 font-sans mb-1">{greeting} 👋</p>
          <h1 className="text-3xl font-black font-display text-slate-700">
            {user?.name}
          </h1>
          <p className="mt-1 text-slate-400 text-sm font-sans">
            Your micro-study dashboard — stay consistent, stay sharp.
          </p>
        </div>

        {/* Today's Challenge Banner */}
        <div className={`relative overflow-hidden rounded-3xl p-8 mb-8 shadow-md animate-fadeSlideUp ${completedToday ? 'bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200' : 'bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200'}`}>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-20 blur-2xl" style={{ background: completedToday ? '#6ee7b7' : '#c4b5fd' }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${completedToday ? 'bg-emerald-200 text-emerald-700' : 'bg-violet-200 text-violet-700'}`}>
                {completedToday ? '✓ Completed today' : '⚡ Today\'s challenge'}
              </div>
              <h2 className="text-2xl font-black font-display text-slate-700">
                {completedToday ? 'Great job! Challenge done.' : '15-Minute Study Sprint'}
              </h2>
              <p className="mt-1 text-sm text-slate-500 font-sans max-w-sm">
                {completedToday
                  ? 'You completed today\'s challenge. Come back tomorrow!'
                  : 'Set a 15-minute timer, answer 5 questions from your notes, and keep your streak alive.'}
              </p>
            </div>
            {!completedToday && (
              <button
                onClick={() => navigate('/challenge')}
                className="shrink-0 px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                Start Challenge →
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            value={`${currentStreak}d`}
            label="Current Streak"
            color="bg-violet-100 border border-violet-200"
            icon="🔥"
          />
          <StatCard
            value={`${longestStreak}d`}
            label="Longest Streak"
            color="bg-pink-100 border border-pink-200"
            icon="🏆"
          />
          <StatCard
            value={`${consistencyRate}%`}
            label="7-Day Rate"
            color="bg-teal-100 border border-teal-200"
            icon="📈"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* How it works */}
          <div className="bg-white/70 backdrop-blur-sm border border-violet-100 rounded-2xl p-6 animate-fadeSlideUp shadow-sm">
            <h3 className="font-black font-display text-slate-700 text-lg mb-4">How It Works</h3>
            <ol className="space-y-3">
              {[
                { icon: '⏱️', text: 'Start a 15-minute countdown timer' },
                { icon: '📝', text: 'Answer 5 questions from your notes' },
                { icon: '✅', text: 'Submit to log your completion' },
                { icon: '🔥', text: 'Keep your daily streak alive' },
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{step.icon}</span>
                  <span className="text-sm text-slate-500 font-sans">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Why it matters */}
          <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 animate-fadeSlideUp shadow-sm">
            <h3 className="font-black font-display text-slate-700 text-lg mb-4">Why It Matters</h3>
            <div className="space-y-3">
              {[
                { icon: '🧠', text: 'Builds stronger memory through spacing' },
                { icon: '📅', text: 'Prevents last-night cramming' },
                { icon: '⚡', text: 'Short sessions = high retention' },
                { icon: '🎯', text: 'Micro-consistency over marathon sessions' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{item.icon}</span>
                  <span className="text-sm text-slate-500 font-sans">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
