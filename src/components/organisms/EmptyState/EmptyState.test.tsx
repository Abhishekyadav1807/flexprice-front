import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
	it('renders content and handles CTA click', async () => {
		const onCtaClick = vi.fn();
		render(<EmptyState headline='No data' subtext='Add your first record' ctaLabel='Create record' onCtaClick={onCtaClick} />);
		expect(screen.getByText('No data')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: /create record/i }));
		expect(onCtaClick).toHaveBeenCalled();
	});
});
