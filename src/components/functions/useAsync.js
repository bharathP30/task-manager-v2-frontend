import { useState, useRef } from "react";

export default function useAsync() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSlow, setIsSlow] = useState(false);
    const timerRef = useRef(null);

    const run = async (func, delayMs = 3000) => {
        setIsLoading(true);
        setIsSlow(false);
        timerRef.current = setTimeout(() => setIsSlow(true), delayMs);
        
        try{
            await func();
        } finally {
            clearTimeout(timerRef.current);
            setIsLoading(false);
            setIsSlow(false);
        }
    }
    return { isLoading, isSlow, run }
}