const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const value = target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, txt: value }))
  }

  const { txt } = filterByToEdit
  return (
    <section className="filter-container">
      <form className="search-mail">
        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
        <input
          value={txt}
          onChange={handleChange}
          type="text"
          placeholder="Search "
          id="txt"
          name="txt"
        />
        {/* <button hidden>Set Filter</button> */}
      </form>
    </section>
  )
}
