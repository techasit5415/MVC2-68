<script lang="ts">
	let { children, class: className = '' } = $props<{
		children: any;
		class?: string;
	}>();
</script>

<div class="card {className}">
	{@render children()}
</div>

<style>
	.card {
		background: #fafafa;
		border: 1px solid #e0e0e0;
		border-radius: 16px;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
