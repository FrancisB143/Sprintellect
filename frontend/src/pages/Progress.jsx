import { useStudyData } from '../hooks/useStudyData'
import Navbar from '../components/Navbar'
import { FaFire, FaTrophy, FaChartLine, FaBook, FaCheckCircle, FaHourglassHalf, FaLightbulb, FaChartBar, FaBullseye } from 'react-icons/fa'

function CalendarMonth({ year, month, completions }) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  const monthName = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const isToday = dateStr === todayStr
    const completed = completions.includes(dateStr)
    const isPast = new Date(dateStr) < today && !isToday
    cells.push({ d, dateStr, completed, isToday, isPast })
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="font-display font-extrabold text-gray-900 text-lg mb-5">{monthName}</h3>
      <div className="grid grid-cols-7 gap-2 mb-3">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`e-${i}`} />
          const { d, completed, isToday, isPast } = cell
          let cls = 'w-full aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 '
          if (isToday) {
            cls += completed
              ? 'bg-linear-to-br from-green-500 to-emerald-600 text-white ring-2 ring-green-400 ring-offset-2 shadow-lg scale-110'
              : 'bg-linear-to-br from-amber-400 to-orange-500 text-white ring-2 ring-orange-400 ring-offset-2 shadow-lg scale-110'
          } else if (completed) {
            cls += 'bg-linear-to-br from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-md'
          } else if (isPast) {
            cls += 'bg-red-50 text-red-400 border border-red-200'
          } else {
            cls += 'bg-gray-100 text-gray-400'
          }
          return (
            <div key={d} className={cls} title={completed ? 'Completed' : isPast ? 'Missed' : ''}>
              {d}
            </div>
          )
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-5 justify-center">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <span className="w-3 h-3 rounded bg-linear-to-br from-green-500 to-emerald-600 shadow-sm" /> Done
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <span className="w-3 h-3 rounded bg-red-50 border-2 border-red-200" /> Missed
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <span className="w-3 h-3 rounded bg-linear-to-br from-amber-400 to-orange-500 ring-2 ring-orange-400" /> Today
        </span>
      </div>
    </div>
  )
}

export default function Progress() {
  const { completions, currentStreak, longestStreak, consistencyRate, completedToday } = useStudyData()

  const today = new Date()
  const thisYear = today.getFullYear()
  const thisMonth = today.getMonth()
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

  const totalSessions = completions.length

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/30 to-indigo-50/40">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 pt-32 pb-20">

        {/* Header */}
        <div className="mb-10 animate-fadeSlideUp">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-100 to-indigo-100 border border-purple-300/60 text-purple-600 text-sm font-bold uppercase tracking-wider mb-5 shadow-sm">
            <FaChartBar className="text-base" /> Progress
          </span>
          <h1 className="font-display text-5xl font-extrabold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight mb-3">Your Study History</h1>
          <p className="text-gray-600 font-medium text-base mt-3 flex items-center gap-2">
            Track your consistency and celebrate every streak <FaTrophy className="text-amber-500 text-lg" />
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10 stagger-children">
          {[
            { label: 'Current Streak', value: `${currentStreak}`, icon: FaFire, gradient: 'bg-linear-to-br from-orange-400 via-orange-500 to-red-500' },
            { label: 'Longest Streak', value: `${longestStreak}`, icon: FaTrophy, gradient: 'bg-linear-to-br from-purple-500 via-purple-600 to-indigo-600' },
            { label: '7-Day Rate', value: `${consistencyRate}%`, icon: FaChartLine, gradient: 'bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-500' },
            { label: 'Total Sessions', value: `${totalSessions}`, icon: FaBook, gradient: 'bg-linear-to-br from-pink-400 via-rose-500 to-pink-600' },
          ].map((stat) => (
            <div key={stat.label} className={`relative rounded-2xl p-6 flex flex-col items-center gap-2 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group ${stat.gradient}`}>
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <stat.icon className="text-3xl opacity-90 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-4xl font-display font-extrabold relative z-10">{stat.value}</span>
              <span className="text-xs font-bold uppercase tracking-wider opacity-90 text-center relative z-10">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Today status */}
        <div className={`rounded-3xl px-6 py-5 mb-10 flex items-center gap-5 animate-fadeSlideUp shadow-xl hover:shadow-2xl transition-all duration-300 ${completedToday ? 'bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 text-white' : 'bg-linear-to-r from-amber-50 to-orange-50 border-2 border-orange-300/60'}`}>
          {completedToday ? <FaCheckCircle className="text-3xl text-white/95 shrink-0" /> : <FaHourglassHalf className="text-3xl text-orange-600 shrink-0" />}
          <div>
            <p className={`font-bold text-lg ${completedToday ? 'text-white' : 'text-gray-900'}`}>
              {completedToday ? 'Today\'s challenge completed!' : 'Today\'s challenge not yet done'}
            </p>
            <p className={`text-sm font-medium mt-1 ${completedToday ? 'text-white/95' : 'text-gray-700'}`}>
              {completedToday ? 'Great work — your streak is safe!' : 'Complete it before midnight to keep your streak.'}
            </p>
          </div>
        </div>

        {/* Calendars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <CalendarMonth year={lastMonthYear} month={lastMonth} completions={completions} />
          <CalendarMonth year={thisYear} month={thisMonth} completions={completions} />
        </div>

        {/* Behavioral insight card */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 animate-fadeSlideUp shadow-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="font-display font-extrabold text-gray-900 text-xl mb-5 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 text-white shadow-lg">
              <FaLightbulb className="text-base" />
            </span>
            Why Micro-Consistency Works
          </h3>
          <p className="text-[15px] font-medium text-gray-700 leading-relaxed flex items-start gap-3">
            <FaBullseye className="text-green-600 text-xl mt-0.5 shrink-0" />
            <span>Research in behavioral psychology shows that <strong className="text-green-600 font-bold">short, consistent daily engagement</strong> builds stronger
            long-term memory than irregular marathon study sessions. Sprintellect enforces minimum daily academic engagement
            through 15-minute sprints — turning study habits from intention into action.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
