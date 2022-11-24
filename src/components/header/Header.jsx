import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.headerSection}>
      <nav className={css.headerNav}>
        <NavLink
          to="/"
          className={css.link}
          style={({ isActive }) => ({
            color: isActive ? 'rgba(69, 89, 240, 0.831)' : 'black',
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={css.link}
          style={({ isActive }) => ({
            color: isActive ? 'rgba(69, 89, 240, 0.831)' : 'black',
          })}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;