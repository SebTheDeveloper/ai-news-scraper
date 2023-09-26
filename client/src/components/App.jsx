import { useState } from "react";
import Sidebar from './Sidebar';
import Main from './Main';

export default function App() {
  const [isTldr, setIsTldr] =useState(false);
  const [isFavorites, setIsFavorites] =useState(false);

  return (
    <div className='container'>
      <Sidebar
        isTldr={isTldr}
        setIsTldr={setIsTldr}
        isFavorites={isFavorites}
        setIsFavorites={setIsFavorites} />
      <Main isTldr={isTldr} isFavorites={isFavorites} />
    </div>
  );
}
