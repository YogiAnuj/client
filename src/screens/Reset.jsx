import React, { useEffect, useState } from 'react'
import authSvg from '../assests/reset.svg'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuth } from '../helpers/auth'

const Reset = ({ match, history }) => {
    const [formData, setFormData] = useState({
        password: '',
        cPassword: '',
        token: ''
    })

    const { password, cPassword, token } = formData

    useEffect(() => {
        let token = match.params.token
        if (token) {
            setFormData({
                ...formData,
                token
            })
        }
    }, [])

    const handleChange = text => e => {
        setFormData({
            ...formData,
            [text]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (password && cPassword && (password === cPassword)) {
            axios.post(`${process.env.REACT_APP_API_URL}/password/reset`, {
                newPassword: password,
                resetPasswordLink: token
            }).then(res => {
                setFormData({
                    ...formData,
                    password: '',
                    cPassword: ''
                })
                toast.success(res.data.message) ? history.push('/login') : history.push('/')
                
            }).catch(err => {
                //console.log(err.response);
                toast.error('Something is wrong try again');
            })
        } else {
            toast.error('Passwords don\'t matches');
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
                            Reset your password
                        </h1>

                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative '>
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='New Password'
                                    onChange={handleChange('password')}
                                    value={password}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='Confirm Password'
                                    onChange={handleChange('cPassword')}
                                    value={cPassword}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <span className='ml-3'>Submit</span>
                                </button>
                            </div>
                            <div className='my-12 border-b text-center mt-6'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign in
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Link
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                    to='/login'
                                    target='_self'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6 -ml-2' />
                                    <span className='ml-4'>Sign In</span>
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

export default Reset
