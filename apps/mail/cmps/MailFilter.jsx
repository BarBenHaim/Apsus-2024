export function MailFilter() {
  return (
    <section className="filter-container">
      <h1>Email filter</h1>
      <div className="search-mail">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search mails..."
          // value={searchTerm}
          // onChange={handleChange}
          // onKeyPress={handleKeyPress}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
    </section>
  )
}
