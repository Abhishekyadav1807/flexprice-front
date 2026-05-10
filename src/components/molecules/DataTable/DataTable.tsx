import { useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Button from '@/components/atoms/Button/Button';
import { ArrowDownUp } from 'lucide-react';

type SortDirection = 'asc' | 'desc';

export interface DataColumn<T> {
	key: keyof T;
	header: string;
	sortable?: boolean;
	render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
	data: T[];
	columns: DataColumn<T>[];
	loading?: boolean;
	emptyMessage?: string;
	page?: number;
	pageSize?: number;
	totalCount?: number;
	onPageChange?: (page: number) => void;
	sortBy?: keyof T;
	sortDirection?: SortDirection;
	onSortChange?: (sortBy: keyof T, direction: SortDirection) => void;
	virtualized?: boolean;
	maxBodyHeight?: number;
}

/**
 * Sortable data table with loading, empty state, pagination, and optional virtualization.
 */
const DataTable = <T extends Record<string, unknown>>({
	data,
	columns,
	loading = false,
	emptyMessage = 'No records found',
	page = 1,
	pageSize = 10,
	totalCount = 0,
	onPageChange,
	sortBy,
	sortDirection = 'asc',
	onSortChange,
	virtualized = false,
	maxBodyHeight = 420,
}: DataTableProps<T>) => {
	const parentRef = useRef<HTMLDivElement>(null);
	const sortedData = useMemo(() => data, [data]);

	const rowVirtualizer = useVirtualizer({
		count: virtualized ? sortedData.length : 0,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 44,
		overscan: 12,
	});

	const totalPages = Math.max(1, Math.ceil((totalCount || data.length) / pageSize));

	if (loading) {
		return (
			<div className='rounded-md border border-[#E2E8F0]'>
				<table className='w-full text-sm'>
					<thead className='bg-[#F8FAFC]'>
						<tr>
							{columns.map((col) => (
								<th key={String(col.key)} className='px-3 py-2 text-left font-medium text-[#475569]'>
									{col.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 6 }).map((_, rowIndex) => (
							<tr key={rowIndex} className='border-t border-[#E2E8F0]'>
								{columns.map((col) => (
									<td key={String(col.key)} className='px-3 py-2'>
										<div className='h-4 w-full animate-pulse rounded bg-[#E2E8F0]' />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div className='rounded-md border border-[#E2E8F0]'>
			<table className='w-full text-sm'>
				<thead className='bg-[#F8FAFC]'>
					<tr>
						{columns.map((col) => (
							<th key={String(col.key)} className='px-3 py-2 text-left font-medium text-[#475569]'>
								{col.sortable ? (
									<button
										type='button'
										className='inline-flex items-center gap-1 hover:text-black'
										onClick={() => {
											if (!onSortChange) return;
											const nextDirection: SortDirection = sortBy === col.key && sortDirection === 'asc' ? 'desc' : 'asc';
											onSortChange(col.key, nextDirection);
										}}>
										{col.header}
										<ArrowDownUp size={14} />
									</button>
								) : (
									col.header
								)}
							</th>
						))}
					</tr>
				</thead>
			</table>

			{sortedData.length === 0 ? (
				<div className='py-10 text-center text-sm text-muted-foreground'>{emptyMessage}</div>
			) : virtualized ? (
				<div ref={parentRef} style={{ height: maxBodyHeight, overflow: 'auto' }}>
					<div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const row = sortedData[virtualRow.index];
							return (
								<div
									key={virtualRow.key}
									data-index={virtualRow.index}
									ref={rowVirtualizer.measureElement}
									className='absolute left-0 top-0 flex w-full border-t border-[#E2E8F0] bg-white'
									style={{ transform: `translateY(${virtualRow.start}px)` }}>
									{columns.map((col) => (
										<div key={String(col.key)} className='flex-1 px-3 py-2'>
											{col.render ? col.render(row) : String(row[col.key] ?? '')}
										</div>
									))}
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<table className='w-full text-sm'>
					<tbody>
						{sortedData.map((row, idx) => (
							<tr key={idx} className='border-t border-[#E2E8F0]'>
								{columns.map((col) => (
									<td key={String(col.key)} className='px-3 py-2'>
										{col.render ? col.render(row) : String(row[col.key] ?? '')}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}

			<div className='flex items-center justify-between border-t border-[#E2E8F0] px-3 py-2'>
				<span className='text-xs text-muted-foreground'>
					Page {page} of {totalPages}
				</span>
				<div className='flex gap-2'>
					<Button variant='outline' size='sm' disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
						Previous
					</Button>
					<Button variant='outline' size='sm' disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
