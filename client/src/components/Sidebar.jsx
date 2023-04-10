export default function Sidebar() {
  return(
    <div className='sidebar'>
        <div className='logo'>
            <svg id='icon-dashboard' viewBox='0 0 24 24'><path d='M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z'></path></svg>
            <div>Dashboard</div>
        </div>
        <ul>
          <img src='./images/home.png' alt='home icon' />
          <li>Home</li>
          <img src='./images/account-card-outline.png' alt=' profile icon' />
          <li>Profile</li>
          <img src='./images/message.png' alt='messages icon' />
          <li>Messages</li>
          <img src='./images/history.png' alt='history icon' />
          <li>History</li>
          <img src='./images/tasks.png' alt='tasks icon' />
          <li>Tasks</li>
          <img src='./images/account-group.png' alt='communities icon' />
          <li>Communities</li>
          <img src='./images/cog-outline.png' alt='settings icon' />
          <li>Settings</li>
          <img src='./images/file-question-outline.png' alt='support icon' />
          <li>Support</li>
          <img src='./images/check-decagram.png' alt='privacy icon' />
          <li>Privacy</li>
        </ul>
      </div>
  )
}