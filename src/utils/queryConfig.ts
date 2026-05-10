import type { QueryClientConfig } from '@tanstack/react-query';

export const QUERY_PRESETS = {
	REALTIME: { staleTime: 0, gcTime: 10 * 60 * 1000 },
	DEFAULT: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
	STATIC: { staleTime: 30 * 60 * 1000, gcTime: 10 * 60 * 1000 },
} as const;

export interface QueryConfig {
	staleTime?: number;
	gcTime?: number;
}

export const GLOBAL_QUERY_DEFAULTS: Required<QueryConfig> = {
	staleTime: QUERY_PRESETS.DEFAULT.staleTime,
	gcTime: QUERY_PRESETS.DEFAULT.gcTime,
};

/**
 * Creates a query configuration with stable global defaults and per-call overrides.
 */
export const createQueryConfig = (overrides: QueryConfig = {}): Required<QueryConfig> => ({
	staleTime: overrides.staleTime ?? GLOBAL_QUERY_DEFAULTS.staleTime,
	gcTime: overrides.gcTime ?? GLOBAL_QUERY_DEFAULTS.gcTime,
});

/**
 * Creates QueryClient defaults with FlexPrice cache behavior.
 */
export const createQueryClientConfig = (overrides: QueryConfig = {}): QueryClientConfig => ({
	defaultOptions: {
		queries: createQueryConfig(overrides),
	},
});
