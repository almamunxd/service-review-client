import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/services/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setService(data.data);
                    setReviews(data.data.reviews);
                } else {
                    toast.error(data.message || 'Failed to fetch service details');
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReview) {
            toast.error('Please enter a review');
            return;
        }

        const review = {
            serviceId: id,
            userId: user?.email || 'Guest',
            userName: user?.displayName || 'Anonymous',
            userPhoto: user?.photoURL || '/default-avatar.png',
            text: newReview,
            date: new Date().toISOString(),
        };

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Review added successfully');
                    setReviews([...reviews, review]); // Update reviews in the UI
                    setNewReview(''); // Reset input field
                } else {
                    toast.error(data.message || 'Failed to add review');
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!service) {
        return <div>Service not found</div>;
    }

    return (
        <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full lg:w-1/2 rounded-lg object-cover"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
                    <p className="text-lg mb-2">{service.description}</p>
                    <p className="text-sm text-gray-500 mb-4">Category: {service.category}</p>
                    <p className="font-bold text-xl">Price: ${service.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <div className="flex items-center mb-2">
                                <img
                                    src={review.userPhoto}
                                    alt={review.userName}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-bold">{review.userName}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.date).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <p>{review.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {user && (
                <form onSubmit={handleAddReview} className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
                    <textarea
                        className="textarea textarea-bordered w-full mb-4"
                        placeholder="Write your review here..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit Review
                    </button>
                </form>
            )}

            <ToastContainer />
        </div>
    );
};

export default ServiceDetails;
