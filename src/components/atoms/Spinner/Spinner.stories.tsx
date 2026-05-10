import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
	title: 'Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	args: {
		size: 24,
		className: 'text-[#092E44]',
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 40 } };
