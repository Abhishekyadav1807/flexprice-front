import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import SearchableSelect from './SearchableSelect';

const options = [
	{ value: 'starter', label: 'Starter' },
	{ value: 'growth', label: 'Growth' },
	{ value: 'enterprise', label: 'Enterprise' },
];

const meta = {
	title: 'Atoms/Select',
	component: SearchableSelect,
	tags: ['autodocs'],
	args: {
		label: 'Plan',
		placeholder: 'Select a plan',
		options,
	},
} satisfies Meta<typeof SearchableSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveSelectExample = () => {
	const [value, setValue] = useState('');
	return <SearchableSelect label='Plan' options={options} value={value} onChange={setValue} />;
};

export const Default: Story = {};
export const WithSearch: Story = {
	args: { searchPlaceholder: 'Search plans...' },
};
export const Disabled: Story = {
	args: { disabled: true, value: 'growth' },
};
export const InteractiveSelect: Story = {
	render: () => <InteractiveSelectExample />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await userEvent.click(await canvas.findByText('Growth'));
		await expect(canvas.getByRole('button')).toHaveTextContent('Growth');
	},
};
