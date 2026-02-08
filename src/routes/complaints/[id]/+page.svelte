<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>รายละเอียดการร้องเรียน #{data.complaint.complaint_id}</title>
</svelte:head>

<div class="header-actions">
	<Button href="/" variant="secondary">← กลับ</Button>
	{#if data.user?.role === 'admin'}
		<Button href="/complaints/{data.complaint.complaint_id}/respond" variant="primary">
			ตอบกลับ
		</Button>
	{/if}
</div>

<h2>รายละเอียดการร้องเรียน #{data.complaint.complaint_id}</h2>

<Card>
	<div class="detail-row">
		<strong>ร้านอาหาร:</strong>
		<span>{data.complaint.stall_name}</span>
	</div>
	<div class="detail-row">
		<strong>โรงอาหาร:</strong>
		<span>{data.complaint.canteen_name}</span>
	</div>
	<div class="detail-row">
		<strong>วันที่ร้องเรียน:</strong>
		<span>{new Date(data.complaint.complaint_date).toLocaleDateString('th-TH')}</span>
	</div>
	<div class="detail-row">
		<strong>ประเภทปัญหา:</strong>
		<span>{data.complaint.problem_type}</span>
	</div>
	<div class="detail-row">
		<strong>สถานะ:</strong>
		<Badge variant={data.complaint.status === 'รอตรวจสอบ' ? 'pending' : 'completed'}>
			{data.complaint.status}
		</Badge>
	</div>
	<div class="detail-section">
		<strong>รายละเอียด:</strong>
		<p>{data.complaint.details}</p>
	</div>
</Card>

{#if data.responses.length > 0}
	<h3>การตอบกลับ ({data.responses.length})</h3>
	{#each data.responses as response}
		<Card>
			<div class="response-date">
				{new Date(response.response_date).toLocaleDateString('th-TH', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				})}
			</div>
			<p class="response-message">{response.response_message}</p>
		</Card>
	{/each}
{:else}
	<Card>
		<p class="no-responses">ยังไม่มีการตอบกลับ</p>
	</Card>
{/if}

<style>
	h2 {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
	}

	h3 {
		margin: 2rem 0 1rem 0;
		font-size: 1.3rem;
	}

	.header-actions {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.detail-row {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.75rem;
		align-items: center;
	}

	.detail-row strong {
		min-width: 120px;
		color: #666;
	}

	.detail-section {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #eee;
	}

	.detail-section p {
		margin: 0.5rem 0 0 0;
	}

	.response-date {
		color: #666;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.response-message {
		margin: 0;
		line-height: 1.6;
	}

	.no-responses {
		margin: 0;
		color: #999;
		text-align: center;
	}
</style>
