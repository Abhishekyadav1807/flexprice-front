import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import Input from './Input';

const meta = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		label: 'Amount',
		placeholder: 'Enter amount',
	},
	argTypes: {
		variant: { control: 'select', options: ['text', 'number', 'formatted-number', 'integer'] },
		disabled: { control: 'boolean' },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const CurrencyPrefixExample = () => {
	const [value, setValue] = useState('1200');
	return (
		<div className='w-[320px]'>
			<Input label='MRR' variant='formatted-number' value={value} onChange={setValue} inputPrefix='$' />
		</div>
	);
};

export const Default: Story = {};
export const Number: Story = { args: { label: 'Seats', variant: 'number', placeholder: '10' } };
export const WithError: Story = { args: { label: 'Email', error: 'Email is required' } };
export const WithCurrencyPrefix: Story = {
	render: () => <CurrencyPrefixExample />,
};

export const InteractiveTyping: Story = {
	render: () => <Input label='Customer name' placeholder='Type here' />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here');
		await userEvent.type(input, 'Acme Inc');
		await expect(input).toHaveValue('Acme Inc');
	},
};
