import { eventBusService } from '../services/event-bus.service.js'
const { useState, useEffect, useRef } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const [isClosing, setIsClosing] = useState(false)
    const [animationDuration, setAnimationDuration] = useState('.5s')
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setIsClosing(false)
            setAnimationDuration('.5s')
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(() => {
                setIsClosing(true)
                setAnimationDuration('0.5s')
                setTimeout(closeMsg, 500)
            }, 2500)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <section
            className={`user-msg ${msg.type} animate__animated ${isClosing ? 'animate__fadeOut' : 'animate__fadeIn'}`}
            style={{ animationDuration }}
        >
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}
