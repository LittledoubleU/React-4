export default function Button(props) {
    const {label, func, style} = props
    return (
        <button className={`btn ${style}`}
        onClick={func}>
            {label}
        </button>
    )
}