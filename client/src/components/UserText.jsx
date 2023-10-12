export default function UserText({ userText }) {
  if (userText) {
    return (
      <div id="user" style={{color:'var(--user)', display:'flex', animation: "fade-in 0.3s ease-in-out"}}>
        {userText}
      </div>
    )
  } else {
    return <></>
  }
}