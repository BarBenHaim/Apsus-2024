const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = txt.length > length
    const textToShow = isShowLong ? txt : txt.substring(0, length)
    return (
        <section className='long-txt'>
            <h4>
                {textToShow}
                {isLongText && <button onClick={onToggleIsShowLong}>{isShowLong ? ' Less...' : ' More...'}</button>}
            </h4>
        </section>
    )
}
