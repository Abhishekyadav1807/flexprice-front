import { describe, expect, it } from 'vitest';
import { createQueryClientConfig, createQueryConfig, GLOBAL_QUERY_DEFAULTS, QUERY_PRESETS } from './queryConfig';

describe('createQueryConfig', () => {
	it('uses global defaults by default', () => {
		expect(createQueryConfig()).toEqual(GLOBAL_QUERY_DEFAULTS);
	});

	it('allows per-call staleTime override', () => {
		const config = createQueryConfig({ staleTime: QUERY_PRESETS.REALTIME.staleTime });
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(GLOBAL_QUERY_DEFAULTS.gcTime);
	});

	it('supports static preset values', () => {
		const config = createQueryConfig(QUERY_PRESETS.STATIC);
		expect(config.staleTime).toBe(30 * 60 * 1000);
	});

	it('creates QueryClient defaults from utility config', () => {
		const clientConfig = createQueryClientConfig(QUERY_PRESETS.REALTIME);
		expect(clientConfig.defaultOptions?.queries?.staleTime).toBe(0);
		expect(clientConfig.defaultOptions?.queries?.gcTime).toBe(10 * 60 * 1000);
	});
});
