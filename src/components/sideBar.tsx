import Link from 'next/link';
import {ReactNode} from 'react';

interface SideBarItemProps {
  label: string;
  href: string;
}

/**
 * @param {SideBarItemProps} props
 * @return {ReactNode}
 */
function SideBarItem({label, href}: SideBarItemProps): ReactNode {
  return (
    <div className="hover:bg-slate-200 rounded-md p-2">
      <Link href={href}>{label}</Link>
    </div>
  );
}

/**
 * @return {ReactNode}
 */
export function SideBar(): ReactNode {
  return (
    <div
      className="flex flex-col bg-slate-300 rounded-md p-2 gap-2"
    >
      <SideBarItem label="Containers" href="containers" />
      {/* <SideBarItem label="Depots" href="depots" />
      <SideBarItem label="Delivery Orders" href="deliveryOrders" /> */}
    </div>
  );
}
