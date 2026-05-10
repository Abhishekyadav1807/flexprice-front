import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

const meta = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	args: {
		title: 'Monthly Recurring Revenue',
		value: 25430.66,
		currency: 'USD',
		showChangeIndicator: true,
		isNegative: false,
	},
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NegativeTrend: Story = { args: { isNegative: true } };
export const PercentageMode: Story = { args: { title: 'Churn rate', value: 3.2, isPercent: true, currency: undefined } };
