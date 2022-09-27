import { useEffect, useReducer, useRef } from "react";
import { useVerticalScroll } from "../../hooks/useVerticalScroll";
import { getHeightFromSelectors } from "../../utils/getHeightFromSelectors";
import { scrollToSelector } from "../../helpers/scrollToSelector";
import { homeReducer } from "./home.reducer";
import HomeContext from "./home.context";


const HOME_STATE = {
  amountToRender: 0,
  wantedComponent: null,
  viewedComponent: null,
  componentsToRender: [],
}


const HomeProvider = ({ children, components }) => {
  const marginTop = 32;
  const amountToLoad = 5;
  const offset = useRef(0);
  const [state, dispatch] = useReducer(homeReducer, HOME_STATE);


  useEffect(() => {
    const cmps2render = components.map(( component, idx) => ({ 
      ...component,
      index: idx,
      isLoaded: false
    }))
    dispatch({
      type: 'SET_STATE',
      payload: {
        amountToRender: amountToLoad,
        componentsToRender: cmps2render
      }
    })
  }, [components])


  const observeViewedComponent = () => {
    const headerNode = document.getElementById('header'); 
    const headerBottom = headerNode ? headerNode.getBoundingClientRect().bottom : 0;
    offset.current = headerBottom + getHeightFromSelectors(['.anchors']) + marginTop;
    for( let idx = 0; idx < state.componentsToRender.length; idx ++ ) {
      const component = state.componentsToRender[idx];
      const element = document.getElementById(component.id);
      if ( !element ) continue;
      const elementRect = element.getBoundingClientRect();
      const isInside = elementRect.top <= offset.current && offset.current <= elementRect.bottom;
      if ( !isInside ) continue;
      if ( state.viewedComponent?.id === component.id ) return;
      dispatch({
        type: 'SET_STATE', 
        payload: { 
          viewedComponent: component
        }
      })
      return;
    }
  }
  useVerticalScroll(observeViewedComponent);
  useEffect(() => {
    const { viewedComponent, amountToRender, componentsToRender } = state;
    if ( viewedComponent ) {
      const minimumAmountToRender = Math.min(viewedComponent.index + amountToLoad, componentsToRender.length);
      if ( amountToRender < minimumAmountToRender ) {
        dispatch({
          type: 'SET_STATE',
          payload: {
            amountToRender: minimumAmountToRender
          }
        })
      }
    }
  }, [state.viewedComponent])


  useEffect(() => {
    const { wantedComponent, componentsToRender, amountToRender } = state;
    if ( !wantedComponent ) return;

    const minimumAmountToRender = Math.max(wantedComponent.index + amountToLoad, amountToRender);
    const pendingComponentsToLoad = componentsToRender.filter(cmp => cmp.index < minimumAmountToRender && !cmp.isLoaded);
    const areThereComponentsToLoad = pendingComponentsToLoad.length > 0;

    if ( areThereComponentsToLoad ) {
      if ( minimumAmountToRender > amountToRender ) {
        dispatch({ type: 'SET_STATE', payload: { amountToRender: minimumAmountToRender }})
      }
    }

    if ( wantedComponent.isLoaded ) {
      scrollToSelector(`#${wantedComponent.id}`, offset.current - marginTop * .5);
      if ( !areThereComponentsToLoad ) {
        dispatch({ type: 'SET_STATE', payload: { wantedComponent: null }});
      }
    }
  }, [state.wantedComponent, state.componentsToRender])


  const setComponentAsLoaded = ( id ) => {
    console.log('componente:', id, ' terminó de cargar');
    dispatch({ type: 'SET_COMPONENT_AS_LOADED', payload: id })
  }
  const setWantedComponent = ( id ) => {
    const wantedComponent = state.componentsToRender.find(component => component.id === id );
    console.log ( 'clicked component:', wantedComponent?.id );
    dispatch({ type: 'SET_STATE', payload: { wantedComponent }});
  }


  return (
    <HomeContext.Provider 
      value={{
        ...state,
        setWantedComponent,
        setComponentAsLoaded
      }}
    >
      { children }
    </HomeContext.Provider>
  )
}

export default HomeProvider;