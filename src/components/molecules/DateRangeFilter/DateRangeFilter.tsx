import DateRangePicker from '@/components/atoms/DateRangePicker';

interface DateRangeFilterProps {
	startDate?: Date;
	endDate?: Date;
	onChange: (value: { startDate?: Date; endDate?: Date }) => void;
}

/**
 * Analytics filter wrapper around date range picker.
 */
const DateRangeFilter = ({ startDate, endDate, onChange }: DateRangeFilterProps) => {
	return (
		<DateRangePicker title='Date range' startDate={startDate} endDate={endDate} onChange={onChange} placeholder='Select analytics range' />
	);
};

export default DateRangeFilter;
