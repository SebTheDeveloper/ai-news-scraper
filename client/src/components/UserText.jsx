export default function UserText({ userText }) {
  if (userText) {
    return (
      <div id="user" style={{color:'var(--user)', display:'flex'}}>
        {userText}
      </div>
    )
  } else {
    return <></>
  }
}