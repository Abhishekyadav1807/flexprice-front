import { describe, expect, it } from 'vitest';
import { calculateTierPrice, formatCurrency, mapInvoiceStatusLabel } from './assignmentUtils';

describe('assignment utility functions', () => {
	it('formats currency values', () => {
		expect(formatCurrency(123.4)).toBe('$123.40');
		expect(formatCurrency(99, 'EUR ')).toBe('EUR 99.00');
	});

	it('maps invoice status labels', () => {
		expect(mapInvoiceStatusLabel('paid')).toBe('Paid');
		expect(mapInvoiceStatusLabel('draft')).toBe('Draft');
		expect(mapInvoiceStatusLabel('void')).toBe('Void');
	});

	it('calculates tier price correctly', () => {
		const tiers = [
			{ from: 0, to: 100, unitPrice: 1 },
			{ from: 101, to: 200, unitPrice: 0.8 },
			{ from: 201, to: 'infinity' as const, unitPrice: 0.5 },
		];
		expect(calculateTierPrice(50, tiers)).toBe(50);
		expect(calculateTierPrice(150, tiers)).toBe(140.2);
	});
});
