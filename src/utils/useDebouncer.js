import { useEffect, useState } from "react";

export const useDebouncer = (val ,delay)=>{

    const [debounceValue, setDebounceValue] = useState(val);

    useEffect(() => {
      
        const timeout = setTimeout(() => {
            setDebounceValue(val)
        }, delay*1000);
    
      return () => {
        clearTimeout(timeout);
      }
    }, [val,delay])
    
    return debounceValue;
}