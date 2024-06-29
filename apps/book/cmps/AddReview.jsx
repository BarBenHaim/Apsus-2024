import { StarRating } from './dynamic-inputs/StarRating.jsx'
import { TextboxRating } from './TextboxRating.jsx'
import { SelectRating } from './dynamic-inputs/SelectRating.jsx'
import { NumInputRating } from './dynamic-inputs/NumInputRating.jsx'

const { useState, useRef, useEffect } = React

export function AddReview({ saveReview, toggleReview }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })

    const [cmpType, setCmpType] = useState('stars')

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        console.log('review:', review)
        review.date = new Date(date).getTime()
        saveReview(review)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onChangeCmpType(selectedType) {
        setCmpType(selectedType)
    }

    const { fullName, date, txt, rating } = review
    return (
        <section className='review-add'>
            <form onSubmit={onAddReview} className='review-form'>
                <div className='review-modal'>
                    <h1>Add review</h1>
                    <button className='btn-toggle-modal' onClick={toggleReview}>
                        X
                    </button>
                    <label className='bold-txt' htmlFor='fullname'>
                        Full name:
                    </label>
                    <input
                        autoFocus
                        ref={inputRef}
                        placeholder='Enter full name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={fullName}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <label className='bold-txt' htmlFor='date'>
                        Date:
                    </label>

                    <input type='date' id='date' name='date' value={date} onChange={handleChange} />

                    <DynamicCmp cmpType={cmpType} handleChange={handleChange} rating={rating} />

                    <select value={cmpType} onChange={ev => onChangeCmpType(ev.target.value)}>
                        <option value='select'>Select</option>
                        <option value='numInput'>Num</option>
                        <option value='stars'>Stars</option>
                    </select>

                    <TextboxRating handleChange={handleChange} txt={txt} />
                    <button>Save</button>
                </div>
            </form>
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'select':
            return <SelectRating {...props} />
        case 'numInput':
            return <NumInputRating {...props} />
        case 'stars':
            return <StarRating {...props} />
        default:
            null
    }
}
