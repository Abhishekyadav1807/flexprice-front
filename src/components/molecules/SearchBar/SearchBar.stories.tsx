import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import SearchBar from './SearchBar';

const meta = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	args: {
		placeholder: 'Search customer by name',
		debounceMs: 300,
	},
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InteractiveInputAndClear: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Search customer by name');
		await userEvent.type(input, 'Acme');
		await expect(input).toHaveValue('Acme');
		await userEvent.click(canvas.getByRole('button', { name: /clear/i }));
		await expect(input).toHaveValue('');
	},
};
