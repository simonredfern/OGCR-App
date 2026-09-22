<script lang="ts">
	// Token values below mirror ../../ogcr-design-system-reference.css, which
	// is pinned to @majistudio/ogcr-design-system 1.1.0 (upstream commit
	// e947133). Update both together — see ../../../design_system_integration.md.
	const skeletonScales = [
		{ name: 'primary', label: 'Primary (OGCR Blue)' },
		{ name: 'secondary', label: 'Secondary (OGCR Green)' },
		{ name: 'tertiary', label: 'Tertiary (Dark Teal)' },
		{ name: 'success', label: 'Success' },
		{ name: 'warning', label: 'Warning' },
		{ name: 'error', label: 'Error' },
		{ name: 'surface', label: 'Surface (warm grays)' }
	];
	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	const dsTextTokens = [
		{ name: '--text-primary', value: '#0f3655' },
		{ name: '--text-secondary', value: '#6a8196' },
		{ name: '--text-neutral', value: '#334155' },
		{ name: '--text-positive', value: '#4f8263' },
		{ name: '--text-negative', value: '#b91c1c' },
		{ name: '--text-warning', value: '#c2410c' },
		{ name: '--text-progress', value: '#265277' }
	];

	const dsSurfaceTokens = [
		{ name: '--surface-page', value: '#f8f3ef' },
		{ name: '--surface-light', value: '#ffffff' },
		{ name: '--surface-neutral', value: '#f5f5f4' },
		{ name: '--surface-strong', value: '#0f3655' },
		{ name: '--surface-inverted', value: '#443321' },
		{ name: '--surface-positive', value: '#e2efe6' },
		{ name: '--surface-warning', value: '#ffedd5' },
		{ name: '--surface-negative', value: '#fee2e2' },
		{ name: '--surface-progress', value: '#e2edf6' }
	];

	const dsBorderTokens = [
		{ name: '--border-light', value: '#e7e5e4' },
		{ name: '--border-medium', value: '#d6d3d1' },
		{ name: '--border-strong', value: '#a8a29e' },
		{ name: '--border-default', value: '#01012e14' },
		{ name: '--border-high-contrast', value: '#443321' },
		{ name: '--border-positive-light', value: '#c5dfce' },
		{ name: '--border-warning-light', value: '#fed7aa' },
		{ name: '--border-negative-light', value: '#fecaca' },
		{ name: '--border-negative-strong', value: '#dc2626' },
		{ name: '--border-neutral-strong', value: '#57534e' },
		{ name: '--border-positive-strong', value: '#5e9975' },
		{ name: '--border-warning-strong', value: '#ea580c' }
	];

	const dsInteractionTokens = [
		{ name: '--interaction-primary-default', value: '#4f8263' },
		{ name: '--interaction-primary-hover', value: '#335641' },
		{ name: '--interaction-primary-active', value: '#335641' },
		{ name: '--interaction-primary-focus', value: '#e2efe6' },
		{ name: '--interaction-secondary-default', value: '#ffffff' },
		{ name: '--interaction-secondary-hover', value: '#1c3d59' },
		{ name: '--interaction-secondary-active', value: '#1c3d59' },
		{ name: '--interaction-secondary-focus', value: '#c3daed' },
		{ name: '--interaction-tertiary-active', value: '#e2efe6' },
		{ name: '--focus-ring-error (deprecated)', value: '#fecaca' }
	];

	const spacing = [
		{ name: '--space-2xs', size: '4px' },
		{ name: '--space-xs', size: '8px' },
		{ name: '--space-s', size: '12px' },
		{ name: '--space-m', size: '16px' },
		{ name: '--space-l', size: '24px' },
		{ name: '--space-xl', size: '32px' },
		{ name: '--space-3xl', size: '64px' }
	];

	const radii = [
		{ name: '--radius-xs', size: '2px' },
		{ name: '--radius-s', size: '4px' },
		{ name: '--radius-m', size: '8px' },
		{ name: '--radius-l', size: '12px' },
		{ name: '--radius-xl', size: '16px' },
		{ name: '--radius-full', size: '9999px' }
	];

	const fontSizes = [
		{ name: '--font-size-xs', size: '10px' },
		{ name: '--font-size-s', size: '14px' },
		{ name: '--font-size-m', size: '18px' },
		{ name: '--font-size-l', size: '20px' },
		{ name: '--font-size-xl', size: '24px' },
		{ name: '--font-size-2xl', size: '32px' },
		{ name: '--font-size-3xl', size: '40px' },
		{ name: '--font-size-4xl', size: '48px' },
		{ name: '--font-size-5xl', size: '64px' }
	];
