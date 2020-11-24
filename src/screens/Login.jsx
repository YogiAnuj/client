import React, { useState } from 'react'
import authSvg from '../assests/login.svg'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuth } from '../helpers/auth'
import { GoogleLogin } from 'react-google-login'

const Login = ({ history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const handleChange = text => e => {
        setFormData({
            ...formData,
            [text]: e.target.value
        })
    }

    //send google token
    const sendGoogleToken = tokenId => {
        axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
            idToken: tokenId
        }).then(res => {
            informParent(res);
        }).catch(err => {
            toast.error('Google login error')
        })
    }

    // if success we need to authenticate user and rediect
    const informParent = resposne => {
        authenticate(resposne, () => {
            isAuth() && isAuth.role === 'admin' ? history.push('/admin') : history.push('/private')
        })
    }

    // get response from google
    const responseGoogle = response => {
        console.log(response);
        sendGoogleToken(response.tokenId);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (email && password) {
            axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                email, password
            }).then(res => {
                authenticate(res, () => {
                    setFormData({
                        ...formData,
                        email: '',
                        password: ''
                    })
                    console.log(res.data);
                });
                // if authenticate but not admin redirect to private
                // if admin redirect to admin
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
                toast.success(`Welcome back, ${res.data.user.name}.`);
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data.error);
            })
        } else {
            toast.error('Please submit complete details.')
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <div className='max-w-screen-lg sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 lg:h-2 xl:w-6/12 p-4 sm:p-8'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign In for Rentals
                        </h1>

                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative '>
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='email'
                                    placeholder='Email'
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='Password'
                                    onChange={handleChange('password')}
                                    value={password}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6 -ml-2' />
                                    <span className='ml-3'>Sign In</span>
                                </button>
                                <Link to='/users/password/forget'
                                    className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0 mt-4"
                                >
                                    Forget Password?
                                </Link>
                            </div>
                            <div className='my-12 border-b text-center mt-10'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign up
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <GoogleLogin
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                        bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                        ><div className=' p-2 rounded-full '>
                                                <i className='fab fa-google -ml-2 text-indigo-500' />
                                            </div>
                                            <span className='ml-4'>Sign In with Google</span></button>
                                    )}
                                >

                                </GoogleLogin>
                                <Link
                                    className='mt-3 w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                    to='/register'
                                    target='_self'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Sign Up</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${authSvg})` }}
                    ></div>
                </div>
            </div>
      ;
        </div>
    )
}

export default Login
