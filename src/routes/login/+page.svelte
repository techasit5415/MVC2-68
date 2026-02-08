<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>เข้าสู่ระบบ - ระบบติดตามการร้องเรียน</title>
</svelte:head>

<div class="login-container">
	<Card>
		<h2>เข้าสู่ระบบ</h2>
		<p class="subtitle">ระบบติดตามการร้องเรียนคุณภาพอาหาร</p>

		<form method="POST">
			<div class="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					placeholder="กรุณากรอก username"
					autocomplete="username"
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					placeholder="กรุณากรอก password"
					autocomplete="current-password"
				/>
			</div>

			{#if form?.error}
				<div class="error-message">
					{form.error}
				</div>
			{/if}

			<Button type="submit" variant="primary">เข้าสู่ระบบ</Button>
		</form>

		<div class="demo-accounts">
			<h3>บัญชีทดสอบ:</h3>
			<div class="account-list">
				<div class="account-item">
					<strong>Admin:</strong>
					<span>username: <code>admin</code> / password: <code>admin123</code></span>
				</div>
				<div class="account-item">
					<strong>User:</strong>
					<span>username: <code>user1</code> / password: <code>user123</code></span>
				</div>
			</div>
		</div>
	</Card>
</div>

<style>
	.login-container {
		max-width: 450px;
		margin: 2rem auto;
		padding: 1rem;
	}

	h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.8rem;
		text-align: center;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin: 0 0 2rem 0;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d5d5d5;
		border-radius: 8px;
		font-size: 1rem;
		font-family: inherit;
		background: #fafafa;
	}

	input:focus {
		outline: none;
		border-color: #999;
		background: white;
	}

	.error-message {
		background: #fff5f5;
		color: #d32f2f;
		padding: 0.75rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		border: 1px solid #ffcdd2;
		text-align: center;
	}

	.demo-accounts {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #eee;
	}

	.demo-accounts h3 {
		margin: 0 0 1rem 0;
		font-size: 1rem;
		color: #666;
	}

	.account-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.account-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem;
		background: #fafafa;
		border-radius: 8px;
		font-size: 0.9rem;
	}

	.account-item strong {
		color: #333;
	}

	.account-item code {
		background: #fff;
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		border: 1px solid #d5d5d5;
		font-family: 'Courier New', monospace;
		font-size: 0.85rem;
		color: #666;
	}
</style>
