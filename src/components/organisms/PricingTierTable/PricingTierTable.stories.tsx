import type { Meta, StoryObj } from '@storybook/react';
import PricingTierTable from './PricingTierTable';

const meta = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	args: {
		currency: '$',
		model: 'tiered',
		tiers: [
			{ from: 0, to: 1000, unitPrice: 0.12 },
			{ from: 1001, to: 5000, unitPrice: 0.09 },
			{ from: 5001, to: 'infinity', unitPrice: 0.07 },
		],
	},
} satisfies Meta<typeof PricingTierTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Graduated: Story = { args: { model: 'graduated' } };
