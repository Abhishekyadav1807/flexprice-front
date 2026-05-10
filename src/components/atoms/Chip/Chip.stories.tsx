import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
	title: 'Atoms/StatusChip',
	component: Chip,
	tags: ['autodocs'],
	args: {
		label: 'Active',
		variant: 'success',
	},
	argTypes: {
		variant: { control: 'select', options: ['default', 'success', 'warning', 'failed', 'info'] },
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PlanStatuses: Story = {
	render: () => (
		<div className='flex gap-2'>
			<Chip label='Active' variant='success' />
			<Chip label='Archived' variant='default' />
		</div>
	),
};
export const InvoiceStatuses: Story = {
	render: () => (
		<div className='flex gap-2'>
			<Chip label='Paid' variant='success' />
			<Chip label='Draft' variant='warning' />
			<Chip label='Void' variant='failed' />
		</div>
	),
};
export const SubscriptionStatuses: Story = {
	render: () => (
		<div className='flex gap-2'>
			<Chip label='Trialing' variant='info' />
			<Chip label='Active' variant='success' />
			<Chip label='Cancelled' variant='failed' />
		</div>
	),
};
