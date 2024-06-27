const { useState } = React
export function NoteFilter() {
    return (
        <section className='note-filter flex column  '>
            <button className='btn-filter active'>All</button>
            <button className='btn-filter'>Texts</button>
            <button className='btn-filter'>Images</button>
            <button className='btn-filter'>Videos</button>
            <button className='btn-filter'>Lists</button>
            <button className='btn-filter'>Bin</button>
        </section>
    )
}
