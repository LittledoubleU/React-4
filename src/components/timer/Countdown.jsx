import { useState, useRef, Fragment, useEffect } from "react"
import Digit from "../digits/Digit";
import Button from "../button/Button";
import Input from "../button/Input";
import "./Timer.css"

export default function Countdown() {

    const [second, setSecond] = useState("");
    const [minute, setMinute] = useState("");
    const [hour, setHour] = useState("");
    const [day, setDay] = useState("");
    const intervalRef = useRef(null);

    const timeUnits = [
        <Input value={day} func={handleDay} />,
        <Input value={hour} func={handleHour}/>, 
        <Input value={minute} func={handleMinute}/>, 
        <Input value={second} func={handleSecond}/>
    ];

    const styleClass = ["day", "hour", "minute", "second"]

    function handleSecond(s) {
        setSecond(s);
    }

    function handleMinute(m) {
        setMinute(m);
    }

    function handleHour(h) {
        setHour(h);
    }

    function handleDay(d) {
        setDay(d);
    }

    //isolate all the useEffect for avoid repeatively reduce number
    // Decrement seconds with proper boundary checks
    useEffect(() => {
        if (second <= 0 && minute <= 0 && hour <= 0 && day <= 0) {
            handleReset();
        }

        if (second < 0 && (minute > 0 || hour > 0 || day > 0)) {
            setSecond(59);
            setMinute((prev) => prev - 1);
        }
    }, [second]);
    
    useEffect(() => {
        if (minute < 0 && (hour > 0 || day > 0)) {
            setMinute(59);
            setHour((prev) => prev - 1);
        }
    }, [minute]);

    useEffect(() => {
        if (hour < 0 && day > 0) {
            setHour(23);
            setDay((prev) => prev - 1);
        }
    }, [hour]);


    // Start the timer
    function handleStart() {
        if (intervalRef.current) return; // Prevent multiple intervals

        intervalRef.current = setInterval(() => {
            setSecond((prev) => prev - 1);
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
        setDay("");
        setHour("");
        setMinute("");
        setSecond("");
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