<script lang="ts">
	let {
		children,
		variant = 'primary',
		href = undefined,
		type = 'button',
		onclick = undefined
	} = $props<{
		children: any;
		variant?: 'primary' | 'secondary' | 'danger';
		href?: string;
		type?: 'button' | 'submit';
		onclick?: () => void;
	}>();
</script>

{#if href}
	<a {href} class="btn btn-{variant}">
		{@render children()}
	</a>
{:else}
	<button {type} {onclick} class="btn btn-{variant}">
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-block;
		padding: 0.5rem 1rem;
		border: 1px solid #555;
		border-radius: 8px;
		text-decoration: none;
		cursor: pointer;
		font-size: 0.95rem;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #555;
		color: white;
		border-color: #555;
	}

	.btn-primary:hover {
		background: #666;
		border-color: #666;
	}

	.btn-secondary {
		background: #fafafa;
		color: #666;
		border-color: #e5e5e5;
	}

	.btn-secondary:hover {
		background: #f0f0f0;
	}

	.btn-danger {
		background: #d32f2f;
		color: white;
		border-color: #d32f2f;
	}

	.btn-danger:hover {
		background: #b71c1c;
		border-color: #b71c1c;
	}
</style>
