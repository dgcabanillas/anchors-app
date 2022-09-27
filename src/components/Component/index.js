import { useContext, useEffect, useState } from "react";
import HomeContext from "../../context/home/home.context";
import Placeholder from "../Placeholder";
import classNames from "classnames";

const Component = ({ id, data, className, isLoaded }) => {
  const [response, setResponse] = useState(null);
  const { setComponentAsLoaded } = useContext(HomeContext);

  useEffect(() => {
    if ( !isLoaded ) {
      const execFetch = async () => {
        const res = await fakeFetch();
        setResponse(res);
        setComponentAsLoaded(id);
      }
      execFetch();
    }
  }, [isLoaded]);
  
  const fakeFetch = () => {
    console.log('cargando el componente: ', id );
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, Math.random() * 1501 + 1500 );
    });
    return promise;
  }

  if( !response ) return (<Placeholder id={id} data={data}/>)

  return (
    <div
      id={id} 
      className={classNames({
        'component': true,
        [className]: !!className
      })}
    > 
      Component - { data.text }
    </div>
  )
}

export default Component;