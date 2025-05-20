// @ts-nocheck

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  let sidebar: SidebarComponent;

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/icons/logo.png"
            alt="Logo"
            className="size-[40px]"
          />

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-pink-600 text-transparent bg-clip-text">
            IDKWhatToDo
          </h1>
          
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={(Sidebar) => sidebar = Sidebar}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  )
}
export default MobileSidebar