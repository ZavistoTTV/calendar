import { NavLink } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import './SidebarLayout.css';

function SidebarLayout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo-container">
          <img src={logo} alt="logo" className="sidebar-logo" />
          <p className="logo-text">SyncNest</p>
        </div>
        <div className="navigation-container">
          <div className="navigation-title">Navigation</div>
          <nav className="sidebar-nav">
            <NavLink to="/" end className="sidebar-link">
              Начало
            </NavLink>
            <NavLink to="/calendar" className="sidebar-link">
              Календар
            </NavLink>
            <NavLink to="/settings" className="sidebar-link">
              Настройки
            </NavLink>
          </nav>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

export default SidebarLayout;

