import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/redux/AsyncThunk';

export default function SignupPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();

        if (password !== confirmPassword) {
            toast({ title: 'Error', description: 'Passwords do not match', status: 'error' });
            return;
        }
        if (password.length < 6 || password.length > 12) {
            toast({ title: 'Error', description: 'Password must be between 6 and 12 characters', status: 'error' });
            return;
          }


      dispatch(signup({  email, password }))
        .unwrap()
        .then(() => {
          toast({ title: 'Signup successful', type: 'success' });
          navigate('/login');

        })
        .catch((err) => {
          toast({ title: 'Error', description: err, status: 'error' });
        });
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-slate-100">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <ImageIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Get Started</h2>
            <p className="mt-2 text-sm text-slate-600">
              Create your account and start editing images
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                  <span className="text-xs font-normal text-slate-500 ml-1">(6-12 characters)</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-200">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}