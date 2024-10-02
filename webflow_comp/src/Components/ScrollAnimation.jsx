import React, { useEffect, useRef, useState } from 'react'
import { useInView } from './IntersectionHook'
import './scrollAnimation.css'

const Ar = []
for (let i = 0; i < 100; i++) {
    Ar.push(i)
}

const ScrollAnimation = ({ bottom, top, inView }) => {
    const { myElementIsVisible, elementRef } = useInView()
    const containerRef = useRef()
    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (elementRef.current && containerRef.current) {
                const elementTop = elementRef.current.getBoundingClientRect().top
                const containerTop = containerRef.current.getBoundingClientRect().top
                const windowHeight = window.innerHeight

                let visibilityPercentage = 0
                if (bottom) {
                    if (elementTop > 0 && elementTop < windowHeight) {
                        visibilityPercentage = (windowHeight - elementTop) / windowHeight
                    } else if (elementTop <= 0 && containerTop > 0) {
                        visibilityPercentage = 1
                    } else if (containerTop <= 0 && elementTop < windowHeight) {
                        visibilityPercentage = (windowHeight - containerTop) / windowHeight
                    }

                    visibilityPercentage = Math.min(1, Math.max(0, visibilityPercentage))
                    elementRef.current.style.transform = `translateX(${visibilityPercentage * 100}vw)`
                }

                if (top) {
                    const aquaDiv = containerRef.current.parentElement
                    const aquaDivTop = aquaDiv.getBoundingClientRect().top
                    if (aquaDivTop <= 0) {
                        console.log("atTop")
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        containerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            containerRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [bottom, top])

    return (
        <div
            style={{
                height: '30vh',
                overflow: 'hidden',
                backgroundColor: "aqua",
                position: isFixed ? 'fixed' : 'relative',
                top: isFixed ? 0 : 'auto',
                width: '100%',
            }}
        >
            <div style={{ height: "200vh", overflow: 'scroll' }} ref={containerRef}>
                <div
                    ref={elementRef}
                    className="scroll-container"
                    style={{ height: '50vh' }}
                >
                    <div>
                        {myElementIsVisible ? "True" : "False"}
                    </div>
                    <div className="">Test1</div>
                </div>
                {Ar.map((item, index) => {
                    return <div key={index}>{index}</div>
                })}
            </div>
        </div>
    )
}

export default ScrollAnimation
