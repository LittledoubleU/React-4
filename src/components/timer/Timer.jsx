import Button from "../button/Button"
import Digit from "../digits/Digit";
import { useEffect, useState, Fragment, useRef } from 'react'
import './Timer.css'

export default function Timer() {

    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [day, setDay] = useState(0);
    const intervalRef = useRef(null); // Store the interval reference here

    useEffect(() => {
        if (second >= 60) {
            setMinute((prev) => prev + 1);
            setSecond(0);
        }
        if (minute >= 60) {
            setHour((prev) => prev + 1);
            setMinute(0);
        }
        if (hour >= 24) {
            setDay((prev) => prev + 1);
            setHour(0);
        }
    }, [second, minute, hour]);

    const timeUnits = [day, hour, minute, second];
    const styleClass = ["day", "hour", "minute", "second"]

    // Start the timer
    function handleStart() {
        if (intervalRef.current) return; // Prevent multiple intervals

        intervalRef.current = setInterval(() => {
            setSecond((prev) => prev + 1);
        }, 1000);
    }

    // Pause the timer
    function handlePause() {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Clear the interval reference
    }

    // Reset the timer
    function handleReset() {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Clear the interval reference
        setDay(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
    }

    
    return (
        <div className="timer">
            <div className="display">
            {timeUnits.map((unit, index) => (
                <Fragment key={index}>
                    <Digit value={unit} style={styleClass[index]} />
                    {index < timeUnits.length - 1 && <span>:</span>}
                </Fragment>
            ))}
            </div>
            <div className="timer-btn">
                <Button label="Start" func={handleStart}/>
                <Button label="Pause" func={handlePause} style={"type2"}/>
                <Button label="Reset" func={handleReset}/>
            </div>
        </div>
    )
}