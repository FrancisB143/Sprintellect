import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudyData } from '../hooks/useStudyData'
import Navbar from '../components/Navbar'
import { FaCheckCircle, FaBolt, FaFire, FaExclamationTriangle } from 'react-icons/fa'

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
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50/30 to-emerald-50/40">
        <Navbar />
        <div className="max-w-lg mx-auto px-8 pt-32 text-center animate-fadeSlideUp">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6">
            <div className="absolute inset-0 bg-linear-to-br from-green-400 to-emerald-600 rounded-3xl blur-xl opacity-40"></div>
            <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-green-400 to-emerald-600 shadow-2xl">
              <FaCheckCircle className="text-6xl text-white" />
            </div>
          </div>
          <h2 className="font-display text-5xl font-extrabold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">Already done today!</h2>
          <p className="text-gray-600 font-medium text-base mb-10">You completed today's challenge. Rest up and come back tomorrow!</p>
          <button onClick={() => navigate('/home')} className="px-8 py-4 rounded-2xl font-bold text-base text-white bg-linear-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300 uppercase tracking-wide">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'submitted') {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-500 via-green-500 to-teal-500">
        <Navbar />
        <div className="max-w-lg mx-auto px-8 pt-32 text-center animate-fadeSlideUp">
          <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-3xl mb-8">
            <div className="absolute inset-0 bg-white/30 rounded-3xl blur-2xl"></div>
            <div className="relative flex items-center justify-center w-28 h-28 rounded-3xl bg-white/25 backdrop-blur-xl border border-white/40 shadow-2xl">
              <FaCheckCircle className="text-7xl text-white" />
            </div>
          </div>
          <h2 className="font-display text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Challenge Complete!</h2>
          <p className="text-white/95 font-medium text-base mb-3">You've logged today's study session.</p>
          <p className="text-amber-200 font-bold text-lg mb-12 flex items-center justify-center gap-2.5">
            Your streak is growing — keep it up! <FaFire className="text-2xl" />
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/progress')} className="px-8 py-4 rounded-2xl font-bold text-base text-green-600 bg-white hover:bg-gray-50 shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300 uppercase tracking-wide">
              View Progress
            </button>
            <button onClick={() => navigate('/home')} className="px-8 py-4 rounded-2xl font-bold text-base text-white bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 uppercase tracking-wide">
              Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/30 to-indigo-50/40">
      <Navbar />

      {/* Tab warning */}
      {tabWarning && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl bg-linear-to-br from-red-500 to-red-600 text-white text-base font-bold shadow-2xl animate-fadeSlideUp flex items-center gap-3 border border-red-400/50">
          <FaExclamationTriangle className="text-xl" /> Stay on this tab! Your timer is running.
        </div>
      )}

      <div className="max-w-3xl mx-auto px-8 pt-32 pb-20">

        {/* Header */}
        <div className="text-center mb-10 animate-fadeSlideUp">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-orange-100 to-amber-100 border border-orange-300/60 text-orange-600 text-sm font-bold uppercase tracking-wider mb-5 shadow-sm">
            <FaBolt className="text-base" /> Daily Challenge
          </span>
          <h1 className="font-display text-5xl font-extrabold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight mb-3">15-Minute Study Sprint</h1>
          <p className="text-gray-600 font-medium text-base mt-3">Complete the timer, then answer 5 questions from your notes.</p>
        </div>

        {/* Timer Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-10 shadow-2xl mb-8 animate-fadeSlideUp hover:shadow-3xl transition-shadow duration-300">
          <div className="text-center">
            {/* Circular progress */}
            <div className="relative w-52 h-52 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 208 208">
                <circle cx="104" cy="104" r="92" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle
                  cx="104" cy="104" r="92"
                  fill="none"
                  stroke={phase === 'done' ? '#10b981' : 'url(#gradient)'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 92}`}
                  strokeDashoffset={`${2 * Math.PI * 92 * (1 - progress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8b5cf6' }} />
                    <stop offset="100%" style={{ stopColor: '#6366f1' }} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-display font-extrabold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tabular-nums">
                  {pad(minutes)}:{pad(seconds)}
                </span>
                <span className="text-sm text-gray-500 font-semibold uppercase mt-2 tracking-wider">
                  {phase === 'done' ? 'Complete!' : phase === 'running' ? 'Remaining' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Timer controls */}
            {phase === 'intro' && (
              <button
                onClick={startTimer}
                className="px-10 py-4 rounded-2xl font-bold text-base text-white bg-linear-to-br from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-100 transition-all duration-300 uppercase tracking-wider"
              >
                Start Timer
              </button>
            )}
            {phase === 'running' && (
              <div className="flex items-center justify-center gap-3 text-base text-purple-600 font-bold">
                <span className="w-3 h-3 rounded-full bg-purple-600 animate-pulse shadow-lg" />
                Timer is running...
              </div>
            )}
            {phase === 'done' && (
              <span className="text-green-600 font-bold text-base flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-50 border border-green-200">
                <FaCheckCircle className="text-lg" /> Timer complete! Now answer the questions below.
              </span>
            )}
          </div>
        </div>

        {/* Questions Card */}
        <div className={`bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 sm:p-10 shadow-2xl mb-8 transition-all duration-500 ${phase === 'intro' ? 'opacity-40 pointer-events-none' : 'opacity-100'} animate-fadeSlideUp`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-extrabold text-gray-900 text-2xl">5 Study Questions</h2>
            <button
              onClick={() => setUseCustom(!useCustom)}
              className="text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl transition-all duration-300 border border-orange-200/60 hover:border-orange-300 shadow-sm hover:shadow-md"
            >
              {useCustom ? 'Use samples' : 'Write my own'}
            </button>
          </div>

          <div className="space-y-6">
            {answers.map((ans, i) => (
              <div key={i}>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                  {useCustom ? (
                    <input
                      className="w-full text-sm font-bold text-orange-600 bg-transparent outline-none border-b-2 border-gray-300 pb-2 focus:border-orange-500 transition-colors"
                      placeholder={`Write your question ${i + 1}...`}
                      value={questions[i] !== SAMPLE_QUESTIONS[i] ? questions[i] : ''}
                      onChange={(e) => {
                        const q = [...questions]
                        q[i] = e.target.value || SAMPLE_QUESTIONS[i]
                        setQuestions(q)
                      }}
                    />
                  ) : (
                    <span className="text-gray-800 normal-case text-base font-medium">{`Q${i + 1}. ${SAMPLE_QUESTIONS[i]}`}</span>
                  )}
                </label>
                <textarea
                  rows={3}
                  value={ans}
                  onChange={(e) => {
                    const a = [...answers]
                    a[i] = e.target.value
                    setAnswers(a)
                  }}
                  placeholder="Type your answer here..."
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 py-3.5 text-[15px] text-gray-900 font-medium placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:bg-white transition-all duration-300 resize-none shadow-sm"
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
              className="px-10 py-4 rounded-2xl font-bold text-base text-white bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wider inline-flex items-center gap-2.5"
            >
              Submit & Log Completion <FaCheckCircle className="text-lg" />
            </button>
            {!allAnswered && (
              <p className="mt-4 text-sm text-gray-600 font-semibold">Answer all 5 questions to submit.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
