import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DynamicTitle from "./shared/DynamicTitle";

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {

        fetch("https://service-review-server-seven.vercel.app/services?limit=6")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setServices(data.data);
                }
            })
            .catch((error) => console.error("Error fetching services:", error));
    }, []);

    return (
        <div>
            <DynamicTitle title="Home" />
            {/* Banner Section */}
            <div className="carousel w-full">
                // ...existing code...
                <div id="slide1" className="carousel-item relative w-full mx-auto text-center">
                    <img className="w-full h-[400px] object-cover"
                        src="https://i.ibb.co.com/7k54tvJ/DALL-E-2024-12-31-03-24-49-A-vibrant-and-professional-website-banner-carousel-image-without-any-text.webp"
                        alt="Business services "
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
                        <h2 className="text-4xl font-bold text-center bg-slate-100 rounded-xl p-2">Discover Premium Services</h2>
                        <p className="text-xl mt-2 bg-slate-100 rounded-xl p-2">Find the best services for your needs.</p>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/tXqxj21/DALL-E-2024-12-31-03-27-12-A-vibrant-and-professional-website-banner-carousel-image-without-any-text.webp"
                        className="w-full h-[400px] object-cover"
                        alt="Technology services"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
                        <h2 className="text-4xl font-bold bg-slate-100 rounded-xl p-2">Innovative Solutions</h2>
                        <p className="text-xl mt-2 bg-slate-100 rounded-xl p-2">Explore cutting-edge services today.</p>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/QfnVvdp/DALL-E-2024-12-31-03-59-46-A-highly-professional-and-visually-captivating-website-banner-carousel-im.webp"
                        className="w-full h-[400px] object-cover"
                        alt="General services"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
                        <h2 className="text-4xl font-bold bg-slate-100 rounded-xl p-2">Your Trusted Platform</h2>
                        <p className="text-xl mt-2 bg-slate-100 rounded-xl p-2">Share and find trustworthy reviews.</p>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
                // ...existing code...
            </div>

            {/* Featured Services Section */}
            <div className="px-6 py-10">
                <h2 className="text-3xl font-bold mb-6">Featured Services</h2>
                <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <motion.div
                            key={service._id}
                            className="card shadow-lg border bg-violet-300 text-black"

                        >
                            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                            <div className="card-body ">
                                <h3 className="card-title text-lg font-semibold">{service.title}</h3>
                                <p className=" ">{service.description.slice(0, 100)}...</p>
                                <p className="font-bold">Price: ${service.price.toFixed(2)}</p>
                                <Link to={`/services/${service._id}`} className="btn btn-primary mt-4">
                                    See Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-sky-300 px-6 py-10 text-black">
                <h2 className="text-3xl font-bold mb-6">Meet Our Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://media.trustradius.com/vendor-logos/sx/VC/KFDX7ENK58Q3-180x180.JPEG"
                            alt="Partner 1"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-center mt-2 font-semibold">CyberDuo</p>
                        <p className="text-sm text-center text-gray-600">Leading cybersecurity provider.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/BCG_Corporate_Logo.svg/800px-BCG_Corporate_Logo.svg.png"
                            alt="Partner 2"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-center mt-2 font-semibold">Boston Consulting Group</p>
                        <p className="text-sm text-center text-gray-600">Top business consultancy firm.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Jw1FC1nnELheCk4l5h-1RfzcaaSdEqak2w&s"
                            alt="Partner 2"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-center mt-2 font-semibold">Cisco</p>
                        <p className="text-sm text-center text-gray-600">Network Operations and Support</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/023/986/480/small_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
                            alt="Partner 2"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-center mt-2 font-semibold">YouTube</p>
                        <p className="text-sm text-center text-gray-600">Video review shareing partner</p>
                    </div>
                </div>
            </div>

            {/* Extra Section 1: User Testimonials */}
            <div className="bg-teal-200 px-6 py-10 text-black">
                <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
                <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-indigo-500 shadow-lg rounded-md">
                        <p className="  italic">"This platform is amazing. It has helped me find the best services for my needs!"</p>
                        <p className="font-bold text-right mt-4">- Jane Doe</p>
                    </div>
                    <div className="p-4 bg-indigo-500 shadow-lg rounded-md">
                        <p className="  italic">"The reviews are genuine and trustworthy. I highly recommend ServiceReview."</p>
                        <p className="font-bold text-right mt-4">- John Smith</p>
                    </div>
                    <div className="p-4 bg-indigo-500 shadow-lg rounded-md">
                        <p className="  italic">"The platform is user-friendly, and I found the best services here. Highly satisfied!"</p>
                        <p className="font-bold text-right mt-4">- Sarah Johnson
                        </p>
                    </div>
                </div>
            </div>

            {/* Extra Section 2: Why Choose Us */}
            <div className="px-6 py-10">
                <h2 className="text-3xl font-bold mb-6 text-green-300">Why Choose Us</h2>
                <div className=" text-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-green-400 shadow-lg rounded-md">
                        <h3 className="font-bold text-lg">Trustworthy Reviews</h3>
                        <p className="text-black mt-2">Our reviews are verified and genuine, making it easier for you to make informed decisions.</p>
                    </div>
                    <div className="p-4  bg-green-400 shadow-lg rounded-md">
                        <h3 className="font-bold text-lg">Wide Variety</h3>
                        <p className="text-black mt-2">We cover a diverse range of services to cater to everyone's needs.</p>
                    </div>
                    <div className="p-4  bg-green-400 shadow-lg rounded-md">
                        <h3 className="font-bold text-lg">Wide Variety</h3>
                        <p className="text-black mt-2">We cover a diverse range of services to cater to everyone's needs.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;