</script>

<svelte:head>
	<title>Design system — OGCR</title>
</svelte:head>

<div class="design-page mx-auto max-w-6xl px-6 py-10 space-y-12">
	<header class="space-y-2">
		<h1 class="text-h1" style="color: var(--text-primary);">OGCR Design System</h1>
		<p class="text-body" style="color: var(--text-neutral);">
			Live reference of the tokens defined in <code>src/ogcr-theme.css</code>.
			Mirrors <a class="anchor" href="https://www.figma.com/file/2P6XrQJhT8I39IR5LGK7RT/" target="_blank" rel="noreferrer">OGCR Design System</a>
			(Figma) and the verbatim copy in <code>src/ogcr-design-system-reference.css</code>.
		</p>
	</header>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Brand</h2>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div class="rounded-lg overflow-hidden border border-surface-200-800">
				<div style="background: var(--brand-blue-300); height: 96px;"></div>
				<div class="p-3 bg-surface-50-950">
					<div class="text-h4">Brand blue 300</div>
					<code class="text-body-s">#3f88c6 · --brand-blue-300</code>
				</div>
			</div>
			<div class="rounded-lg overflow-hidden border border-surface-200-800">
				<div style="background: var(--brand-blue-800); height: 96px;"></div>
				<div class="p-3 bg-surface-50-950">
					<div class="text-h4">Brand blue 800</div>
					<code class="text-body-s">#1c3d59 · --brand-blue-800</code>
				</div>
			</div>
			<div class="rounded-lg overflow-hidden border border-surface-200-800">
				<div style="background: var(--brand-green-500); height: 96px;"></div>
				<div class="p-3 bg-surface-50-950">
					<div class="text-h4">Brand green 500</div>
					<code class="text-body-s">#6db087 · --brand-green-500</code>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Typography</h2>
		<div class="space-y-3 rounded-lg border border-surface-200-800 p-6 bg-surface-50-950">
			<div class="text-h1">text-h1 — The quick brown fox</div>
			<div class="text-h2">text-h2 — The quick brown fox</div>
			<div class="text-h3">text-h3 — The quick brown fox</div>
			<div class="text-h4">text-h4 — The quick brown fox</div>
			<div class="text-body">text-body — The quick brown fox jumps over the lazy dog.</div>
			<div class="text-body-s">text-body-s — The quick brown fox jumps over the lazy dog.</div>
			<div class="text-label-button">text-label-button</div>
			<div class="text-label-input">text-label-input</div>
		</div>

		<h3 class="text-h3" style="color: var(--text-primary);">Font sizes</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
			{#each fontSizes as fs}
				<div class="flex items-baseline gap-3 p-3 rounded border border-surface-200-800 bg-surface-50-950">
					<span style="font-size: {fs.size}; line-height: 1;">Aa</span>
					<code class="text-body-s">{fs.name} · {fs.size}</code>
				</div>
			{/each}
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Colour scales (Skeleton)</h2>
		<p class="text-body-s" style="color: var(--text-secondary);">
			These are the scales available via Tailwind/Skeleton classes
			(<code>bg-primary-500</code>, <code>text-surface-700</code>, …). Anchored to the design system tokens.
		</p>
		{#each skeletonScales as scale}
			<div class="space-y-1">
				<div class="text-h4">{scale.label}</div>
				<div class="grid grid-cols-11 gap-1">
					{#each shades as shade}
						<div class="rounded text-center text-xs p-2 border border-surface-200-800"
							 style="background: var(--color-{scale.name}-{shade}); color: var(--color-{scale.name}-contrast-{shade});">
							{shade}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Named tokens</h2>

		<h3 class="text-h3" style="color: var(--text-primary);">Text</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{#each dsTextTokens as t}
				<div class="rounded border border-surface-200-800 p-4 bg-surface-50-950">
					<div class="text-h4" style="color: {t.value};">Sample text</div>
					<code class="text-body-s">{t.name} · {t.value}</code>
				</div>
			{/each}
		</div>

		<h3 class="text-h3" style="color: var(--text-primary);">Surface</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
			{#each dsSurfaceTokens as t}
				<div class="rounded overflow-hidden border border-surface-200-800">
					<div style="background: {t.value}; height: 64px;"></div>
					<div class="p-3 bg-surface-50-950">
						<code class="text-body-s">{t.name}</code>
						<div class="text-body-s" style="color: var(--text-secondary);">{t.value}</div>
					</div>
				</div>
			{/each}
		</div>

		<h3 class="text-h3" style="color: var(--text-primary);">Border</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{#each dsBorderTokens as t}
				<div class="rounded p-4 bg-surface-50-950" style="border: 2px solid {t.value};">
					<code class="text-body-s">{t.name}</code>
					<div class="text-body-s" style="color: var(--text-secondary);">{t.value}</div>
				</div>
			{/each}
		</div>

		<h3 class="text-h3" style="color: var(--text-primary);">Interaction</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{#each dsInteractionTokens as t}
				<div class="rounded overflow-hidden border border-surface-200-800">
					<div style="background: {t.value}; height: 48px;"></div>
					<div class="p-3 bg-surface-50-950">
						<code class="text-body-s">{t.name}</code>
						<div class="text-body-s" style="color: var(--text-secondary);">{t.value}</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Spacing</h2>
		<div class="space-y-2">
			{#each spacing as sp}
				<div class="flex items-center gap-4">
					<code class="text-body-s w-32 shrink-0">{sp.name}</code>
					<div style="background: var(--brand-blue-800); height: 16px; width: {sp.size};"></div>
					<span class="text-body-s" style="color: var(--text-secondary);">{sp.size}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Radius</h2>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
			{#each radii as r}
				<div class="text-center space-y-2">
					<div style="background: var(--brand-blue-800); height: 80px; border-radius: {r.size};"></div>
					<code class="text-body-s">{r.name}</code>
					<div class="text-body-s" style="color: var(--text-secondary);">{r.size}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Elevation</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
			<div class="rounded-lg p-6 bg-surface-50-950" style="box-shadow: var(--elevation-l);">
				<div class="text-h4">Elevation L</div>
				<code class="text-body-s">--elevation-l</code>
			</div>
			<div class="rounded-lg border border-surface-200-800 p-6 bg-surface-50-950">
				<div class="text-h4">No elevation</div>
				<code class="text-body-s">(border only)</code>
			</div>
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Buttons (Skeleton)</h2>
		<div class="flex flex-wrap gap-3 p-6 rounded-lg border border-surface-200-800 bg-surface-50-950">
			<button type="button" class="btn preset-filled-primary-500">Primary</button>
			<button type="button" class="btn preset-filled-secondary-500">Secondary</button>
			<button type="button" class="btn preset-filled-tertiary-500">Tertiary</button>
			<button type="button" class="btn preset-filled-success-500">Success</button>
			<button type="button" class="btn preset-filled-warning-500">Warning</button>
			<button type="button" class="btn preset-filled-error-500">Error</button>
		</div>
		<div class="flex flex-wrap gap-3 p-6 rounded-lg border border-surface-200-800 bg-surface-50-950">
			<button type="button" class="btn preset-outlined-primary-500">Primary</button>
			<button type="button" class="btn preset-outlined-secondary-500">Secondary</button>
			<button type="button" class="btn preset-outlined-tertiary-500">Tertiary</button>
			<button type="button" class="btn preset-outlined-success-500">Success</button>
			<button type="button" class="btn preset-outlined-warning-500">Warning</button>
			<button type="button" class="btn preset-outlined-error-500">Error</button>
		</div>
		<div class="flex flex-wrap gap-3 p-6 rounded-lg border border-surface-200-800 bg-surface-50-950">
			<button type="button" class="btn btn-sm preset-filled-primary-500">Small</button>
			<button type="button" class="btn preset-filled-primary-500">Default</button>
			<button type="button" class="btn btn-lg preset-filled-primary-500">Large</button>
			<button type="button" class="btn preset-filled-primary-500" disabled>Disabled</button>
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Form elements</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg border border-surface-200-800 bg-surface-50-950">
			<label class="space-y-1">
				<span class="text-label-input block">Text input</span>
				<input class="input" type="text" placeholder="Enter text…" />
			</label>
			<label class="space-y-1">
				<span class="text-label-input block">Email</span>
				<input class="input" type="email" placeholder="user@example.com" />
			</label>
			<label class="space-y-1">
				<span class="text-label-input block">Select</span>
				<select class="select">
					<option>Option A</option>
					<option>Option B</option>
				</select>
			</label>
			<label class="space-y-1">
				<span class="text-label-input block">Textarea</span>
				<textarea class="textarea" rows="3" placeholder="Multi-line…"></textarea>
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" class="checkbox" checked />
				<span class="text-body-s">Checkbox (checked)</span>
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" class="checkbox" />
				<span class="text-body-s">Checkbox (unchecked)</span>
			</label>
			<label class="flex items-center gap-2">
				<input type="radio" name="demo-radio" class="radio" checked />
				<span class="text-body-s">Radio A</span>
			</label>
			<label class="flex items-center gap-2">
				<input type="radio" name="demo-radio" class="radio" />
				<span class="text-body-s">Radio B</span>
			</label>
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Cards</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="card p-6 bg-surface-50-950 border border-surface-200-800 rounded-lg">
				<h3 class="text-h4">Default card</h3>
				<p class="text-body-s mt-2" style="color: var(--text-secondary);">Surface 50, light border, radius L.</p>
			</div>
			<div class="card p-6 rounded-lg" style="background: var(--surface-positive); border: 1px solid var(--border-positive-light);">
				<h3 class="text-h4" style="color: var(--text-positive);">Positive</h3>
				<p class="text-body-s mt-2" style="color: var(--text-positive);">surface-positive + border-positive-light.</p>
			</div>
			<div class="card p-6 rounded-lg" style="background: var(--surface-warning); border: 1px solid var(--border-warning-light);">
				<h3 class="text-h4" style="color: var(--text-warning);">Warning</h3>
				<p class="text-body-s mt-2" style="color: var(--text-warning);">surface-warning + border-warning-light.</p>
			</div>
			<div class="card p-6 rounded-lg" style="background: var(--surface-negative); border: 1px solid var(--border-negative-light);">
				<h3 class="text-h4" style="color: var(--text-negative);">Negative</h3>
				<p class="text-body-s mt-2" style="color: var(--text-negative);">surface-negative + border-negative-light.</p>
			</div>
			<div class="card p-6 rounded-lg" style="background: var(--surface-strong); color: white;">
				<h3 class="text-h4" style="color: white;">Strong</h3>
				<p class="text-body-s mt-2" style="color: rgba(255,255,255,0.8);">surface-strong (used for hero panels).</p>
			</div>
			<div class="card p-6 rounded-lg" style="background: var(--surface-inverted); color: white;">
				<h3 class="text-h4" style="color: white;">Inverted</h3>
				<p class="text-body-s mt-2" style="color: rgba(255,255,255,0.8);">surface-inverted (warm dark).</p>
			</div>
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Pills / badges</h2>
		<div class="flex flex-wrap gap-2 p-6 rounded-lg border border-surface-200-800 bg-surface-50-950">
			<span class="badge preset-filled-primary-500">Primary</span>
			<span class="badge preset-filled-secondary-500">Secondary</span>
			<span class="badge preset-filled-tertiary-500">Tertiary</span>
			<span class="badge preset-filled-success-500">Success</span>
			<span class="badge preset-filled-warning-500">Warning</span>
			<span class="badge preset-filled-error-500">Error</span>
		</div>
	</section>

	<!-- ============================================================ -->
	<section class="space-y-4">
		<h2 class="text-h2" style="color: var(--text-primary);">Motion</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div class="rounded p-4 border border-surface-200-800 bg-surface-50-950">
				<code class="text-body-s">--motion-fast</code>
				<div class="text-body-s" style="color: var(--text-secondary);">150ms ease-out</div>
			</div>
			<div class="rounded p-4 border border-surface-200-800 bg-surface-50-950">
				<code class="text-body-s">--motion-base</code>
				<div class="text-body-s" style="color: var(--text-secondary);">200ms cubic-bezier(0.2, 0, 0, 1)</div>
			</div>
		</div>
	</section>
</div>
