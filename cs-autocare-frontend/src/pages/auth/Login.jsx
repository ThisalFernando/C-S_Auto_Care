import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { csAutoLogo } from '../../assets/images'
import Spinner from '../../components/Spinner'
import { login, reset } from '../../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
            console.log(message)
        }
        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {

    }
    return (
        // user login form
        <section className="relative flex flex-col items-center justify-center h-[90vh]">
            <h1 className="text-4xl font-bold text-primary mt-20">Login</h1>
            <div className="flex flex-row w-full gap-40 justify-center items-center mt-24">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src={csAutoLogo}
                        alt="logo"
                        className="w-52 h-52"
                    />
                    <h1 className="text-2xl font-bold text-primary">C&S Auto Care</h1>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="******************"
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
                            disabled={isLoading} // Disable the button while loading
                        >
                            {isLoading ? (
                                // Display spinner and "Loading..." text (or just the spinner)
                                <div className="flex items-center">
                                    <Spinner /> {/* Assuming you have a Spinner component */}
                                    <span className="ml-2">Loading...</span> {/* Optional text */}
                                </div>
                            ) : (
                                'Sign In' // Display the normal button text when not loading
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {/* do you havent account - register */}
            <div className="flex flex-row justify-center items-center mt-4">
                <p className="text-gray-700">Don't have an account?</p>
                <button
                    onClick={() => navigate('/register')}
                    className="text-primary font-bold ml-2"
                >
                    Register
                </button>
            </div>
        </section>
    )
}


export default Login