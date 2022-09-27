import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/app/app.context";
import HomeProvider from "../../context/home/home.provider";
import HomeComponents from "../../components/HomeComponents";
import Component from "../../components/Component";
import Anchors from "../../components/Anchors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  const classes = ['component--a', 'component--b', 'component--c'];

  const { 
    numberOfComponents, 
    numberOfHeaderElements,
    anchorsPorcentage, 
    componentsPorcentage,
  } = useContext( AppContext );

  const [components, setComponents] = useState([]);

  useEffect(() => {
    const anchors = [];
    const components = [];

    [...Array(numberOfComponents)].forEach((_, idx) => {
      if( Math.random() * 100 < anchorsPorcentage ) {
        anchors.push({
          id: `anchor-${idx}`,
          href: `component-${idx}`,
          text: idx
        })
      }
      if( Math.random() * 100 < componentsPorcentage ) {
        components.push({
          id: `component-${idx}`,
          className: classes[Math.floor(Math.random() * 3)],
          wrapper: Component,
          data: { text: idx }
        })
      }
    })

    components.unshift({
      id: 'anchors-0',
      wrapper: Anchors,
      data: { anchors }
    })

    components.unshift({
      id: 'banner-0',
      wrapper: Component,
      className: 'banner',
      data: { text: 'Banner Principal' }
    })

    console.log('all components: ', components);

    setComponents(components);

  }, [numberOfComponents, anchorsPorcentage, componentsPorcentage])

  useEffect(() => {
    setTimeout(() => { window.scrollTo(0, 0) }, 300);
  }, [components, numberOfHeaderElements])

  return (
    <div>
      <Header />
      <HomeProvider components={components}>
        <HomeComponents />
      </HomeProvider>
      <Footer />
    </div>
  )
}

export default Home;