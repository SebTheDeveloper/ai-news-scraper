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

  function addToFavorites(newFavorite) {
      setfavorites(currFavorites => [...currFavorites, item])
  }

  function updateConvoHistory(item, convoHistory = []) {
    if (!itemInFavorites(item)) {
      let newFavorite;
      if (convoHistory.userSubmittedText?.length > 0) {
        newFavorite = {
          ...item,
          convo: convoHistory
        }
      } else {
        newFavorite = {
          ...item,
          convo: {
            userSubmittedText: [],
            agentSubmittedText: []
          }
        }
      }
      
      setfavorites(currFavorites => {
        return [...currFavorites, newFavorite]
      })
    } else {
      setfavorites((currFavorites) => {
        return currFavorites.map((favorite) => {
          if (favorite._id === item._id) {
            return {
              ...favorite,
              convo: convoHistory
            };
          }
          return favorite;
        });
      });
    }
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
