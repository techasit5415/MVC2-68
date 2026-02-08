<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>การร้องเรียนทั้งหมด - ระบบติดตามการร้องเรียน</title>
</svelte:head>

<h2>การร้องเรียนทั้งหมด</h2>
<p class="subtitle">แสดงการร้องเรียนทั้งหมด เรียงตามวันที่ร้องเรียน</p>

<div class="complaints-list">
	{#each data.complaints as complaint}
		<Card>
			<div class="complaint-header">
				<div>
					<h3>#{complaint.complaint_id} - {complaint.problem_type}</h3>
					<p class="meta">
						{complaint.stall_name} ({complaint.canteen_name})
						• {new Date(complaint.complaint_date).toLocaleDateString('th-TH')}
					</p>
				</div>
				<Badge variant={complaint.status === 'รอตรวจสอบ' ? 'pending' : 'completed'}>
					{complaint.status}
				</Badge>
			</div>
			<p class="details">{complaint.details}</p>
			<Button href="/complaints/{complaint.complaint_id}" variant="secondary">
				ดูรายละเอียด
			</Button>
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
		margin: 0 0 1.5rem 0;
	}

	.complaints-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.complaint-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.meta {
		margin: 0;
		color: #666;
		font-size: 0.9rem;
	}

	.details {
		margin: 0 0 1rem 0;
		color: #555;
	}
</style>
