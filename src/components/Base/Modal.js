import { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'

export default function Modal({ isOpen, onClose, children }){
    const [_isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        setIsOpen(isOpen)
    }, [isOpen])
    
    const close = () => {
        if(!onClose){
            setIsOpen(!_isOpen)
        } else {
            onClose()
        }
    }

    const transBackdrop = {
        entering: " opacity-0",
        entered: " opacity-75",
        exiting: "opacity-0",
        exited: "hidden"
    }

    const transModal = {
        entering: " opacity-0",
        entered: " opacity-1",
        exiting: "opacity-0",
        exited: "hidden"
    }
    
    return (
        <Transition in={_isOpen} timeout={150}>
            {state => (
                <div>
                    <div className={`fixed inset-0 w-full h-screen bg-black ${transBackdrop[state]}`} style={{transition: "opacity 150ms ease-in-out"}} onClick={() => close()}>
                    </div>
                    <div className={`fixed bg-black block w-3/5 h-auto mx-auto my-auto border border-white p-4 ${transModal[state]}`} style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                        {children}
                    </div>
                </div>
            )}
        </Transition>
    )
}