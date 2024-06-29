import { ReviewPreview } from '../cmps/ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    return (
        <div>
            <h3>Users recommend:</h3>
            {reviews.map(review => (
                <ReviewPreview key={review.id} review={review} onRemoveReview={onRemoveReview} />
            ))}
        </div>
    )
}
