import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/services?limit=6")
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
            {/* Banner Section */}
            <div className="carousel w-full h-96">
                <div className="carousel-item">
                    <img src="/images/banner1.jpg" className="w-full" alt="Banner 1" />
                    <h2 className="absolute text-white text-4xl font-bold">Welcome to Service Review</h2>
                </div>
                <div className="carousel-item">
                    <img src="/images/banner2.jpg" className="w-full" alt="Banner 2" />
                    <h2 className="absolute text-white text-4xl font-bold">Find the Best Services</h2>
                </div>
                <div className="carousel-item">
                    <img src="/images/banner3.jpg" className="w-full" alt="Banner 3" />
                    <h2 className="absolute text-white text-4xl font-bold">Share Your Experience</h2>
                </div>
            </div>

            {/* Featured Services Section */}
            <div className="px-6 py-10">
                <h2 className="text-3xl font-bold mb-6">Featured Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <motion.div
                            key={service._id}
                            className="card shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                            <div className="card-body">
                                <h3 className="card-title">{service.title}</h3>
                                <p>{service.description}</p>
                                <p className="font-bold">Price: ${service.price.toFixed(2)}</p>
                                <Link to={`/services/${service._id}`} className="btn btn-primary mt-4">
                                    See Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Meet Our Partners Section */}
            <div className="bg-gray-100 px-6 py-10">
                <h2 className="text-3xl font-bold mb-6">Meet Our Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center">
                        <img src="/images/partner1.png" alt="Partner 1" className="w-24" />
                        <p className="text-center mt-2">Partner 1</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/images/partner2.png" alt="Partner 2" className="w-24" />
                        <p className="text-center mt-2">Partner 2</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white px-6 py-4">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-xl font-bold">ServiceReview</h2>
                        <p>Discover and share the best services.</p>
                    </div>
                    <div>
                        <p>© 2024 ServiceReview. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
