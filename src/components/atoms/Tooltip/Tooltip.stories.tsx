import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button/Button';
import Tooltip from './Tooltip';

const meta = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	args: {
		content: 'Billing cycle starts on the 1st of each month.',
		delayDuration: 250,
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='outline'>Hover me</Button>
		</Tooltip>
	),
};

export const Delay500ms: Story = {
	args: { delayDuration: 500, content: 'This tooltip is intentionally delayed.' },
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='secondary'>Hover with delay</Button>
		</Tooltip>
	),
};
