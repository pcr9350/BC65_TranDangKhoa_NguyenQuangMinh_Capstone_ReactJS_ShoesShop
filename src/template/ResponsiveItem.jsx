import React, { useEffect, useState } from 'react'


const ResponsiveItem = (props) => {
    const [screen, setScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const setScreenWindow = () => {
        setScreen({
            width: window.innerWidth,
            height:window.innerHeight
        })
    }

    useEffect(()=>{
        window.addEventListener('resize',setScreenWindow);
        window.addEventListener('load',setScreenWindow);
        return () => {
            window.removeEventListener('resize',setScreenWindow);
            window.removeEventListener('load',setScreenWindow);
        }
    },[])
    
    const [component, setComponent] = useState(props.component);

    useEffect(()=>{
        if (screen.width < 768 && props.mobileComponent) {
            setComponent(props.mobileComponent);
        }else {
            setComponent(props.component)
        }
    }, [screen.width])
    
    
  return (
    <>
        {component}
    </>
    
  )
}

export default ResponsiveItem