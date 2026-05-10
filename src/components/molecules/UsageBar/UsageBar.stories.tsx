import type { Meta, StoryObj } from '@storybook/react';
import UsageBar from './UsageBar';

const meta = {
	title: 'Molecules/UsageBar',
	component: UsageBar,
	tags: ['autodocs'],
	args: {
		used: 6400,
		entitled: 10000,
		unit: 'API calls',
	},
} satisfies Meta<typeof UsageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NearLimit: Story = { args: { used: 9400 } };
export const OverLimit: Story = { args: { used: 12000 } };
