export const formatCurrency = (amount: number, currencySymbol = '$') => `${currencySymbol}${amount.toFixed(2)}`;

export const mapInvoiceStatusLabel = (status: 'paid' | 'draft' | 'void') => {
	const mapping = {
		paid: 'Paid',
		draft: 'Draft',
		void: 'Void',
	} as const;
	return mapping[status];
};

type Tier = { from: number; to: number | 'infinity'; unitPrice: number };

export const calculateTierPrice = (quantity: number, tiers: Tier[]) => {
	let remaining = quantity;
	let total = 0;
	for (const tier of tiers) {
		if (remaining <= 0) break;
		const tierLimit = tier.to === 'infinity' ? remaining : Math.max(0, tier.to - tier.from + 1);
		const consumed = Math.min(remaining, tierLimit);
		total += consumed * tier.unitPrice;
		remaining -= consumed;
	}
	return Number(total.toFixed(2));
};
