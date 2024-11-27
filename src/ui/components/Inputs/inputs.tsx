import "./inputs.css"

type inputProps = {
    isPassword: boolean
    value: string
}

export default function InputField({ isPassword, value }: inputProps) {
    return (
        <div className="input-field">
            <input 
                type={isPassword ? "password" : "text"}
                placeholder={value}></input>
        </div>
    )
}