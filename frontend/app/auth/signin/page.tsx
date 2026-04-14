"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="https://public.readdy.ai/ai/img_res/a0c14596-4612-41a7-bcf3-8ba14244b461.png"
            alt="MEDCUBE"
            className="h-10 w-auto"
          />
          <span className="font-outfit font-bold text-brand-navy text-xl tracking-wide">
            MEDCUBE
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-brand-navy mb-1">Welcome back</h1>
            <p className="text-sm text-brand-muted">Sign in to your MEDCUBE account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1.5">
                Email address
              </label>
              <div className="relative">
                <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-lg" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-border rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-cyan transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1.5">
                Password
              </label>
              <div className="relative">
                <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-brand-surface border border-brand-border rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-cyan transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy transition-colors"
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-brand-border text-brand-cyan focus:ring-brand-cyan"
                />
                <span className="text-sm text-brand-body">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-brand-cyan hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-brand-cyan text-white font-medium rounded-lg hover:bg-brand-cyan-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-xs text-brand-muted uppercase tracking-wide">Or continue with</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-brand-border rounded-lg hover:bg-brand-surface transition-colors">
              <i className="ri-google-fill text-lg text-red-500" />
              <span className="text-sm font-medium text-brand-body">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-brand-border rounded-lg hover:bg-brand-surface transition-colors">
              <i className="ri-microsoft-fill text-lg text-blue-600" />
              <span className="text-sm font-medium text-brand-body">Microsoft</span>
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center mt-6 text-sm text-brand-body">
          Don't have an account?{' '}
          <Link href="/auth/sign-up" className="text-brand-cyan font-medium hover:underline">
            Create account
          </Link>
        </p>

        {/* Back to home */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-4 text-sm text-brand-muted hover:text-brand-navy transition-colors"
        >
          <i className="ri-arrow-left-line" />
          Back to home
        </Link>
      </div>
    </div>
  );
}