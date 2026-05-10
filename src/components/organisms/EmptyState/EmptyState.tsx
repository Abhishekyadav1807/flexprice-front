import Button from '@/components/atoms/Button/Button';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
	headline: string;
	subtext: string;
	ctaLabel?: string;
	onCtaClick?: () => void;
}

/**
 * Full-page empty state with icon, headline, supporting text, and CTA.
 */
const EmptyState = ({ headline, subtext, ctaLabel = 'Create', onCtaClick }: EmptyStateProps) => {
	return (
		<div className='flex min-h-[320px] flex-col items-center justify-center rounded-md border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-8 text-center'>
			<Inbox size={32} className='mb-3 text-[#64748B]' />
			<h3 className='text-lg font-semibold text-[#0F172A]'>{headline}</h3>
			<p className='mt-1 max-w-md text-sm text-[#64748B]'>{subtext}</p>
			<Button className='mt-4' onClick={onCtaClick}>
				{ctaLabel}
			</Button>
		</div>
	);
};

export default EmptyState;
