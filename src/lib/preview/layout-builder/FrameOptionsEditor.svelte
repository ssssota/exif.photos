<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface $$Events {
		change: { align: 'left' | 'center' | 'right' };
	}

	const dispatch = createEventDispatcher<$$Events>();
	let align: 'left' | 'center' | 'right' = 'center';
	const alignOptions = ['left', 'center', 'right'];
	$: dispatch('change', { align });
</script>

<label>
	Align:
	<select bind:value={align}>
		{#each alignOptions as option (option)}
			<option value={option}>{option}</option>
		{/each}
	</select>
</label>
