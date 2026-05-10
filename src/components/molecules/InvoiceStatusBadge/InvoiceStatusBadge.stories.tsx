import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge';

const meta = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	args: { status: 'paid' },
	argTypes: { status: { control: 'select', options: ['paid', 'draft', 'void'] } },
} satisfies Meta<typeof InvoiceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllStatuses: Story = {
	render: () => (
		<div className='flex gap-2'>
			<InvoiceStatusBadge status='paid' />
			<InvoiceStatusBadge status='draft' />
			<InvoiceStatusBadge status='void' />
		</div>
	),
};
