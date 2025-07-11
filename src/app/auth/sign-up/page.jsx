'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleClick = (action) => {
    if (action === 'login') {
      router.push('/auth/login');
    }
    if (action === 'home') {
      router.push('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account.');
      } else {
        router.push('/auth/login');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 md:-mt-10">
      <div className="animate-fade-in w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">
            Create Account
          </h2>
          <p className="font-inter mt-2 text-gray-400">
            Join the Alphalete community
          </p>
        </div>

        {/* Error */}
        {error && <p className="text-center text-sm text-red-400">{error}</p>}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="font-inter mb-2 block text-sm font-medium text-gray-300"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="font-inter w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
                  placeholder="First name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="font-inter mb-2 block text-sm font-medium text-gray-300"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="font-inter w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="font-inter mb-2 block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="font-inter w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="font-inter mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="font-inter w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="font-inter mb-2 block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="font-inter w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 cursor-pointer rounded border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-white"
            />
            <span className="font-inter ml-2 text-sm text-gray-300">
              I agree to the{' '}
              <button
                type="button"
                className="cursor-pointer text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                className="cursor-pointer text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                Privacy Policy
              </button>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="font-poppins w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="font-inter text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => handleClick('login')}
                type="button"
                className="cursor-pointer font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => handleClick('home')}
            type="button"
            className="font-inter cursor-pointer text-gray-500 transition-colors duration-200 hover:text-gray-400"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
