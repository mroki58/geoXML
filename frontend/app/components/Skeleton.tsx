import Header from "./Header"
import Footer from "./Footer"

export default ({children, headerChildren}: any) => {
    return (
        <div className="grid grid-cols-3 grid-rows-[2fr_4fr_4fr_4fr_1fr] gap-4 h-screen">
            <Header>{headerChildren}</Header>
            {children}
            <Footer />
        </div>
    )
}