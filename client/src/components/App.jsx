import Sidebar from './Sidebar';
import Main from './Main';
import UserContextProvider from "../context/UserContext";

export default function App() {

  return (
    <UserContextProvider>
      <div className='container'>
        <Sidebar />
        <Main />
      </div>
    </UserContextProvider>
  );
}
