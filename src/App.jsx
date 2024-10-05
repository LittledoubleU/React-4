import Timer from './components/timer/timer'
import Countdown from './components/timer/Countdown';
import { useState } from 'react'

function App() {
    const [mode, setMode] = useState("timer");

    function handleModeSwitch() {
        setMode((prevMode) => (prevMode === "timer" ? "countdown" : "timer"));
    }

    return (
       <section>
            <div className="container">
                {mode === "timer" ? <h1>Timer</h1> : <h1>Countdown</h1>}
                {mode === "timer" ? <Timer /> : <Countdown />}
                <button className='btn' onClick={handleModeSwitch}>
                Switch to {mode === "timer" ? "Countdown" : "Timer"}
                </button>
            </div>
       </section>
    ) 
}

export default App
