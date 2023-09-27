export default function Top({ setCategoryFilter }) {
  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value)
    console.log(e.target.value)
  }

  return(
    <div className="top">
      <div>
        <div id="welcome-message">
          <p>Your personal AI News Buddy</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="#000" d="M19,10C19,11.38 16.88,12.5 15.5,12.5C14.12,12.5 12.75,11.38 12.75,10H11.25C11.25,11.38 9.88,12.5 8.5,12.5C7.12,12.5 5,11.38 5,10H4.25C4.09,10.64 4,11.31 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,11.31 19.91,10.64 19.75,10H19M12,4C9.04,4 6.45,5.61 5.07,8H18.93C17.55,5.61 14.96,4 12,4M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
          </svg>
        </div>
      </div>
      <a href="https://github.com/sebdoubleu/ai-news-scraper/" target="_blank">
        <div className="buttons">
          <button>Github</button>
        </div>
      </a>
      <div className="search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Search Articles by Category</title>
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
        <input type="text" placeholder="Filter by Category" onChange={handleFilterChange} />
      </div>
    </div>
  )
}