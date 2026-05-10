import { create } from 'zustand';

type FilterValue = string | number | boolean | null | undefined | string[] | number[] | Record<string, unknown>;

interface FilterState {
	routeKey: string;
	filters: Record<string, FilterValue>;
	setRouteKey: (routeKey: string) => void;
	setFilter: (key: string, value: FilterValue) => void;
	resetFilters: () => void;
	getFilters: () => Record<string, FilterValue>;
}

const storageKeyForRoute = (routeKey: string) => `filters:${routeKey}`;

const safeReadSessionFilters = (routeKey: string): Record<string, FilterValue> => {
	if (typeof window === 'undefined') {
		return {};
	}
	const raw = window.sessionStorage.getItem(storageKeyForRoute(routeKey));
	if (!raw) return {};
	try {
		return JSON.parse(raw) as Record<string, FilterValue>;
	} catch {
		return {};
	}
};

const safeWriteSessionFilters = (routeKey: string, filters: Record<string, FilterValue>) => {
	if (typeof window === 'undefined') return;
	window.sessionStorage.setItem(storageKeyForRoute(routeKey), JSON.stringify(filters));
};

const syncUrlFingerprint = (filters: Record<string, FilterValue>) => {
	if (typeof window === 'undefined') return;
	const params = new URLSearchParams(window.location.search);
	params.set('f', String(Object.keys(filters).length));
	const nextQuery = params.toString();
	const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}`;
	window.history.replaceState({}, '', nextUrl);
};

/**
 * Route-scoped filter persistence for table-like pages.
 * Persists filter object in sessionStorage and syncs only a shallow URL fingerprint.
 */
export const useFilterStore = create<FilterState>((set, get) => ({
	routeKey: 'global',
	filters: {},
	setRouteKey: (routeKey: string) => {
		const nextFilters = safeReadSessionFilters(routeKey);
		set({ routeKey, filters: nextFilters });
		syncUrlFingerprint(nextFilters);
	},
	setFilter: (key: string, value: FilterValue) => {
		const { routeKey, filters } = get();
		const nextFilters = { ...filters, [key]: value };
		set({ filters: nextFilters });
		safeWriteSessionFilters(routeKey, nextFilters);
		syncUrlFingerprint(nextFilters);
	},
	resetFilters: () => {
		const { routeKey } = get();
		set({ filters: {} });
		safeWriteSessionFilters(routeKey, {});
		syncUrlFingerprint({});
	},
	getFilters: () => get().filters,
}));
