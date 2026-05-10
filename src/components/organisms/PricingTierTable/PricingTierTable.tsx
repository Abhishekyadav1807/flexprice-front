interface PricingTier {
	from: number;
	to: number | 'infinity';
	unitPrice: number;
}

interface PricingTierTableProps {
	currency?: string;
	model?: 'tiered' | 'graduated';
	tiers: PricingTier[];
}

/**
 * Readable table for tiered or graduated pricing definition.
 */
const PricingTierTable = ({ currency = '$', model = 'tiered', tiers }: PricingTierTableProps) => {
	return (
		<div className='rounded-md border border-[#E2E8F0]'>
			<div className='border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm font-medium text-[#334155]'>
				{model === 'tiered' ? 'Tiered Pricing' : 'Graduated Pricing'}
			</div>
			<table className='w-full text-sm'>
				<thead>
					<tr className='text-left text-[#64748B]'>
						<th className='px-3 py-2 font-medium'>Range</th>
						<th className='px-3 py-2 font-medium'>Price / Unit</th>
					</tr>
				</thead>
				<tbody>
					{tiers.map((tier, index) => (
						<tr key={index} className='border-t border-[#E2E8F0]'>
							<td className='px-3 py-2'>
								{tier.from} - {tier.to === 'infinity' ? '∞' : tier.to}
							</td>
							<td className='px-3 py-2'>
								{currency}
								{tier.unitPrice.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PricingTierTable;
