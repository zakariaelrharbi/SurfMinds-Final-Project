import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';

const UserLogin = () => {
    const {Login, 
           handleSubmit,
           formState: {errors, isValid},
           watch,
           } = useForm({
            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            mode: "onChange",
    } );

    const submitHandler = () => {};

    const password = watch('password');
    const [showPassword, setShowPassword] = useState(false);
        const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
        };


  return (
    <>
         <div className="font-[sans-serif] text-[#333] mt-4 p-4 relative">
  <div className="max-w-md w-full mx-auto relative z-50">
    <div className="text-center mb-8">
        <a href="/" className="w-16 dark:text-[#007bff] font-bold text-3xl">SurfMinds</a>
    </div>
    <div className="border border-gray-300 bg-white rounded-md p-8">
      <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold text-center">Login</h3>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-sm mb-2 block text-left">Name</label>
            <div className="relative flex items-center ">
              <input
                name="name"
                type="text"
                {...register("name",{
                    minLength: {
                        value: 3,
                        message: "Name must be at least 3 character",
                    },
                    required:{
                        value: true,
                        message: "Name is required"
                    }
                })}
                placeholder="Enter name"
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded ${errors.name ? "outline-red-500" : "outline-blue-500"}`}
              />
            <FaRegUser className="w-4 h-4 absolute right-4"/>
            </div>
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.name?.message}</p>
              )}
          </div>
          <div>
            <label className="text-sm mb-2 block text-left">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                {...register("email", {
                   required:{
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                    }
                })}
                placeholder="Enter email"
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded  block text-left ${errors.email ? "outline-red-500" : "outline-blue-500"}`}
                />
            <MdMailOutline className="w-4 h-4 absolute right-4"/>
            </div>
            {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm mb-2 block text-left">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                 {...register("password",{
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 character",
                    },
                    required:{
                        value: true,
                        message: "Password is required"
                    },
                })}
                placeholder="Enter password"
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded block text-left ${errors.password ? "outline-red-500" : "outline-blue-500"}`}
              />
             {showPassword ? (
                <FaRegEyeSlash
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaRegEye
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.password?.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm mb-2 block text-left">Confirm Password</label>
            <div className="relative flex items-center">
              <input
                name=" confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register("confirmPassword", {
                     required:{
                        value: true,
                        message: "Confirm Password is required"
                    },
                    validate: (value) => {
                        if(value !== password){
                            return "Password does not match";
                        }
                    }
                }
                )}
                placeholder="Confirm password"
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded ${errors.confirmPassword ? "outline-red-500" : "outline-blue-500"}`}
              />
            {showConfirmPassword ? (
                < FaRegEyeSlash
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <FaRegEye
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </div>
            {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.confirmPassword?.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm">
              I accept the{" "}
              
              <Link to='/Terms-and-conditions' className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions
              </Link>
            </label>
          </div>
        </div>
        <div className="!mt-10">
          <button
            type="submit"
            disabled = {!isValid}
            className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Create an account
          </button>
        </div>
        <p className="text-sm mt-6 text-center">
          Already have an account?{" "}
          
          <Link to='/login' className="text-blue-600 font-semibold hover:underline ml-1">
            Login here
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>

    </>
  )
}

export default UserLogin
