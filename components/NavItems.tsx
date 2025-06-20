import { cn } from 'lib/utlis'
import { Link, NavLink, useLoaderData, useNavigate } from 'react-router'
import { logoutUser } from '~/appwrite/auth';
import { sidebarItems } from '~/constant'

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {

  const user = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login')
  }

  const filteredSidebarItems = sidebarItems.filter(
    item => !item.role || user?.status === item.role
  );

  return (
    <section className="nav-items">
      <Link to='/' className="link-logo">
        <img src="/icons/logo.png" alt="logo" className="size-[30px]" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-pink-600 text-transparent bg-clip-text">
          IDKWhatToDo
        </h1>
      </Link>

      <div className="container">
        <nav>
          {filteredSidebarItems.map(({ id, href, icon, label }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn('group nav-item', {
                    'bg-gradient-to-r from-purple-600 to-pink-600 !text-white': isActive
                  })}
                  onClick={handleClick}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={`w-5 h-5 group-hover:brightness-0 group-hover:invert ${isActive ? 'brightness-0 invert' : ''}`}
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}

        </nav>

        <footer className="nav-footer">
          <img src={user?.imageURL} alt={user?.name} referrerPolicy="no-referrer" />

          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>

          <button
            onClick={handleLogout}
            className="cursor-pointer"
          >
            <img
              src="/icons/logout.svg"
              alt="logout"
              className="size-6"
            />
          </button>
        </footer>
      </div>
    </section>
  )
}

export default NavItems
