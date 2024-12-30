import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';
import { Rating } from 'react-simple-star-rating';
import DynamicTitle from './shared/DynamicTitle';

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServiceDetails();
        fetchReviews();
    }, [id]);

    const fetchServiceDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/services/${id}`);
            const data = await response.json();
            if (data.success) {
                setService(data.data);
            } else {
                toast.error(data.message || 'Service not found.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3000/services/${id}/reviews`);
            const data = await response.json();
            if (data.success) {
                setReviews(data.data);
            } else {
                toast.error(data.message || 'Failed to fetch reviews.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!reviewText.trim() || !rating) {
            return toast.error('Please provide both a review and a rating.');
        }

        const review = {
            serviceId: service._id,
            userId: user.email,
            userName: user.displayName || 'Anonymous',
            userPhoto: user.photoURL || '/default-avatar.png',
            reviewText: reviewText,
            rating: rating,
            postedDate: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Review added successfully!');
                setReviewText('');
                setRating(0);
                fetchReviews();
            } else {
                toast.error(data.message || 'Failed to add review');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (!service) return <div>Service not found.</div>;

    return (
        <div className="p-6">
            <DynamicTitle title="Details" />
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <img src={service.image} alt={service.title} className="w-full h-60 object-cover mb-4" />
            <p className="text-white">{service.description}</p>
            <p className="font-bold mt-4">Category: {service.category}</p>
            <p className="font-bold">Price: ${service.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Added by: {service.userEmail}</p>
            <p className="text-sm text-gray-500">
                Added on: {new Date(service.addedDate).toLocaleString()}
            </p>
            <h2 className="text-2xl font-bold mt-6">Reviews ({reviews.length})</h2>
            <div className="space-y-4 mt-4">
                {reviews.map((review) => (
                    <div key={review._id} className="p-4 border rounded-md">
                        <div className="flex items-center space-x-2">
                            <img
                                src={review.userPhoto || '/default-avatar.png'}
                                alt={review.userName || 'Anonymous'}
                                className="w-8 h-8 rounded-full"
                            />
                            <p className="font-bold">{review.userName || 'Anonymous'}</p>
                        </div>
                        <p className="text-gray-600 mt-2">{review.reviewText}</p>
                        <Rating readonly={true} initialValue={review.rating} size={20} SVGstyle={{ 'display': 'inline' }} />
                        <p className="text-sm text-gray-500 mt-1">
                            Posted on {new Date(review.postedDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

            {user && (
                <>
                    <h2 className="text-2xl font-bold mt-6">Add Your Review</h2>
                    <form onSubmit={handleAddReview} className="space-y-4 mt-4">
                        <div>
                            <textarea
                                placeholder="Write your review here..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Rating onClick={(rate) => setRating(rate)} ratingValue={rating} size={30} SVGstyle={{ 'display': 'inline' }} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add Review
                        </button>
                    </form>
                </>
            )}

            <ToastContainer />
        </div>
    );
};

export default ServiceDetails;
