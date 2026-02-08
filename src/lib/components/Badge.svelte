<script lang="ts">
	let { children, variant = 'default' } = $props<{
		children: any;
		variant?: 'default' | 'pending' | 'completed';
	}>();
</script>

<span class="badge badge-{variant}">
	{@render children()}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.badge-default {
		background: #f0f0f0;
		color: #666;
		border: 1px solid #d0d0d0;
	}

	.badge-pending {
		background: #fff9e6;
		color: #997404;
		border: 1px solid #ffd966;
	}

	.badge-completed {
		background: #e8f5e9;
		color: #2e7d32;
		border: 1px solid #81c784;
	}
</style>
