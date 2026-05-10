import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Button from './Button';

const meta = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Save changes',
		onClick: fn(),
	},
	argTypes: {
		variant: { control: 'select', options: ['default', 'secondary', 'ghost', 'destructive'] },
		size: { control: 'select', options: ['sm', 'default', 'lg'] },
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'destructive' } };
export const Loading: Story = { args: { isLoading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const InteractiveClick: Story = {
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /save changes/i });
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
