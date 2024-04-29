import React, { useState } from 'react';
import { MdMailOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from '../../store/reducers/auth';

const UserLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log('login', data.email, data.password);
        dispatch(userLogin(data)).then(action => {
            localStorage.setItem('accessToken', action.payload.token);
            navigate('/register');
        });
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="font-[sans-serif] text-[#333] mt-4 p-4 relative">
            <div className="max-w-md w-full mx-auto relative z-50">
                <div className="text-center mb-8">
                    {/* link home page here */}
                    <Link to='/' className="w-16 dark:text-[#007bff] font-bold text-3xl"> SurfMinds</Link>
                </div>
                <div className="border border-gray-300 bg-white rounded-md p-8">
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <h3 className="text-2xl font-extrabold text-center">Login</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm mb-2 block text-left">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="email"
                                        {...login("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Please enter a valid email',
                                            },
                                        })}
                                        placeholder="Enter email"
                                        className={`bg-white border border-gray-300 w-full text-sm px-5 py-2.5 rounded block text-left ${errors.email ? "outline-red-500" : "outline-blue-500"}`}
                                    />
                                    <MdMailOutline className="w-4 h-4 absolute right-4" />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1 block text-left">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block text-left">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...login("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters",
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
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1 block text-left">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                {/* link Forget password page here */}
                                <Link to='/' className="text-sm text-blue-600 hover:text-blue-500">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <div className="!mt-10">
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                Login
                            </button>
                        </div>
                        <p className="text-sm mt-6 text-center">
                            Don't have an account?{" "}
                            <Link to='/register' className="text-blue-600 font-semibold hover:underline ml-1">Register here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
