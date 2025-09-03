import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Mini Blog
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={isActive('/')}>
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className={isActive('/create')}>
              Créer un post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;