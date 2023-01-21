// import { useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import './navbar.css'

// const Navbar = () => {
//   const [showNavbar, setShowNavbar] = useState(false)

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar)
//   }

//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="logo">
//           Brand
//         </div>
//         <div className="menu-icon" onClick={handleShowNavbar}>
//           Logo
//         </div>
//         <div className={`nav-elements  ${showNavbar && 'active'}`}>
//           <ul>
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/Add">Create</NavLink>
//             </li>
//             <li>
//               <NavLink to="/PostList">Post List</NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import './navbar.css'

const Navbar = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            url: "/"       
        },
        {
            label: 'Create',
            icon: 'pi pi-fw pi-pencil',
            url: "/Add"
        },
        {
            label: 'Post List',
            icon: 'pi pi-fw pi-user',
            url: "/PostList"
        }
    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://codebridge.my/static/media/cb-logo.3d7cfc27.svg'} height="20" className="mr-2"></img>;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} />
            </div>
        </div>
    );
}
export default Navbar;

                 