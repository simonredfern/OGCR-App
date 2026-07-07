import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { obp_requests } from '$lib/obp/requests';
import { OBPRequestError } from '$lib/obp/errors';

// Backs MissingRoleAlert.svelte's "Request role" button (see PageRoleCheck.svelte / the
// SITE_MAP in $lib/server/roleChecker.ts). Thin proxy so the browser never needs the
// access token directly.
export const POST: RequestHandler = async ({ request, locals }) => {
	const session = locals.session;
	const accessToken = session.data.oauth?.access_token;

	if (!accessToken) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const body = await request.json();
	const roleName = typeof body?.role_name === 'string' ? body.role_name : '';
	const bankId = typeof body?.bank_id === 'string' ? body.bank_id : '';

	if (!roleName) {
		return json({ error: 'role_name is required' }, { status: 400 });
	}

	try {
		const response = await obp_requests.post(
			'/obp/v6.0.0/entitlement-requests',
			{ role_name: roleName, bank_id: bankId },
			accessToken
		);
		return json(response);
	} catch (error) {
		if (error instanceof OBPRequestError) {
			return json({ error: error.message }, { status: Number(error.code) || 500 });
		}
		const message = error instanceof Error ? error.message : 'Unknown error';
		return json({ error: message }, { status: 500 });
	}
};
