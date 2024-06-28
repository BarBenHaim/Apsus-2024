export function SelectRating({ handleChange, rating }) {
    function onSetSelect(selectedValue) {
        const target = { name: 'rating', value: +selectedValue }
        handleChange({ target })
    }

    return (
        <select value={rating} onChange={ev => onSetSelect(ev.target.value)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
    )
}
