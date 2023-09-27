import Article from "./Article";
import { useUserContext } from "../context/UserContext";

export default function Favorites() {

  const { favorites } = useUserContext()

  return (
    <div style={{padding: '2rem'}}>
      <h1 style={{color: 'var(--primary)', marginBottom: '1.5rem'}}>Favorites</h1>
      {favorites.length > 0
        ?
        <div className="articles">
        {favorites.map(favorite => <Article article={favorite} />)}
      </div>
      :
      <div style={{
        display: 'flex',
        gap: '0.5em',
        alignItems: 'center',
        opacity: '0.9'
        }}>
      <p>No favorites yet. You can toggle favorites by clicking the</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
        fill: 'white',
        width: '2rem',
        display: 'inline'
        }}><path d="M5.8 21L7.4 14L2 9.2L9.2 8.6L12 2L14.8 8.6L22 9.2L18.8 12H18C17.3 12 16.6 12.1 15.9 12.4L18.1 10.5L13.7 10.1L12 6.1L10.3 10.1L5.9 10.5L9.2 13.4L8.2 17.7L12 15.4L12.5 15.7C12.3 16.2 12.1 16.8 12.1 17.3L5.8 21M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z" /></svg>
      <p>icon</p>
      </div>}
    </div>
  )
}