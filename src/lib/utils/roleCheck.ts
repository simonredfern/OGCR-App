// Pure, environment-agnostic role comparison. No `$env` imports here so this file can be
// used from both server (+layout.server.ts) and universal (+layout.svelte) code — the
// SITE_MAP itself (which needs the private OBP_ENTITY_PREFIX) lives server-side only,
// in `$lib/server/roleChecker.ts`.

export interface RoleRequirement {
	role: string;
	bankId?: string;
}

export interface PageRoleConfig {
	required: RoleRequirement[];
	optional?: RoleRequirement[];
	/** How `required` entries combine. Defaults to "OR" (any one of them is enough). */
	requirementType?: 'OR' | 'AND';
}

export interface UserEntitlement {
	entitlement_id: string;
	role_name: string;
	bank_id: string;
}

export interface RoleCheckResult {
	hasAllRoles: boolean;
	missingRoles: RoleRequirement[];
	hasRoles: RoleRequirement[];
}

function userHasRole(entitlements: UserEntitlement[], requirement: RoleRequirement): boolean {
	return entitlements.some(
		(e) =>
			e.role_name === requirement.role &&
			(requirement.bankId === undefined || e.bank_id === requirement.bankId)
	);
}

export function checkRoles(
	required: RoleRequirement[],
	entitlements: UserEntitlement[],
	requirementType: 'OR' | 'AND' = 'OR'
): RoleCheckResult {
	const hasRoles = required.filter((r) => userHasRole(entitlements, r));
	const missingRoles = required.filter((r) => !userHasRole(entitlements, r));

	const hasAllRoles =
		required.length === 0 || (requirementType === 'AND' ? missingRoles.length === 0 : hasRoles.length > 0);

	return { hasAllRoles, missingRoles, hasRoles };
}
