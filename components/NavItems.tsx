import { cn } from 'lib/utlis'
import { Link, NavLink } from 'react-router'
import { sidebarItems } from '~/constant'

const NavItems = () => {

  const user = {
    name: "Usman Ghani",
    status: "admin"
  }


  const handleClick = () => { };

  const handleLogout = () => { };

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
                    'bg-primary-100 !text-white': isActive
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
          <img src={'/images/usman.png'} alt={'Usman'} referrerPolicy="no-referrer" />

          <article>
            <h2>usman ghani</h2>
            <p>ghaniusman0287@gmail.com</p>
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
