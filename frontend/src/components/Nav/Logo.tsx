

export function Logo( {className}: {className?: string}){
    return (
        <h1 className={`text-primary font-semibold text-xl ${className || '' } ` } >RecPix</h1>
    )
}
