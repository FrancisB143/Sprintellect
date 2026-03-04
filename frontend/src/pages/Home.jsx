import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStudyData } from '../hooks/useStudyData'
import Navbar from '../components/Navbar'
import { FaFire, FaTrophy, FaChartLine, FaClock, FaCheckCircle, FaBrain, FaCalendar, FaBolt, FaBullseye } from 'react-icons/fa'

function StatCard({ value, label, icon: Icon, gradient }) {
  return (
    <div className={`relative rounded-2xl p-6 flex flex-col items-center gap-2 text-white ${gradient} shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fadeSlideUp overflow-hidden group`}>
      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <Icon className="text-3xl opacity-90 relative z-10 transition-transform duration-300 group-hover:scale-110" />
      <span className="text-4xl font-display font-extrabold relative z-10">{value}</span>
      <span className="text-xs font-bold uppercase tracking-wider opacity-90 relative z-10">{label}</span>
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 pt-32 pb-20">

        {/* Header */}
        <div className="mb-10 animate-fadeSlideUp">
          <p className="text-sm font-semibold text-transparent bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text mb-2">{greeting}</p>
          <h1 className="font-display text-5xl font-extrabold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
            {user?.name}
          </h1>
          <p className="mt-3 text-gray-600 text-base font-medium flex items-center gap-2">
            Keep your streak alive — one day at a time <FaTrophy className="text-amber-500 text-lg" />
          </p>
        </div>

        {/* Today's Challenge Banner */}
        <div className={`relative overflow-hidden rounded-3xl p-8 sm:p-10 mb-10 animate-fadeSlideUp transition-all duration-300 shadow-2xl ${
          completedToday 
            ? 'bg-linear-to-br from-emerald-500 via-green-500 to-teal-500' 
            : 'bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-2xl translate-y-12 -translate-x-12" />
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm ${
                completedToday 
                  ? 'bg-white/25 text-white border border-white/30' 
                  : 'bg-white/20 text-white border border-white/20'
              }`}>
                {completedToday ? <><FaCheckCircle className="text-sm" /> Completed</> : <><FaBolt className="text-sm" /> Today's challenge</>}
              </div>
              <h2 className="text-3xl font-display font-extrabold mb-2 text-white drop-shadow-lg">
                {completedToday ? 'Great job today!' : '15-Minute Study Sprint'}
              </h2>
              <p className="text-base font-medium max-w-md text-white/95">
                {completedToday
                  ? 'You completed today\'s challenge. Come back tomorrow for more!'
                  : 'Set a 15-minute timer, answer 5 questions, and keep your streak alive.'}
              </p>
            </div>
            {!completedToday && (
              <button
                onClick={() => navigate('/challenge')}
                className="shrink-0 px-8 py-3.5 rounded-2xl font-bold text-base text-purple-700 bg-white hover:bg-gray-50 shadow-2xl hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 uppercase tracking-wide"
              >
                Start Sprint →
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-5 mb-10 stagger-children">
          <StatCard
            value={currentStreak}
            label="Day Streak"
            gradient="bg-linear-to-br from-orange-400 via-orange-500 to-red-500"
            icon={FaFire}
          />
          <StatCard
            value={longestStreak}
            label="Best Streak"
            gradient="bg-linear-to-br from-purple-500 via-purple-600 to-indigo-600"
            icon={FaTrophy}
          />
          <StatCard
            value={`${consistencyRate}%`}
            label="7-Day Rate"
            gradient="bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-500"
            icon={FaChartLine}
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* How it works */}
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 animate-fadeSlideUp shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-display font-extrabold text-gray-900 text-xl mb-6 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 text-white shadow-lg">
                <FaBolt className="text-base" />
              </span>
              How It Works
            </h3>
            <ol className="space-y-4">
              {[
                { icon: FaClock, text: 'Start a 15-minute countdown timer', color: 'text-blue-600 bg-linear-to-br from-blue-50 to-blue-100' },
                { icon: FaBrain, text: 'Answer 5 questions from your notes', color: 'text-purple-600 bg-linear-to-br from-purple-50 to-purple-100' },
                { icon: FaCheckCircle, text: 'Submit to log your completion', color: 'text-green-600 bg-linear-to-br from-green-50 to-green-100' },
                { icon: FaFire, text: 'Keep your daily streak alive', color: 'text-orange-600 bg-linear-to-br from-orange-50 to-orange-100' },
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${step.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="text-sm" />
                  </span>
                  <span className="text-[15px] font-medium text-gray-700">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Why it matters */}
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 animate-fadeSlideUp shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-display font-extrabold text-gray-900 text-xl mb-6 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
                <FaTrophy className="text-base" />
              </span>
              Why It Matters
            </h3>
            <div className="space-y-4">
              {[
                { icon: FaBrain, text: 'Builds stronger memory through spacing', color: 'text-purple-600 bg-linear-to-br from-purple-50 to-purple-100' },
                { icon: FaCalendar, text: 'Prevents last-night cramming', color: 'text-pink-600 bg-linear-to-br from-pink-50 to-pink-100' },
                { icon: FaBolt, text: 'Short sessions = high retention', color: 'text-cyan-600 bg-linear-to-br from-cyan-50 to-cyan-100' },
                { icon: FaBullseye, text: 'Micro-consistency beats marathon sessions', color: 'text-indigo-600 bg-linear-to-br from-indigo-50 to-indigo-100' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-sm" />
                  </span>
                  <span className="text-[15px] font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
