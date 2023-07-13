<script lang="ts">
	import 'uno.css';
	import 'water.css/out/dark.css';
</script>

<div class="h-full bg-gray-8">
	<slot />
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
		max-width: revert;
	}
</style>
