import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: handle login logic
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a1a]">

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4 animate-fadeSlideUp">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">

          {/* Logo / Brand */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight font-display bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              Sprintellect
            </h1>
            <p className="mt-2 text-sm text-white/40 font-sans tracking-wide">
              Intelligent sprint management
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 transition-colors group-focus-within:text-violet-400">
                Email
              </label>
              <div className={`relative transition-all duration-300 rounded-xl border ${focused === 'email' ? 'border-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.15)]' : 'border-white/10'} bg-white/5`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none rounded-xl font-sans"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 transition-colors group-focus-within:text-violet-400">
                Password
              </label>
              <div className={`relative transition-all duration-300 rounded-xl border ${focused === 'password' ? 'border-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.15)]' : 'border-white/10'} bg-white/5`}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none rounded-xl font-sans"
                  required
                />
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a href="#" className="text-xs text-white/30 hover:text-violet-400 transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-xl py-3.5 font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 tracking-wide">Sign in</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/20 font-sans">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-xs text-white/30 font-sans">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200">
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
