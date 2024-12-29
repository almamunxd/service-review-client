import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyServices = () => {
    const { user } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/myServices?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setServices(data.services);
                    } else {
                        toast.error(data.message || 'Failed to load services');
                    }
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message}`);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            fetch(`http://localhost:3000/services/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        toast.success('Service deleted successfully!');
                        setServices(services.filter((service) => service._id !== id));
                    } else {
                        toast.error(data.message || 'Failed to delete service');
                    }
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message}`);
                });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedService = {
            title: e.target.title.value,
            category: e.target.category.value,
            price: parseFloat(e.target.price.value),
        };

        fetch(`http://localhost:3000/services/${editingService._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedService),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Service updated successfully!');
                    setServices((prev) =>
                        prev.map((srv) =>
                            srv._id === editingService._id ? { ...srv, ...updatedService } : srv
                        )
                    );
                    setEditingService(null);
                } else {
                    toast.error(data.message || 'Failed to update service');
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Services</h1>
            <input
                type="text"
                placeholder="Search by title"
                className="input input-bordered mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
                <div>Loading...</div>
            ) : filteredServices.length > 0 ? (
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map((service) => (
                            <tr key={service._id}>
                                <td className="border px-4 py-2">{service.title}</td>
                                <td className="border px-4 py-2">{service.category}</td>
                                <td className="border px-4 py-2">${service.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        onClick={() => setEditingService(service)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleDelete(service._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No services found.</div>
            )}

            {editingService && (
                <div className={`modal ${editingService ? 'modal-open' : ''}`}>
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Update Service</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={editingService.title}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    defaultValue={editingService.category}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    defaultValue={editingService.price}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setEditingService(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default MyServices;
