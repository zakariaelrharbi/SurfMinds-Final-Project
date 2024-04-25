import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { MdMailOutline, MdRemoveRedEye } from 'react-icons/md';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserLogin = () => {
  const [LoginSuccess, setLoginSuccess] = useState(false); // State to track registration success

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3001/api/auth/login', values);
        console.log('Registration Successful');
        setRegistrationSuccess(true); // Set registration success to true
      } catch (error) {
        console.error('Registration Failed:', error);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-sans text-[#333] bg-gray-50 flex items-center h-screen p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white grid md:grid-cols-2 lg:gap-24 gap-16 w-full sm:p-8 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded overflow-hidden">
          <div className="max-md:order-1 space-y-6">
            <div className="md:mb-16 mb-8">
              <h3 className="text-2xl font-extrabold text-left">Instant Access</h3>
            </div>
            <div className="space-y-6">
              {/* Facebook, Google, Apple buttons */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 hover:rounded-full"
              >
                <FaFacebook className="inline shrink-0 mr-4 w-6 h-6" />Continue with Facebook
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-center rounded text-[#333] text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200 hover:rounded-full"
              >
                <FcGoogle className="inline shrink-0 mr-4 w-6 h-6 " />
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333] hover:rounded-full"
              >
                <FaApple className="inline shrink-0 mr-4 w-6 h-6" />
                Continue with Apple
              </button>
            </div>
          </div>
          <form className="w-full" onSubmit={(e) => { handleSubmit(e); formik.setSubmitting(true); formik.setTouched({}); formik.setErrors({}); formik.setSubmitCount(1); }}>
            <div className="mb-8">
              <h3 className="text-2xl font-extrabold text-left">Login</h3>
            </div>
            <div className="space-y-2">
              {/* Username input */}
             
              {/* Email input */}
              <div>
                <label className="text-sm mb-2 block text-left">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required=""
                    className="bg-white border border-gray-300 w-full text-sm pl-4 pr-10 py-2.5 rounded outline-blue-500"
                    placeholder="example@email.com"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <MdMailOutline className="w-4 h-4 absolute right-4" />
                </div>
                {errors.email && <small className="text-red-500 text-xs block text-left mt-1">{errors.email}</small>}
              </div>
              {/* Password input */}
              <div>
                <label className="text-sm mb-2 block text-left">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required=""
                    className="bg-white border border-gray-300 w-full text-sm pl-4 pr-10 py-2.5 rounded outline-blue-500"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <MdRemoveRedEye
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {errors.password && <small className="text-red-500 text-xs block text-left mt-1">{errors.password}</small>}
              </div>

              {/* Terms and Conditions checkbox */}
              <div class="flex items-center justify-between gap-4">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a href="jajvascript:void(0);" class="text-sm text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
            </div>
            </div>
            {/* Submit button */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="w-full py-3 px-4 text-sm font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none hover:rounded-full"
              >
                Login
              </button>
            </div>

            {/* Success message */}
            {LoginSuccess && (
              <div className="mt-4 text-green-600 text-sm">Login successfully!</div>
            )}

            <p className="text-sm mt-6 text-center">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
