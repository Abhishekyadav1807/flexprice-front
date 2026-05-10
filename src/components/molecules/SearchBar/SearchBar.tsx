import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button/Button';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
	placeholder?: string;
	debounceMs?: number;
	onSearch?: (value: string) => void;
}

/**
 * Debounced search input with clear action.
 */
const SearchBar = ({ placeholder = 'Search customers', debounceMs = 300, onSearch }: SearchBarProps) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			onSearch?.(value);
		}, debounceMs);
		return () => clearTimeout(timeout);
	}, [value, debounceMs, onSearch]);

	return (
		<div className='flex w-full max-w-lg items-end gap-2'>
			<div className='flex-1'>
				<Input
					label='Search'
					value={value}
					onChange={setValue}
					placeholder={placeholder}
					inputPrefix={<Search size={16} className='text-muted-foreground' />}
				/>
			</div>
			<Button variant='outline' type='button' onClick={() => setValue('')} prefixIcon={<X size={16} />}>
				Clear
			</Button>
		</div>
	);
};

export default SearchBar;
