import type { PageServerLoad } from './$types';
import { healthCheckRegistry, summarizeHealth } from '$lib/health-check';

export const load: PageServerLoad = async () => {
	return summarizeHealth(healthCheckRegistry.getSnapshots());
};
