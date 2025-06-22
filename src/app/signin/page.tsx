// app/signup/page.tsx
'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser } from '@/store/userSlice';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
    .min(6, 'Password too short')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
        'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required')
});

export default function SigninPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError('');
            try {
              const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
              });
              
              const data = await res.json();

              if (!res.ok) {
                toast.error(data.error || 'Signup failed');
              } else {
                toast.success(data.message || 'Signup successful');
                dispatch(setUser(data.user));
                router.push('/');
              }
            } catch (err) {
              toast.error('Something went wrong');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
              <p>Don't have an account ? <Link className='text-blue-500' href='/signup'>Sign up</Link></p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
