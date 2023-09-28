import { useTabsContext } from "../context/TabsContext"

export default function Sidebar() {
  const { selectedTab, setSelectedTab } = useTabsContext()

  const handlePageChange = (e) => {
    if (e.target.textContent === "Daily TLDR") {
      setSelectedTab("tldr")
    } else if (e.target.textContent === "Favorites") {
      setSelectedTab("favorites")
    } else if (e.target.textContent === "Settings") {
      setSelectedTab("settings")
    } else if (e.target.textContent === "Privacy") {
      setSelectedTab("privacy")
    }
  }

  const handleLogoClick = () => {
    setSelectedTab("news")
  }

  return(
    <div className='sidebar'>
        <div className='logo' onClick={handleLogoClick}>
            <svg id='icon-dashboard' viewBox='0 0 24 24'>
              <title>NewsBuddy with AI</title>
              <path d='M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z'></path>
            </svg>
            <h1  style={{ marginLeft: '0.25rem' }}>NewsBuddy
              <span style={{
                display: 'block',
                fontSize: '0.4em',
                marginLeft: '0.25em',
                color: 'white',
                opacity: 0.6

              }}>with Artificial Intelligence</span>
            </h1>
        </div>
        <div className="about-snippet-mobile">
          <p>Every morning at 7am, AI News Buddy scrapes the web for news articles and generates summaries for each. You can view those articles, chat with the assistant, ask questions and more...</p>
        </div>
        <ul>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Join the Telegram</title>
            <path d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z"></path></svg>
          <li onClick={handleLogoClick} style={{ fontWeight: selectedTab === "news" ? "bold" : "normal"}}>News</li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Get a Quick Summary of Today's News</title>
            <path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M23 19L20 16V18H16V20H20V22L23 19Z" />
          </svg>
          <li onClick={handlePageChange} style={{ fontWeight: selectedTab === "tldr" ? "bold" : "normal"}}>Daily TLDR</li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Favorited Articles</title>
            <path d="M7 12C9.2 12 11 10.2 11 8S9.2 4 7 4 3 5.8 3 8 4.8 12 7 12M11 20V14.7C9.9 14.3 8.5 14 7 14C3.1 14 0 15.8 0 18V20H11M15 4C13.9 4 13 4.9 13 6V18C13 19.1 13.9 20 15 20H22C23.1 20 24 19.1 24 18V6C24 4.9 23.1 4 22 4H15Z" />
          </svg>
          <li onClick={handlePageChange} style={{ fontWeight: selectedTab === "favorites" ? "bold" : "normal"}}>Favorites</li>
        </ul>
      </div>
  )
}