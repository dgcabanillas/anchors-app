import { useContext, useEffect, useRef, useState } from "react";
import { useVerticalScroll } from "../../hooks/useVerticalScroll";
import HomeContext from "../../context/home/home.context";
import classNames from "classnames";
import Anchor from "../Anchor";

const Anchors = ({ id, data, isLoaded }) => {
  const { anchors } = data;
  const anchorsNode = useRef(null);
  const scrollPosition = useRef(0);
  const anchorFixedTopPosition = useRef(0);
  const [isFixed, setIsFixed] = useState(false);
  const { viewedComponent, wantedComponent, setComponentAsLoaded } = useContext(HomeContext);

  const observeHeaderPosition = ( scrollY ) => {
    if ( anchorsNode.current ) {
      if ( isFixed ) {
        if ( scrollPosition.current >= scrollY ) {
          setIsFixed( false );
        }
      } else {
        const headerNode = document.getElementById('header');
        if ( headerNode ) {
          const headerReact = headerNode.getBoundingClientRect();
          const anchorsRect = anchorsNode.current.getBoundingClientRect();
          if ( anchorsRect.top <= headerReact.bottom ) {
            scrollPosition.current = scrollY;
            anchorFixedTopPosition.current = headerReact.bottom;
            setIsFixed( true );
          }
        }
      }
    }
  }
  useVerticalScroll(observeHeaderPosition);
  useEffect(() => { !isLoaded && setComponentAsLoaded(id) }, [isLoaded]);

  return (
    <div id={id} className='anchors'>
      <div
        ref={anchorsNode}
        className={classNames({
          'anchors__content': true,
          'anchors__content--fixed': isFixed
        })}
        style={{ '--anchors-fixed-position': anchorFixedTopPosition.current + 'px' }}
      >
        { 
          anchors.map((anchor) => {
            return (
              <Anchor 
                key={anchor.id} 
                anchor={anchor} 
                active={
                  viewedComponent?.id === anchor.href 
                  || wantedComponent?.id === anchor.href
                }
              />
            )
          })
        }  
      </div>  
    </div>
  )
}

export default Anchors;