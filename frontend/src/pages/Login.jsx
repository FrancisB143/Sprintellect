import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const ok = login(email, password)
    if (ok) {
      navigate('/home')
    } else {
      setError('Invalid email or password. Try test@gmail.com / 123')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">

      {/* Soft blob backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="pastel-blob pastel-blob-1" />
        <div className="pastel-blob pastel-blob-2" />
        <div className="pastel-blob pastel-blob-3" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4 animate-fadeSlideUp">
        <div className="bg-white/70 backdrop-blur-xl border border-violet-100 rounded-3xl p-10 shadow-[0_24px_60px_rgba(139,92,246,0.12)]">

          {/* Brand */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-300 to-purple-400 shadow-lg shadow-violet-200 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            <h1 className="text-4xl font-black font-display bg-gradient-to-r from-violet-500 via-purple-500 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Sprintellect
            </h1>
            <p className="mt-2 text-sm text-slate-400 font-sans">
              15 minutes a day. Every day.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-500 text-xs font-sans text-center animate-fadeSlideUp">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Email
              </label>
              <div className={`transition-all duration-300 rounded-xl border-2 ${focused === 'email' ? 'border-violet-300 shadow-[0_0_0_4px_rgba(167,139,250,0.15)]' : 'border-violet-100'} bg-violet-50/50`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 outline-none rounded-xl font-sans"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Password
              </label>
              <div className={`transition-all duration-300 rounded-xl border-2 ${focused === 'password' ? 'border-violet-300 shadow-[0_0_0_4px_rgba(167,139,250,0.15)]' : 'border-violet-100'} bg-violet-50/50`}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 outline-none rounded-xl font-sans"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-slate-400 hover:text-violet-500 transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden rounded-xl py-3.5 font-semibold text-sm text-white bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Hint */}
          <div className="mt-7 p-4 rounded-2xl bg-violet-50 border border-violet-100">
            <p className="text-xs text-center text-slate-400 font-sans">
              Demo account: <span className="text-violet-500 font-semibold">test@gmail.com</span> / <span className="text-violet-500 font-semibold">123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
