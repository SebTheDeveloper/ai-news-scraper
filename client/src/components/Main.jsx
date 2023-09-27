import Top from "./Top";
import Bottom from "./Bottom";
import { useState } from "react";

export default function Main() {
  const [categoryFilter, setCategoryFilter] = useState("")

  return (
    <div className="main">
      <Top setCategoryFilter={setCategoryFilter} />
      <Bottom categoryFilter={categoryFilter} />
    </div>
  )
}