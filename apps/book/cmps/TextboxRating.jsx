export function TextboxRating({ handleChange, txt }) {
    function onSetTxt(newTxt) {
        const target = { name: 'txt', value: newTxt }
        handleChange({ target })
    }

    return <textarea name='txt' cols='30' rows='10' value={txt} onChange={ev => onSetTxt(ev.target.value)}></textarea>
}
