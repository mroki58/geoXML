export default ({children}: any) => {
    return (
        <header className="col-span-3 flex items-center w-full">
            <h1 className="self-center ml-12 text-3xl flex-1">geoXML</h1>
            {children && (
                <div className="flex items-center">{children}</div>
            )}
        </header>
    )
}