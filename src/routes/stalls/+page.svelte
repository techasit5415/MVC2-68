<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>ร้านอาหาร - ระบบติดตามการร้องเรียน</title>
</svelte:head>

<h2>ร้านอาหาร</h2>
<p class="subtitle">แสดงร้านอาหารและจำนวนการร้องเรียนของแต่ละร้าน</p>

<div class="status-legend">
	<div class="legend-item">
		<Badge variant="completed">ไม่มีการร้องเรียน</Badge>
		<span>0 รายการ</span>
	</div>
	<div class="legend-item">
		<Badge variant="default">ปกติ</Badge>
		<span>1-3 รายการ</span>
	</div>
	<div class="legend-item">
		<Badge variant="pending">ต้องให้ความสนใจ</Badge>
		<span>มากกว่า 3 รายการ</span>
	</div>
</div>

<div class="stalls-grid">
	{#each data.stalls as stall}
		<Card>
			<h3>{stall.name}</h3>
			<p class="canteen-name">{stall.canteen_name}</p>
			<div class="complaint-count">
				<span class="count-number">{stall.complaint_count}</span>
				<span class="count-label">รายการร้องเรียน</span>
			</div>
			{#if stall.complaint_count > 3}
				<Badge variant="pending">ต้องให้ความสนใจ</Badge>
			{:else if stall.complaint_count === 0}
				<Badge variant="completed">ไม่มีการร้องเรียน</Badge>
			{:else}
				<Badge variant="default">ปกติ</Badge>
			{/if}
		</Card>
	{/each}
</div>

<style>
	h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
	}

	.subtitle {
		color: #666;
		margin: 0 0 1rem 0;
	}

	.status-legend {
		display: flex;
		gap: 1.5rem;
		padding: 1rem;
		background: #fafafa;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: #666;
	}

	.stalls-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.canteen-name {
		margin: 0 0 1rem 0;
		color: #666;
		font-size: 0.9rem;
	}

	.complaint-count {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.count-number {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
	}

	.count-label {
		color: #666;
		font-size: 0.9rem;
	}
</style>
