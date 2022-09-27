import { useContext, useState } from "react";
import AppContext from "../../context/app/app.context";
import { fields } from "./fields";

const Modal = ({ hideModal }) => {
  const { 
    numberOfComponents, 
    numberOfHeaderElements,
    anchorsPorcentage, 
    componentsPorcentage,
    saveConfiguration
  } = useContext( AppContext );

  const [state, setState] = useState({
    numberOfComponents, 
    numberOfHeaderElements,
    anchorsPorcentage, 
    componentsPorcentage 
  })

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setState({ 
      ...state,
      [name]: parseInt(value)
    })
  }

  const setConfiguration = () => {
    saveConfiguration( state );
    hideModal();
  }

  return (
    <div className='config__modal'>
      <div className='config__content'>
        {
          fields.map( field => {
            const { id, text, name } = field;
            return (
              <div className='config__field'>
                <label className='config__label'>{ text }</label>
                <input 
                  id={id}
                  key={id}
                  name={name}
                  value={state[name]}
                  className='config__input' 
                  type="number"
                  onChange={handleChange}
                />
              </div>
            )
          })
        }
        <button 
          className='config__submit'
          onClick={setConfiguration}
        >
          GUARDAR
        </button>
      </div>
    </div>
  )
}

export default Modal;