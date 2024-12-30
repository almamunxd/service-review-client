import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicTitle from '../shared/DynamicTitle';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, [page, search, category]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://service-review-server-seven.vercel.app/services?page=${page}&limit=6&search=${search}&category=${category}`
            );
            const data = await response.json();
            if (data.success) {
                setServices(data.data);
                setTotalPages(data.totalPages);
            } else {
                toast.error(data.message || 'Failed to fetch services');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchServices();
    };

    return (
        <div className="p-6">
            <DynamicTitle title="Services" />
            <h1 className="text-2xl font-bold mb-4">Services</h1>
            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search services..."
                    className="input input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="IT">IT</option>
                </select>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            {loading ? (
                <div>Loading...</div>
            ) : services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="card bg-violet-300 shadow-lg">
                            <figure>
                                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body text-black">
                                <h2 className="card-title">{service.title}</h2>
                                <p>{service.description}</p>
                                <p className="text-sm text-black">Category: {service.category}</p>
                                <p className="font-bold">Price: ${service.price.toFixed(2)}</p>
                                <button
                                    className="btn btn-primary mt-4"
                                    onClick={() => navigate(`/services/${service._id}`)}
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No services found.</div>
            )}
            <div className="flex justify-center mt-6">
                <button
                    className="btn btn-outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <p className="mx-4">Page {page} of {totalPages}</p>
                <button
                    className="btn btn-outline"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Services;
