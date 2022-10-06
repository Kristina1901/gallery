import { NavLink } from 'react-router-dom';
import './Navigation.scss';
const Navigation = () => (
  <nav className="header">
    <NavLink
      to="/"
      end
      className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
    >
      Home
    </NavLink>

    <NavLink
      to="/favorite"
      className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
    >
      Favorite
    </NavLink>
    <hr />
  </nav>
);

export default Navigation;
