import React, { useEffect, useState } from 'react'
import axios from 'axios'
import authSvg from '../assests/welcome.svg'
import { ToastContainer, toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { isAuth, authenticate } from '../helpers/auth'
import { Link, Redirect } from 'react-router-dom'

const Activate = ({ match }) => {
    const [formData, setFormData] = useState({
        name: '',
        token: '',
        show: true
    })

    useEffect(() => {
        let token = match.params.token
        let { name } = jwt.decode(token)

        if (token) setFormData({ ...formData, name, token })
    }, [])

    const { name, token, show } = formData
    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/activation`, {
            token
        }).then(res => {
            setFormData({ ...formData, show: false })
            toast.success(res.data.message)
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    }
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <div className='max-w-screen-lg sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 lg:h-2 xl:w-6/12 p-4 sm:p-8'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Welcome {name},
            </h1>

                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative '>
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>Activate your account</span>
                                </button>
                            </div>
                            <div className='my-12 border-b text-center mt-6'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign up again
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Link
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                    to='/register'
                                    target='_self'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6 -ml-2 text-indigo-500' />
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

export default Activate
