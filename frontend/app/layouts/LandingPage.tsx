import Skeleton from "../components/Skeleton";
import { Link } from "react-router";

export function LandingPage() {
    const listItemClass = "text-end p-4 hover:scale-200 hover:underline transition-all duration-300 ease-in-out" 
    
    return (
        <Skeleton> 
          
            <nav className="col-span-3 row-span-3 flex justify-center self-center pb-64 text-2xl mr-36">
                <ul className="text-underline">
                    <li className={listItemClass}><Link to="/display"> Wyświetl złoża </Link></li>
                    <li className={listItemClass}><Link to="/upload"> Wprowadź złoże</Link></li>
                    <li className={listItemClass + " hover:text-center"}><Link to="/list">Lista złóż</Link></li>
                </ul>
            </nav>
            
        </Skeleton>
    );
}