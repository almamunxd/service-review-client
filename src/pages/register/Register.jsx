import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext';
import DynamicTitle from '../shared/DynamicTitle';

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { createUser, signInWithGoogle } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = e.target.photoURL.value;

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }

        setErrorMessage('');
        setSuccess(false);

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL,
                });
            })
            .then(() => {
                toast.success('Registered successfully!');
                setSuccess(true);
                e.target.reset();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                toast.error(`Error: ${error.message}`);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Successfully logged in with Google!');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) => toast.error(`Error: ${error.message}`));
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <DynamicTitle title="Register" />
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-2xl font-bold">Register Now</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                                placeholder="Password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="Enter a photo URL"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="ml-4 mb-4">
                        Already Registered? Please <Link to="/login">Login</Link>
                    </p>
                    <p>
                        <button onClick={handleGoogleSignIn} className="btn btn-ghost">
                            Google
                        </button>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
