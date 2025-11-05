type buttonSettings = {
    title: string,
    style?: string,
    type?: "button" | "submit" | "reset",
    onClick?: () => void
}

export default function ButtonUI({title, style, type = "button", onClick}: buttonSettings) {
    return <button type={type} className={style} onClick={onClick}>{title}</button>
}