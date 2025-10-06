import React, { useEffect, useState } from 'react';
import { ImageIcon, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/AsyncThunk';
import { useToast } from '@/hooks/use-toast';
import { getId, setUserInfo } from '@/redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const navigate = useNavigate();

  const userId = useSelector(getId);

  useEffect(() => {
    if (userId) {
      navigate("/filter");
    }
  }, [userId]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email , password)
    dispatch(login({ email, password }))
      .unwrap().then((data) => {
        console.log(data);
        dispatch(setUserInfo(data.user));
        navigate("/filter");
        toast({ title : 'Login successful' , type : 'success'})
      })
      .catch((err) => {
        console.log(err);
        toast({ title : err , type : 'error'})
      }).finally(() => {
        setLoading(false);
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
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-sm text-slate-600">Sign in to continue to Image SAAS</p>
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
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-200">
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}