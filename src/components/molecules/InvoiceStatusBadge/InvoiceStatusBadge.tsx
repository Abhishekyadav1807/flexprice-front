import Chip from '@/components/atoms/Chip';
import { CircleCheckBig, CircleDashed, CircleX } from 'lucide-react';
import type { ReactNode } from 'react';

type InvoiceStatus = 'paid' | 'draft' | 'void';

/**
 * Props for invoice status badge.
 */
interface InvoiceStatusBadgeProps {
	status: InvoiceStatus;
}

const statusConfig: Record<InvoiceStatus, { label: string; variant: 'success' | 'warning' | 'failed'; icon: ReactNode }> = {
	paid: { label: 'Paid', variant: 'success', icon: <CircleCheckBig size={14} /> },
	draft: { label: 'Draft', variant: 'warning', icon: <CircleDashed size={14} /> },
	void: { label: 'Void', variant: 'failed', icon: <CircleX size={14} /> },
};

/**
 * Invoice status badge with semantic colors and icons.
 */
const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => {
	const config = statusConfig[status];
	return <Chip label={config.label} variant={config.variant} icon={config.icon} />;
};

export default InvoiceStatusBadge;
