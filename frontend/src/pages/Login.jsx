import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaTimesCircle } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
      setError('Oops! Those credentials don\'t match. Try test@gmail.com / 123')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-blue-50 to-cyan-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto">
       

        {/* User Icon */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-studying-online-3d-icon-png-download-4089397.png" 
            alt="Student"
            className="w-56 h-56 object-contain drop-shadow-lg"
          />
        </div>
        {/* App Title */}
        <div className="text-center mb-6">
          <h1 className="font-display text-5xl font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">Sprint</span><span className="bg-linear-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent">ellect</span>
          </h1>
          <p className="font-display text-sm text-[#a2a9b2] mt-2 font-medium">Your learning companion</p>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-300 animate-shake">
            <p className="text-sm font-medium text-red-700 flex items-center gap-2">
              <FaTimesCircle className="shrink-0" />
              {error}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username/Email Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
              <FaUser className="text-xl" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-3 border-blue-400 bg-white/80 placeholder-blue-400/60 focus:border-blue-500 focus:bg-white outline-none transition-all text-base font-medium text-gray-700"
              placeholder="Username"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
              <FaLock className="text-xl" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-xl border-3 border-blue-400 bg-white/80 placeholder-blue-400/60 focus:border-blue-500 focus:bg-white outline-none transition-all text-base font-medium text-gray-700"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-blue-500 text-blue-600 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              />
              <span className="font-display text-sm font-semibold text-[#a2a9b2]">Remember me</span>
            </label>
            <a href="#!" className="font-display text-sm font-semibold text-[#a2a9b2] hover:text-gray-700 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="font-display w-full py-4 rounded-xl text-xl font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-[0.98] uppercase tracking-wider"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 rounded-xl bg-white/60 border-2 border-blue-200 backdrop-blur-sm">
          <p className="font-display text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide text-center">Demo Credentials</p>
          <div className="text-center space-y-1">
            <p className="font-display text-sm font-semibold text-gray-700">test@gmail.com</p>
            <p className="font-display text-sm font-semibold text-gray-700">123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
