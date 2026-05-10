import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import DataTable, { type DataColumn } from './DataTable';
import { useFilterStore } from '@/hooks/useFilterStore';

type InvoiceRow = {
	id: string;
	customer: string;
	status: 'paid' | 'draft' | 'void';
	amount: number;
};

const baseRows: InvoiceRow[] = [
	{ id: 'INV-001', customer: 'Acme Inc', status: 'paid', amount: 1200 },
	{ id: 'INV-002', customer: 'Globex', status: 'draft', amount: 850 },
	{ id: 'INV-003', customer: 'Initech', status: 'void', amount: 300 },
];

const columns: DataColumn<InvoiceRow>[] = [
	{ key: 'id', header: 'Invoice', sortable: true },
	{ key: 'customer', header: 'Customer', sortable: true },
	{ key: 'status', header: 'Status', sortable: true },
	{ key: 'amount', header: 'Amount', sortable: true, render: (row) => `$${row.amount.toFixed(2)}` },
];

const meta = {
	title: 'Molecules/DataTable',
	component: DataTable<InvoiceRow>,
	tags: ['autodocs'],
} satisfies Meta<typeof DataTable<InvoiceRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

const FilterStoreExample = () => {
	const [page, setPage] = useState(1);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortBy, setSortBy] = useState<keyof InvoiceRow>('id');
	const { setRouteKey, setFilter, getFilters, resetFilters } = useFilterStore();

	useEffect(() => {
		setRouteKey('invoices');
	}, [setRouteKey]);

	const filters = getFilters();
	const status = (filters.status as string) || 'all';
	const filteredData = status === 'all' ? baseRows : baseRows.filter((r) => r.status === status);

	return (
		<div className='space-y-3'>
			<div className='flex gap-2'>
				<button className='rounded border px-2 py-1 text-sm' onClick={() => setFilter('status', 'all')}>
					All
				</button>
				<button className='rounded border px-2 py-1 text-sm' onClick={() => setFilter('status', 'paid')}>
					Paid
				</button>
				<button className='rounded border px-2 py-1 text-sm' onClick={() => setFilter('status', 'draft')}>
					Draft
				</button>
				<button className='rounded border px-2 py-1 text-sm' onClick={() => resetFilters()}>
					Reset filters
				</button>
			</div>
			<DataTable
				data={filteredData}
				columns={columns}
				page={page}
				onPageChange={setPage}
				totalCount={filteredData.length}
				sortBy={sortBy}
				sortDirection={sortDirection}
				onSortChange={(nextSortBy, nextDirection) => {
					setSortBy(nextSortBy);
					setSortDirection(nextDirection);
				}}
			/>
		</div>
	);
};

const VirtualizedExample = () => {
	const rows: InvoiceRow[] = Array.from({ length: 10000 }, (_, index) => ({
		id: `INV-${index + 1}`,
		customer: `Customer ${index + 1}`,
		status: index % 3 === 0 ? 'paid' : index % 3 === 1 ? 'draft' : 'void',
		amount: 100 + (index % 5000),
	}));
	return <DataTable data={rows} columns={columns} virtualized maxBodyHeight={500} />;
};

export const Default: Story = {
	render: () => <DataTable data={baseRows} columns={columns} totalCount={3} />,
};

export const Loading: Story = {
	render: () => <DataTable data={[]} columns={columns} loading />,
};

export const EmptyState: Story = {
	render: () => <DataTable data={[]} columns={columns} emptyMessage='No invoices yet' />,
};

export const WithFilterStore: Story = {
	render: () => <FilterStoreExample />,
};

export const Virtualized10000Rows: Story = {
	render: () => <VirtualizedExample />,
};
