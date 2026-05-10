import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SidebarNav, { defaultSidebarItems } from './SidebarNav';

const meta = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarNavExample = () => {
	const [active, setActive] = useState('dashboard');
	return <SidebarNav items={defaultSidebarItems} activeKey={active} onChange={setActive} />;
};

export const Default: Story = {
	render: () => <SidebarNavExample />,
};
