<script lang="ts">
	import MissingRoleAlert from '$lib/components/MissingRoleAlert.svelte';

	interface Props {
		error: string;
		title?: string;
	}

	let { error, title = 'Error' }: Props = $props();

	let missingRoles = $derived(() => {
		if (!error) return null;
		
		// Look for standard missing entitlement errors
		// e.g. "OBP-20000: Missing Entitlement: CanGetMigrations"
		// or "OBP-10007: Incorrect Role name: CanGetDynamicEntity_activity. Possible roles..."
		const match = error.match(/(?:Missing Entitlement|Incorrect Role name):\s*([a-zA-Z0-9_]+(?:,\s*[a-zA-Z0-9_]+)*)/i);
		if (match && match[1]) {
			return match[1].split(',').map((r: string) => ({ role: r.trim() }));
		}
		
		return null;
	});
</script>

{#if missingRoles()}
	<MissingRoleAlert missing={missingRoles() ?? []} />
{:else}
	<div class="card p-4 preset-filled-error-500-400">
		<h3 class="font-bold mb-2">{title}</h3>
		<pre class="bg-surface-200-800 p-4 rounded overflow-auto text-sm whitespace-pre-wrap">{error}</pre>
	</div>
{/if}
