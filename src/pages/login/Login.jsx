import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';  
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicTitle from '../shared/DynamicTitle';

const Login = () => {
    const navigate = useNavigate();
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const emailRef = useRef();

    const handelLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                toast.success('Successfully logged in!');
                e.target.reset();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) => {
                toast.error(`Email or password mismatched: ${error.message}`);
            });
    };

    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Successfully logged in with Google!');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) =>
                toast.error(`Google sign-in failed: ${error.message}`)
            );
    };

    const handelForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.error('Please enter a valid email.');
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success('Reset email sent.');
                })
                .catch((error) => {
                    toast.error(`Failed to send reset email: ${error.message}`);
                });
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <DynamicTitle title="Login" />
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-2xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label onClick={handelForgetPassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className="ml-4 mb-4">
                        New at this website? Please <Link to="/register">Register</Link>
                    </p>

                    <p>
                        <button onClick={handelGoogleSignIn} className="btn btn-ghost">
                            Google
                        </button>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
