<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>สร้างการร้องเรียนใหม่</title>
</svelte:head>

<Button href="/" variant="secondary">← กลับ</Button>

<h2>สร้างการร้องเรียนใหม่</h2>

<Card>
	<form method="POST">
		<div class="form-group">
			<label for="stall_id">ร้านอาหาร *</label>
			<select id="stall_id" name="stall_id" required>
				<option value="">-- เลือกร้านอาหาร --</option>
				{#each data.stalls as stall}
					<option value={stall.stall_id}>
						{stall.name} ({stall.canteen_name})
					</option>
				{/each}
			</select>
		</div>

		<div class="form-group">
			<label for="problem_type">ประเภทปัญหา *</label>
			<select id="problem_type" name="problem_type" required>
				<option value="">-- เลือกประเภทปัญหา --</option>
				<option value="รสชาติ">รสชาติ</option>
				<option value="สุขอนามัย">สุขอนามัย</option>
				<option value="คุณภาพ">คุณภาพ</option>
				<option value="ปริมาณ">ปริมาณ</option>
				<option value="ราคา">ราคา</option>
				<option value="บริการ">บริการ</option>
				<option value="อื่นๆ">อื่นๆ</option>
			</select>
		</div>

		<div class="form-group">
			<label for="details">รายละเอียดการร้องเรียน *</label>
			<textarea
				id="details"
				name="details"
				rows="6"
				required
				placeholder="กรุณาระบุรายละเอียดการร้องเรียน..."
			></textarea>
		</div>

		{#if form?.error}
			<div class="error-message">
				{form.error}
			</div>
		{/if}

		<div class="form-actions">
			<Button type="submit" variant="primary">ส่งการร้องเรียน</Button>
			<Button href="/" variant="secondary">ยกเลิก</Button>
		</div>
	</form>
</Card>

<style>
	h2 {
		margin: 1.5rem 0 1rem 0;
		font-size: 1.5rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	select,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d5d5d5;
		border-radius: 8px;
		font-family: inherit;
		font-size: 1rem;
		background: #fafafa;
	}

	select:focus,
	textarea:focus {
		outline: none;
		border-color: #999;
		background: white;
	}

	textarea {
		resize: vertical;
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
</style>
