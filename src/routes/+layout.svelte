<script lang="ts">
	let { children, data } = $props();
</script>

<div class="container">
	<header>
		<div class="header-content">
			<div>
				<h1>ระบบติดตามการร้องเรียนคุณภาพอาหาร</h1>
				<nav>
					<a href="/">การร้องเรียนทั้งหมด</a>
					<a href="/stalls">ร้านอาหาร</a>
					{#if data.user}
						{#if data.user.role === 'user'}
							<a href="/complaints/new">สร้างการร้องเรียน</a>
						{/if}
					{/if}
				</nav>
			</div>
			<div class="user-section">
				{#if data.user}
					<div class="user-info">
						<span class="user-name">{data.user.full_name}</span>
						<span class="user-role" class:admin={data.user.role === 'admin'}>
							{data.user.role === 'admin' ? 'ผู้ดูแล' : 'ผู้ใช้'}
						</span>
					</div>
					<form method="POST" action="/logout">
						<button type="submit" class="logout-btn">ออกจากระบบ</button>
					</form>
				{:else}
					<a href="/login" class="login-link">เข้าสู่ระบบ</a>
				{/if}
			</div>
		</div>
	</header>

	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Noto Sans Thai', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
		background: #fafafa;
		color: #555;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	header {
		background: white;
		border: 1px solid #e0e0e0;
		border-radius: 16px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}

	h1 {
		margin: 0 0 1rem 0;
		font-size: 1.8rem;
		font-weight: 600;
	}

	nav {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	nav a {
		color: #666;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border: 1px solid #d5d5d5;
		border-radius: 8px;
		transition: all 0.2s;
	}

	nav a:hover {
		background: #fafafa;
		color: #333;
	}

	.user-section {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
		min-width: 180px;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}

	.user-name {
		font-weight: 600;
		color: #333;
	}

	.user-role {
		font-size: 0.85rem;
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		background: #f5f5f5;
		color: #888;
		border: 1px solid #d5d5d5;
	}

	.user-role.admin {
		background: #fff9e6;
		color: #997404;
		border-color: #ffe699;
	}

	.logout-btn {
		padding: 0.4rem 1rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background: #fafafa;
		color: #888;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
	}

	.logout-btn:hover {
		background: #f0f0f0;
		color: #666;
	}

	.login-link {
		padding: 0.5rem 1rem;
		border: 1px solid #555;
		border-radius: 8px;
		background: #555;
		color: white;
		text-decoration: none;
		transition: background 0.2s;
	}

	.login-link:hover {
		background: #666;
	}

	main {
		min-height: 60vh;
	}
</style>
