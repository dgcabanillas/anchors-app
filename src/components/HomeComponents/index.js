import { useContext, useEffect, useState } from "react";
import { getHeightFromSelectors } from "../../utils/getHeightFromSelectors";
import AppContext from "../../context/app/app.context";
import HomeContext from "../../context/home/home.context";
import Placeholder from "../Placeholder";

const HomeComponents = () => {
  const [contentPaddingTop, setContentPaddingTop] = useState(0);
  const { componentsToRender, amountToRender } = useContext(HomeContext);
  const { numberOfHeaderElements } = useContext(AppContext);

  useEffect(() => {
    setContentPaddingTop(getHeightFromSelectors(['#header']) + 16);
  }, [componentsToRender, numberOfHeaderElements])
  
  return (
    <div className="content" style={{ '--content-padding-top': contentPaddingTop + 'px' }}>
      {
        componentsToRender.map((component, idx) => {
          if( idx >= amountToRender ) {
            return (
              <Placeholder
                id={component.id} 
                key={component.id} 
                data={component.data}
              />
            );
          }
            
          const Wrapper = component.wrapper;
          return (
            <Wrapper 
              id={component.id}
              key={component.id} 
              data={component.data} 
              className={component.className}
              isLoaded={component.isLoaded}
            />
          )
        })
      }  
    </div>
  )
}

export default HomeComponents;