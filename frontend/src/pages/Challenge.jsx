import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudyData } from '../hooks/useStudyData'
import Navbar from '../components/Navbar'

const TOTAL = 15 * 60 // 900 seconds

const SAMPLE_QUESTIONS = [
  'What is one key concept you learned in class today?',
  'Explain a term or definition in your own words.',
  'What question do you still have about today\'s topic?',
  'How does today\'s lesson connect to something you already know?',
  'Write one example that illustrates today\'s main idea.',
]

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Challenge() {
  const { completedToday, markToday } = useStudyData()
  const navigate = useNavigate()

  const [phase, setPhase] = useState('intro') // intro | running | paused | done | submitted
  const [timeLeft, setTimeLeft] = useState(TOTAL)
  const [tabWarning, setTabWarning] = useState(false)
  const [answers, setAnswers] = useState(['', '', '', '', ''])
  const [useCustom, setUseCustom] = useState(false)
  const [questions, setQuestions] = useState(SAMPLE_QUESTIONS)
  const intervalRef = useRef(null)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((TOTAL - timeLeft) / TOTAL) * 100

  const startTimer = useCallback(() => {
    setPhase('running')
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setPhase('done')
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [])

  // Tab visibility detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && phase === 'running') {
        setTabWarning(true)
        setTimeout(() => setTabWarning(false), 4000)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [phase])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleSubmit = () => {
    markToday()
    setPhase('submitted')
  }

  const allAnswered = answers.every((a) => a.trim().length >= 3)

  if (completedToday && phase !== 'submitted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 pt-32 text-center animate-fadeSlideUp">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-black font-display text-slate-700 mb-3">Already done today!</h2>
          <p className="text-slate-400 font-sans text-sm mb-8">You completed today's challenge. Rest up and come back tomorrow.</p>
          <button onClick={() => navigate('/home')} className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-400 to-purple-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-200">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'submitted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 pt-32 text-center animate-fadeSlideUp">
          <div className="text-6xl mb-4 animate-bounce-slow">✅</div>
          <h2 className="text-3xl font-black font-display text-slate-700 mb-3">Challenge Complete!</h2>
          <p className="text-slate-400 font-sans text-sm mb-2">You've logged today's study session.</p>
          <p className="text-emerald-500 font-bold font-sans text-sm mb-8">Your streak is growing — keep it up! 🔥</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/progress')} className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-400 to-teal-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-200">
              View Progress
            </button>
            <button onClick={() => navigate('/home')} className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:scale-105 transition-all duration-300">
              Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <Navbar />

      {/* Tab warning */}
      {tabWarning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-600 text-sm font-bold shadow-lg animate-fadeSlideUp">
          ⚠️ Stay on this tab! Your timer is running.
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 pt-28 pb-12">

        {/* Header */}
        <div className="text-center mb-8 animate-fadeSlideUp">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
            ⚡ Daily Challenge
          </span>
          <h1 className="text-3xl font-black font-display text-slate-700">15-Minute Study Sprint</h1>
          <p className="text-slate-400 text-sm font-sans mt-2">Complete the timer, then answer 5 questions from your notes.</p>
        </div>

        {/* Timer Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-violet-100 rounded-3xl p-8 shadow-sm mb-6 animate-fadeSlideUp">
          <div className="text-center mb-6">
            {/* Circular progress */}
            <div className="relative w-44 h-44 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="64" fill="none" stroke="#ede9fe" strokeWidth="8" />
                <circle
                  cx="72" cy="72" r="64"
                  fill="none"
                  stroke={phase === 'done' ? '#6ee7b7' : '#a78bfa'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - progress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-display text-slate-700 tabular-nums">
                  {pad(minutes)}:{pad(seconds)}
                </span>
                <span className="text-xs text-slate-400 font-sans mt-1">
                  {phase === 'done' ? 'Complete!' : phase === 'running' ? 'Remaining' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Timer controls */}
            {phase === 'intro' && (
              <button
                onClick={startTimer}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 shadow-lg shadow-violet-200 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Start Timer
              </button>
            )}
            {phase === 'running' && (
              <div className="flex items-center justify-center gap-3">
                <span className="flex items-center gap-2 text-sm text-violet-500 font-semibold font-sans">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  Timer is running...
                </span>
              </div>
            )}
            {phase === 'done' && (
              <span className="text-emerald-500 font-bold font-sans text-sm">
                🎉 Timer complete! Now answer the questions below.
              </span>
            )}
          </div>
        </div>

        {/* Questions Card */}
        <div className={`bg-white/70 backdrop-blur-sm border border-violet-100 rounded-3xl p-8 shadow-sm mb-6 transition-all duration-500 ${phase === 'intro' ? 'opacity-50 pointer-events-none' : 'opacity-100'} animate-fadeSlideUp`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black font-display text-slate-700 text-lg">5 Study Questions</h2>
            <button
              onClick={() => setUseCustom(!useCustom)}
              className="text-xs font-semibold text-violet-500 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {useCustom ? 'Use samples' : 'Write my own'}
            </button>
          </div>

          <div className="space-y-5">
            {answers.map((ans, i) => (
              <div key={i}>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {useCustom ? (
                    <input
                      className="w-full text-xs font-bold text-violet-500 bg-transparent outline-none border-b border-violet-200 pb-1 font-sans"
                      placeholder={`Write your question ${i + 1}...`}
                      value={questions[i] !== SAMPLE_QUESTIONS[i] ? questions[i] : ''}
                      onChange={(e) => {
                        const q = [...questions]
                        q[i] = e.target.value || SAMPLE_QUESTIONS[i]
                        setQuestions(q)
                      }}
                    />
                  ) : (
                    <span className="text-violet-500">{`Q${i + 1}: ${SAMPLE_QUESTIONS[i]}`}</span>
                  )}
                </label>
                <textarea
                  rows={2}
                  value={ans}
                  onChange={(e) => {
                    const a = [...answers]
                    a[i] = e.target.value
                    setAnswers(a)
                  }}
                  placeholder="Type your answer here..."
                  className="w-full rounded-xl border-2 border-violet-100 bg-violet-50/50 px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-violet-300 focus:shadow-[0_0_0_4px_rgba(167,139,250,0.15)] transition-all duration-200 resize-none font-sans"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        {phase === 'done' && (
          <div className="text-center animate-fadeSlideUp">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              Submit & Log Completion ✓
            </button>
            {!allAnswered && (
              <p className="mt-3 text-xs text-slate-400 font-sans">Answer all 5 questions to submit.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
