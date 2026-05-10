import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, LayoutDashboard, Receipt, Users } from 'lucide-react';

export interface SidebarItem {
	key: string;
	label: string;
	icon: ReactNode;
}

interface SidebarNavProps {
	items: SidebarItem[];
	activeKey?: string;
	onChange?: (key: string) => void;
}

/**
 * Collapsible sidebar navigation with active route highlighting.
 */
const SidebarNav = ({ items, activeKey, onChange }: SidebarNavProps) => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<aside className={`rounded-md border border-[#E2E8F0] bg-white p-2 transition-all ${collapsed ? 'w-[84px]' : 'w-[240px]'}`}>
			<button type='button' className='mb-2 ml-auto block rounded p-1 hover:bg-[#F1F5F9]' onClick={() => setCollapsed((prev) => !prev)}>
				{collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
			</button>
			<nav className='space-y-1'>
				{items.map((item) => {
					const active = item.key === activeKey;
					return (
						<button
							key={item.key}
							type='button'
							onClick={() => onChange?.(item.key)}
							className={`flex w-full items-center gap-2 rounded px-2 py-2 text-sm ${active ? 'bg-[#E2E8F0] text-black' : 'text-[#475569] hover:bg-[#F8FAFC]'}`}>
							{item.icon}
							{!collapsed && <span>{item.label}</span>}
						</button>
					);
				})}
			</nav>
		</aside>
	);
};

export const defaultSidebarItems: SidebarItem[] = [
	{ key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
	{ key: 'customers', label: 'Customers', icon: <Users size={16} /> },
	{ key: 'invoices', label: 'Invoices', icon: <Receipt size={16} /> },
];

export default SidebarNav;
