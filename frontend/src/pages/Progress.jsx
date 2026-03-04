import { useStudyData } from '../hooks/useStudyData'
import Navbar from '../components/Navbar'

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
    <div className="bg-white/70 backdrop-blur-sm border border-violet-100 rounded-2xl p-6 shadow-sm">
      <h3 className="font-black font-display text-slate-700 text-base mb-4">{monthName}</h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="text-center text-xs font-bold text-slate-300 uppercase">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`e-${i}`} />
          const { d, completed, isToday, isPast } = cell
          let cls = 'w-full aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 '
          if (isToday) {
            cls += completed
              ? 'bg-emerald-300 text-white ring-2 ring-emerald-400'
              : 'bg-violet-200 text-violet-700 ring-2 ring-violet-400'
          } else if (completed) {
            cls += 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          } else if (isPast) {
            cls += 'bg-rose-50 text-rose-300 hover:bg-rose-100'
          } else {
            cls += 'bg-slate-50 text-slate-300'
          }
          return (
            <div key={d} className={cls} title={completed ? 'Completed ✓' : isPast ? 'Missed' : ''}>
              {d}
            </div>
          )
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 justify-end">
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded-md bg-emerald-100" /> Done
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded-md bg-rose-50" /> Missed
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded-md bg-violet-200 ring-1 ring-violet-400" /> Today
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-12">

        {/* Header */}
        <div className="mb-8 animate-fadeSlideUp">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
            📊 Progress
          </span>
          <h1 className="text-3xl font-black font-display text-slate-700">Your Study History</h1>
          <p className="text-slate-400 text-sm font-sans mt-1">Track your consistency and celebrate every streak.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Current Streak', value: `${currentStreak}d`, icon: '🔥', color: 'bg-violet-100 border-violet-200' },
            { label: 'Longest Streak', value: `${longestStreak}d`, icon: '🏆', color: 'bg-pink-100 border-pink-200' },
            { label: '7-Day Rate', value: `${consistencyRate}%`, icon: '📈', color: 'bg-teal-100 border-teal-200' },
            { label: 'Total Sessions', value: `${totalSessions}`, icon: '📚', color: 'bg-amber-100 border-amber-200' },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl p-5 border flex flex-col items-center gap-1.5 animate-fadeSlideUp shadow-sm ${stat.color} bg-opacity-70`}>
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-2xl font-black font-display text-slate-700">{stat.value}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Today status */}
        <div className={`rounded-2xl px-6 py-4 mb-8 border flex items-center gap-4 animate-fadeSlideUp shadow-sm ${completedToday ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <span className="text-2xl">{completedToday ? '✅' : '⏳'}</span>
          <div>
            <p className={`font-bold text-sm ${completedToday ? 'text-emerald-700' : 'text-rose-500'}`}>
              {completedToday ? 'Today\'s challenge completed!' : 'Today\'s challenge not yet done'}
            </p>
            <p className="text-xs text-slate-400 font-sans">
              {completedToday ? 'Great work — your streak is safe.' : 'Complete it before midnight to keep your streak.'}
            </p>
          </div>
        </div>

        {/* Calendars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <CalendarMonth year={lastMonthYear} month={lastMonth} completions={completions} />
          <CalendarMonth year={thisYear} month={thisMonth} completions={completions} />
        </div>

        {/* Behavioral insight card */}
        <div className="bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-6 animate-fadeSlideUp shadow-sm">
          <h3 className="font-black font-display text-slate-700 text-lg mb-2">💡 Why Micro-Consistency Works</h3>
          <p className="text-sm text-slate-500 font-sans leading-relaxed">
            Research in behavioral psychology shows that <strong>short, consistent daily engagement</strong> builds stronger
            long-term memory than irregular marathon study sessions. Sprintellect enforces minimum daily academic engagement
            through 15-minute sprints — turning study habits from intention into action.
          </p>
        </div>
      </div>
    </div>
  )
}
