import React, { useState } from 'react';
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../store/reducers/auth';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            isAdmin: "false"
        },
        mode: "onChange",
    });
    const [termsAccepted, setTermsAccepted] = useState(false);

    const onSubmit = (data) => {
        console.log('register', data.username, data.email, data.password);
        dispatch(userRegister(data)).then(action => {
          navigate('/login');
        });
    }

    const Password = watch('password');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

  return (
    <>
      <div className="font-[sans-serif] text-[#333] p-1 relative">
  <div className="max-w-md w-full mx-auto relative z-50">
            <div className="text-center mb-4">
                {/* link home page here */}
                <Link to='/' className="w-16 dark:text-[#007bff] font-bold text-3xl"> SurfMinds</Link>
            </div>
    <div className="border border-gray-300 bg-white rounded-md p-6">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <h3 className="text-2xl font-extrabold text-center">Register</h3>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-sm mb-2 block text-left">username</label>
            <div className="relative flex items-center ">
              <input
                name="username"
                type="text"
                {...register("username",{
                    minLength: {
                        value: 3,
                        message: "username must be at least 3 character",
                    },
                    required:{
                        value: true,
                        message: "username is required"
                    }
                })}
                placeholder="Enter username"
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded ${errors.username ? "outline-red-500" : "outline-blue-500"}`}
              />
            <FaRegUser className="w-4 h-4 absolute right-4"/>
            </div>
              {errors.username?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.username?.message}</p>
              )}
          </div>
          <div>
            <label className="text-sm mb-2 block text-left">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
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
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded  ${errors.email ? "outline-red-500" : "outline-blue-500"}`}
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
                className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded ${errors.password ? "outline-red-500" : "outline-blue-500"}`}
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
                        if(value !== Password){
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
              onChange={(e) => setTermsAccepted(e.target.checked)}
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
            disabled = {!isValid || !termsAccepted}
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

export default Register
