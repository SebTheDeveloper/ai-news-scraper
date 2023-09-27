import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [favorites, setfavorites] = useLocalStorage(
    "favorites",
    []
  );

  function itemInFavorites(item) {
    if (favorites.some(favorite => favorite._id === item._id)) return true;
    else return false
  }

  function addToFavorites(item, convoHistory = null) {
    if (!itemInFavorites(item)) {
      if (convoHistory) {
        updateConvoHistory(item, convoHistory)
      }

      setfavorites(currFavorites => [...currFavorites, item])
    }
  }

  function updateConvoHistory(item, convoHistory) {
    setfavorites(currFavorites => {
      const updatedFavorites = []
      
      for (const favorite of currFavorites) {
        if (favorite._id === item._id) {
          favorite.convo = convoHistory
        }
        updatedFavorites.push(favorite)
      }

      return updatedFavorites
    })
  }

  function getKeyOfFavorite(key, item) {
    if (!key || !item) return null

    const convo = favorites.find(favorite => favorite._id === item._id)[key]
    if (!convo) return null

    return convo
  }

  function toggleFavorite(item) {
    if (itemInFavorites(item)) {
      setfavorites(currFavorites => currFavorites.filter(favorite => favorite._id !== item._id))
    } else {
      setfavorites(currFavorites => [...currFavorites, item])
    }
  }

  return (
    <UserContext.Provider value={{
      favorites,
      setfavorites,
      itemInFavorites,
      addToFavorites,
      updateConvoHistory,
      getKeyOfFavorite,
      toggleFavorite,
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
