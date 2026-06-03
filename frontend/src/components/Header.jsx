import { Package, Search, ShoppingCart, User } from 'lucide-react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const Header = () => {
  const { cartItems, userInfo, logout } = useApp();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const onSearch = (event) => {
    event.preventDefault();
    const value = event.currentTarget.keyword.value.trim();
    navigate(value ? `/?keyword=${encodeURIComponent(value)}` : '/');
  };

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <Package size={28} />
        <span>ShopZone</span>
      </Link>
      <form className="search" onSubmit={onSearch}>
        <input name="keyword" defaultValue={params.get('keyword') || ''} placeholder="Search products" />
        <button aria-label="Search" type="submit">
          <Search size={18} />
        </button>
      </form>
      <nav className="nav">
        <NavLink to="/cart">
          <ShoppingCart size={18} />
          Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>
        {userInfo ? (
          <>
            <NavLink to="/orders">Orders</NavLink>
            {userInfo.isAdmin && <NavLink to="/admin/products">Admin</NavLink>}
            <button className="link-button" onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <User size={18} />
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
