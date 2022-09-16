import {useState,useEffect} from "react";

export default function useWindowDimensions():object{
    function getWindowDimensions():object{
        const {innerWidth:width,innerHeight:height}=window;
        return {width,height};
    }
    const [windowDimensions,setWindowDimensions]=useState<object>(getWindowDimensions());
    useEffect(()=>{
        function onResize():void{
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize",onResize);
        return ()=>{
            window.removeEventListener("resize",onResize);
        }
    },[]);
    return windowDimensions;
}
