import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';

const meta = {
	title: 'Molecules/DateRangeFilter',
	component: DateRangeFilter,
	tags: ['autodocs'],
} satisfies Meta<typeof DateRangeFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const DateRangeFilterExample = () => {
	const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});
	return <DateRangeFilter startDate={range.startDate} endDate={range.endDate} onChange={setRange} />;
};

export const Default: Story = {
	render: () => <DateRangeFilterExample />,
};
