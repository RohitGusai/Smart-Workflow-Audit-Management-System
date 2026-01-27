import { useEffect, useState } from "react";

export const Debounce = (value,delay) =>
{
    const [debounce,setdebounce] = useState(value);

    useEffect(()=>
    {
        const handler= setTimeout(()=>
        {
            setdebounce(value);
        },delay);

        return ()=>
        {
            clearTimeout(handler);
        }
    },[value,delay])
    return debounce;
}