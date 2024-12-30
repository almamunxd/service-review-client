import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicTitle from './shared/DynamicTitle';

const AddService = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddService = async (e) => {
        e.preventDefault();
        setLoading(true);

        const service = {
            title: e.target.title.value,
            company: e.target.company.value,
            website: e.target.website.value,
            description: e.target.description.value,
            category: e.target.category.value,
            price: parseFloat(e.target.price.value),
            image: e.target.image.value,
            addedDate: new Date().toISOString(),
            userEmail: user.email,
        };

        try {
            const response = await fetch('https://service-review-server-seven.vercel.app/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Service Added!',
                    text: 'Your service was added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/');
                });
            } else {
                const error = await response.json();
                Swal.fire({
                    title: 'Error',
                    text: `Failed to add service: ${error.message || 'Unknown error'}`,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: `Error adding service: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <DynamicTitle title="Add Service" />
            <div className="hero-content flex-col">
                <h1 className="text-2xl font-bold mb-4">Add New Service</h1>
                <form onSubmit={handleAddService} className="card bg-base-100 w-full max-w-sm p-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Service Title</span>
                        </label>
                        <input type="text" name="title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Name</span>
                        </label>
                        <input type="text" name="company" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Website</span>
                        </label>
                        <input type="url" name="website" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered" required></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name="category" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" name="price" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Service Image URL</span>
                        </label>
                        <input type="url" name="image" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Service'}
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddService;
