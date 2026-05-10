import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UsageBar from './UsageBar';

describe('UsageBar', () => {
	it('renders usage and entitlement text', () => {
		render(<UsageBar used={200} entitled={1000} unit='events' />);
		expect(screen.getByText(/200 \/ 1,000 events/i)).toBeInTheDocument();
	});
});
