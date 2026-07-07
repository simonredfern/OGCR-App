<script lang="ts">
	import type { Snippet } from 'svelte';
	import { checkRoles, type PageRoleConfig, type UserEntitlement } from '$lib/utils/roleCheck';
	import MissingRoleAlert from './MissingRoleAlert.svelte';

	interface Props {
		pageRoles: PageRoleConfig | undefined;
		userEntitlements: UserEntitlement[];
		children?: Snippet;
	}

	let { pageRoles, userEntitlements, children }: Props = $props();

	let result = $derived(
		pageRoles
			? checkRoles(pageRoles.required, userEntitlements, pageRoles.requirementType ?? 'OR')
			: undefined
	);
</script>

{#if pageRoles && result && !result.hasAllRoles}
	<div class="container mx-auto p-4">
		<MissingRoleAlert missing={result.missingRoles} />
	</div>
{:else if children}
	{@render children()}
{/if}
