import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Correct import

const Navber = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    console.log('Navber User:', user);

    const handelSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('logged out done');
            })
            .catch((error) => console.log('error', error.message));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            {!user && (
                <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </>
            )}
            {user && (
                <>
                    <li><NavLink to="/myReviews">My Reviews</NavLink></li>
                    <li><NavLink to="/addService">Add Services</NavLink></li>
                    <li><NavLink to="/myServices">My Services</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">RateBoard</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="flex items-center">
                            <div
                                className="relative"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <img
                                    src={user.photoURL || '/default-avatar.png'}
                                    alt={user.displayName || 'User'}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />
                                {isHovered && (
                                    <div className="absolute bottom-0 left-0 bg-black text-white text-xs rounded-md px-2 py-1 mt-2">
                                        {user.displayName}
                                    </div>
                                )}
                            </div>
                            <a onClick={handelSignOut} className="btn ml-4">
                                Sign Out
                            </a>
                        </div>
                    ) : (
                        <Link to="/login" className="btn">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navber;
