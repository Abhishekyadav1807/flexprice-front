import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EmptyState from './EmptyState';

const meta = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	args: {
		headline: 'No invoices yet',
		subtext: 'Create your first invoice to start tracking collections and billing activity.',
		ctaLabel: 'Create invoice',
		onCtaClick: fn(),
	},
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
