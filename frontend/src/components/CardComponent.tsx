interface CardProps {
    title: string
    subtitle?: string
    children?: React.ReactNode
    onClick?: () => void
}

const CardComponent = ({ title, subtitle, children, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className="w-52 h-52 border rounded-md flex flex-col justify-center cursor-pointer"
        >
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    )
}

export default CardComponent
