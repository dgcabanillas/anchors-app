import { useState } from "react";
import Home from "./core/Home";
import Modal from "./components/Modal";
import AppProvider from "./context/app/app.provider";

const App = () => {
  const [show, setShow] = useState( false );
  const hideModal = () => setShow(false);

  return (
    <AppProvider>
      <Home />
      <button 
        onClick={() => { setShow( prevShow => !prevShow )}}
        className='config__toggle'
      > 
        { show ? 'ocultar' : 'mostrarr' }
        { ' config' }
      </button>
      { show && <Modal hideModal={hideModal}/> }
    </AppProvider>
  )
}

export default App;
