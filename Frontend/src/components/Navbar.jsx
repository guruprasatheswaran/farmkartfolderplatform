import { Link, NavLink, useNavigate } from 'react-router-dom';
export default function Navbar() {
 const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('farmkartUser'); navigate('/login'); };
 return <header className="nav"><Link className="brand" to="/">🌱 FarmKart</Link><nav>
<NavLink to="/">Home</NavLink>
 <NavLink to="/crops">Crops</NavLink>
 <NavLink to="/profit">Profit Calculator</NavLink>
 <NavLink to="/about">About</NavLink>
 <button className="link-button" onClick={logout}>Logout</button></nav></header>;
}
