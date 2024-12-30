import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import { Rating } from "react-simple-star-rating";
import DynamicTitle from "./shared/DynamicTitle";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);


    useEffect(() => {
        if (user) {
            console.log(`Fetching reviews for user: ${user.email}`);
            fetch(`https://service-review-server-seven.vercel.app/myReviews?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched Reviews Data:", data); // Log fetched data
                    if (data.success) {
                        setReviews(data.data);
                    } else {
                        toast.error(data.message || "Failed to load reviews");
                    }
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message}`);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);



    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            fetch(`https://service-review-server-seven.vercel.app/reviews/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        toast.success("Review deleted successfully!");
                        setReviews(reviews.filter((review) => review._id !== id));
                    } else {
                        toast.error(data.message || "Failed to delete review");
                    }
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message}`);
                });
        }
    };


    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedReview = {
            text: e.target.text.value,
            rating: parseFloat(e.target.rating.value),
        };

        fetch(`https://service-review-server-seven.vercel.app/reviews/${editingReview._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReview),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Review updated successfully!");
                    setReviews((prev) =>
                        prev.map((review) =>
                            review._id === editingReview._id
                                ? { ...review, ...updatedReview }
                                : review
                        )
                    );
                    setEditingReview(null);
                } else {
                    toast.error(data.message || "Failed to update review");
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <DynamicTitle title="My Reviews" />
            <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="card bg-base-100 shadow-lg p-4">
                            <h2 className="font-bold text-lg">{review.title}</h2>
                            <p className="text-gray-700">{review.reviewText}</p>
                            <Rating readonly={true} initialValue={review.rating} size={20} SVGstyle={{ display: 'inline' }} />
                            <div className="flex space-x-2 mt-4">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        setEditingReview(review);
                                        setUpdatedText(review.reviewText);
                                        setUpdatedRating(review.rating);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => handleDelete(review._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>


                    ))}

                </div>
            ) : (
                <div>No reviews found.</div>
            )}

            {editingReview && (
                <div className={`modal ${editingReview ? "modal-open" : ""}`}>
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Update Review</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Service Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="serviceTitle"
                                    value={editingReview.serviceTitle}
                                    className="input input-bordered"
                                    disabled
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Review Text</span>
                                </label>
                                <textarea
                                    name="text"
                                    defaultValue={editingReview.text}
                                    className="textarea textarea-bordered"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    defaultValue={editingReview.rating}
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
                                    onClick={() => setEditingReview(null)}
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

export default MyReviews;
