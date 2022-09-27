import { useContext } from "react";
import AppContext from "../../context/app/app.context";

const Header = () => {
  const { numberOfHeaderElements: quantity } = useContext(AppContext);
  return (
    <header id='header' className="header"> 
      <div className="elements"> HEADER </div>
      { 
        [...Array(quantity)].map((_, idx) => (
          <div className="other-elements" key={idx}> 
            other elements 
          </div> 
        ))
      }
    </header>
  )
}

export default Header;