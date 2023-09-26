import Top from "./Top";
import Bottom from "./Bottom";

export default function Main({ isTldr, isFavorites }) {

  return (
    <div className="main">
      <Top />
      <Bottom isTldr={isTldr} isFavorites={isFavorites} />
    </div>
  )
}