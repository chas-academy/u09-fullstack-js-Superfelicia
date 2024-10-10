interface CardProps {
    title: string
    subtitle?: string
    children?: React.ReactNode
}

const CardComponent = ({ title, subtitle, children }: CardProps) => {
    return (
        <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
            <div>{children}</div>
        </div>
    )
}

export default CardComponent
