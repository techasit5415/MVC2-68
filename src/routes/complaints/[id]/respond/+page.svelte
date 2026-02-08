<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>ตอบกลับการร้องเรียน #{data.complaint.complaint_id}</title>
</svelte:head>

<Button href="/complaints/{data.complaint.complaint_id}" variant="secondary">
	← กลับ
</Button>

<h2>ตอบกลับการร้องเรียน</h2>

<Card>
	<div class="complaint-summary">
		<h3>#{data.complaint.complaint_id} - {data.complaint.problem_type}</h3>
		<div class="detail-row">
			<strong>ร้านอาหาร:</strong>
			<span>{data.complaint.stall_name}</span>
		</div>
		<div class="detail-row">
			<strong>รายละเอียด:</strong>
			<span>{data.complaint.details}</span>
		</div>
		<div class="detail-row">
			<strong>สถานะปัจจุบัน:</strong>
			<Badge variant={data.complaint.status === 'รอตรวจสอบ' ? 'pending' : 'completed'}>
				{data.complaint.status}
			</Badge>
		</div>
	</div>
</Card>

<Card>
	<form method="POST">
		<div class="form-group">
			<label for="response_message">ข้อความตอบกลับ</label>
			<textarea
				id="response_message"
				name="response_message"
				rows="6"
				required
				placeholder="กรุณากรอกข้อความตอบกลับ..."
			></textarea>
		</div>

		{#if form?.error}
			<div class="error-message">
				{form.error}
			</div>
		{/if}

		<div class="form-actions">
			<Button type="submit" variant="primary">ส่งการตอบกลับ</Button>
			<Button href="/complaints/{data.complaint.complaint_id}" variant="secondary">
				ยกเลิก
			</Button>
		</div>
	</form>
</Card>

<div class="info-box">
	<strong>หมายเหตุ:</strong> เมื่อส่งการตอบกลับแล้ว สถานะจะเปลี่ยนเป็น "ดำเนินการแล้ว" โดยอัตโนมัติ
</div>

<style>
	h2 {
		margin: 1.5rem 0 1rem 0;
		font-size: 1.5rem;
	}

	h3 {
		margin: 0 0 1rem 0;
		font-size: 1.2rem;
	}

	.complaint-summary {
		background: #f9f9f9;
		padding: 1rem;
		border-radius: 12px;
	}

	.detail-row {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.detail-row strong {
		min-width: 100px;
		color: #666;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d5d5d5;
		border-radius: 8px;
		font-family: inherit;
		font-size: 1rem;
		resize: vertical;
		background: #fafafa;
	}

	textarea:focus {
		outline: none;
		border-color: #999;
		background: white;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
	}

	.error-message {
		background: #fee;
		color: #c00;
		padding: 0.75rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		border: 1px solid #fcc;
	}

	.info-box {
		background: #f0f8ff;
		border: 1px solid #90caf9;
		padding: 1rem;
		border-radius: 8px;
		margin-top: 1rem;
	}
</style>
