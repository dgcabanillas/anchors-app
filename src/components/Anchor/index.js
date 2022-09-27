import { useContext } from "react";
import classNames from "classnames";
import HomeContext from "../../context/home/home.context";

const Anchor = ({ anchor, active }) => {
  const { text, href } = anchor;
  const { setWantedComponent } = useContext(HomeContext);

  const handleClick = () => { setWantedComponent( href )}

  return (
    <button
      className={classNames({
        'anchors__item': true,
        'anchors__item--active': active
      })}
      onClick={handleClick}
    >
      { text }
    </button>
  )
}

export default Anchor;