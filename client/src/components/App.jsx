import Sidebar from './Sidebar';
import Main from './Main';
import UserContextProvider from "../context/UserContext";
import TabsContextProvider from '../context/TabsContext';

export default function App() {

  return (
    <div className='container'>
      <TabsContextProvider>
        <UserContextProvider>
          <Sidebar />
        </UserContextProvider>
        <Main />
      </TabsContextProvider>
    </div>
  );
}
