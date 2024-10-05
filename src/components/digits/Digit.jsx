export default function Digit(props) {
    const value = props.value;
    const styleName = props.style;
    return <p className={styleName}>{value < 10 && value >= 0? `0${value}` : value}</p>;
}