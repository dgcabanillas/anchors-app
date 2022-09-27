import { useReducer } from "react";
import AppContext from "./app.context";
import { appReducer } from "./app.reducer";

const APP_STATE = {
  numberOfComponents: 10,
  numberOfHeaderElements: 0,
  anchorsPorcentage: 100,
  componentsPorcentage: 100,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, APP_STATE);
  const saveConfiguration = ( state ) => dispatch({ type: 'SET_STATE', payload: state })
  return (
    <AppContext.Provider
      value={{
        ...state,
        saveConfiguration
      }}
    >
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;