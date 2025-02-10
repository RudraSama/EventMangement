import NavBar from './NavBar';

const Layout = ({children})=>{
    return (
        <main className="w-5/6 ml-auto mr-auto">
            <NavBar />
            <hr className="border-gray-300"/>
            {children}
        </main>
    )
}

export default Layout;
