import Progress from '@/components/atoms/Progress';

/**
 * Props for usage progress display.
 */
interface UsageBarProps {
	used: number;
	entitled: number;
	unit?: string;
}

/**
 * Displays usage consumption against entitlement as a labeled progress bar.
 */
const UsageBar = ({ used, entitled, unit = 'units' }: UsageBarProps) => {
	const safeEntitled = Math.max(entitled, 1);
	const percentage = Math.min(100, (used / safeEntitled) * 100);
	return (
		<div className='space-y-2'>
			<div className='flex items-center justify-between text-sm'>
				<span className='text-muted-foreground'>Usage</span>
				<span className='font-medium'>
					{used.toLocaleString()} / {entitled.toLocaleString()} {unit}
				</span>
			</div>
			<Progress value={percentage} indicatorColor='bg-[#092E44]' backgroundColor='bg-[#E5E7EB]' />
		</div>
	);
};

export default UsageBar;
