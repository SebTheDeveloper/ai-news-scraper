import { createContext, useContext, useState } from "react";

export const TabsContext = createContext(null);

export default function TabsContextProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState("news");
  return (
    <TabsContext.Provider value={{
      selectedTab,
      setSelectedTab
    }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsContextProvider");
  }
  return context;
}
