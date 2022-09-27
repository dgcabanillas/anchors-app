export const homeReducer = (state, action) => {
  const { componentsToRender, wantedComponent } = state;
  switch ( action.type ) {
    case 'SET_STATE': 
      return { ...state, ...action.payload };
    case 'SET_COMPONENT_AS_LOADED':
      const cmps2render = componentsToRender.map(component => ({ 
        ...component, 
        isLoaded: action.payload === component.id ? true : component.isLoaded
      }));
      const wantedCmp = wantedComponent?.id === action.payload 
        ? { ...wantedComponent, isLoaded: true } 
        : wantedComponent
      return {
        ...state, 
        wantedComponent: wantedCmp,
        componentsToRender: cmps2render
      }
    default: 
      return state; 
  }
};