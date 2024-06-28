import { StarRating } from './dynamic-inputs/StarRating.jsx'

export function ReviewPreview({ review, onRemoveReview }) {
    return (
        <section className='review-details'>
            <h4>{review.fullName}</h4>
            <h5>{new Date(review.date).toLocaleDateString('he')}</h5>
            {review.rating !== 0 && (
                <h4>
                    <StarRating rating={review.rating} />
                </h4>
            )}
            <p>{review.txt}</p>
            <button className='btn-remove-review' onClick={() => onRemoveReview(review.id)}>
                x
            </button>
        </section>
    )
}
