export function NumInputRating({ handleChange, rating }) {
    function onSetRating(newValue) {
        const target = { name: 'rating', value: +newValue }
        handleChange({ target })
    }

    return <input name='rating' value={rating} onChange={ev => onSetRating(ev.target.value)} type='number' />
}
