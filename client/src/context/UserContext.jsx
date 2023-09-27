import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [favorites, setfavorites] = useLocalStorage(
    "favorites",
    []
  );

  const [selectedTab, setSelectedTab] = useState("news");

  function itemInFavorites(item) {
    if (favorites.some(favorite => favorite._id === item._id)) return true;
    else return false
  }

  function addToFavorites(item) {
    if (favorites.some(favorite => favorite.title === item.title)) return;

    setfavorites(currFavorites => [...currFavorites, item])
  }

  function toggleFavorite(item) {
    if (favorites.some(favorite => favorite.title === item.title)) {
      setfavorites(currFavorites => currFavorites.filter(favorite => favorite.title !== item.title))
    } else {
      setfavorites(currFavorites => [...currFavorites, item])
    }
  }

  return (
    <UserContext.Provider value={{
      selectedTab,
      setSelectedTab,
      favorites,
      setfavorites,
      itemInFavorites,
      addToFavorites,
      toggleFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
