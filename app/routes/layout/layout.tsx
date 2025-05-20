import { Outlet } from 'react-router'
import {SidebarComponent} from "@syncfusion/ej2-react-navigations"
import { MobileSideBar, NavItems } from 'components'

const Layout = () => {
  return (
    <div className='base-layout'>
      <MobileSideBar/>
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems/>
        </SidebarComponent>
      </aside>
      <aside className='children'>
        <Outlet/>
      </aside>
    </div>
  )
}

export default Layout
