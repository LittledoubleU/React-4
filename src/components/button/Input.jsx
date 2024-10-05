export default function Input({ value, func }) {
    return (
        <input 
            type="number"
            placeholder="00" 
            value={value}
            onChange={(e) => func(parseInt(e.target.value, 10))} 
        />
    )
}