import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react"
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
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://collider.com/wp-content/uploads/inception_movie_poster_banner_01.jpg"
                        className="w-full h-[307px] object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://goggler.my/wp-content/uploads/2019/12/JM2_INTL_30Sht_BRIDGE_03-e1575889045252.jpg"
                        className="w-full h-[307px] object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b307d127256085.560502e8b209e.jpg"
                        className="w-full h-[307px] object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://comicsagogo.files.wordpress.com/2011/11/tintin-movie-poster-horizontal.jpg"
                        className="w-full h-[307px] object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
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
