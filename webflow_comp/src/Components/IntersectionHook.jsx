import React, { useEffect, useRef, useState } from 'react'

export const useInView = () => {
    const [myElementIsVisible, setMyElementIsVisible] = useState(false)
    const elementRef = useRef()
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            setMyElementIsVisible(entry.isIntersecting)
        })
        observer.observe(elementRef.current)
        return () => observer.disconnect()
    }, [])
    return { myElementIsVisible, elementRef }
}
