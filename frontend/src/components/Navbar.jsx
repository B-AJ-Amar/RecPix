import { 
    React,
    useState 
} from 'react';




export default function Navbar(){

    let navItems = [
        {name: "Home", link: "#"},
        {name: "Explore", link: "#"},
        {name: "Categories", link: "#"},
        {name: "Profile", link: "#"}
    ]
    
    const [selectedNavItem, setselectedNavItem] = useState('0');

    return (
        <nav className="navbar navbar-expand-lg  fixed-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
                RecPix
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {navItems.map((item, index) => {
                        console.log(item,index);
                        return (
                            <li className="nav-item" key={index} onClick={() => setselectedNavItem(index)}>
                                <a className={selectedNavItem === index ? "nav-link active" : "nav-link"} href="#">{item.name}</a>
                            </li>
                        )
                    })}
                </ul>
                <form className="form-inline search-form">
                    <input className="form-control search-input" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </div>
        </div>
    </nav>
    )
}

