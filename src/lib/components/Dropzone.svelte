<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let multiple = false;
	export let accept: string | undefined = undefined;
	export let disabled = false;
	let ref: HTMLInputElement | null = null;

	type EventMap = {
		change: FileList;
	};
	const dispatch = createEventDispatcher<EventMap>();

	const onClickButton = () => {
		ref?.click();
	};
	const onDragenter = (e: DragEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const onDragover = (e: DragEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const onDrop = (e: DragEvent) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch('change', e.dataTransfer?.files ?? new FileList());
	};
	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			ref?.click();
		}
	};
	const onChange = (e: Event) => {
		if (!(e.target instanceof HTMLInputElement))
			throw new Error('e.target is not an HTMLInputElement');
		dispatch('change', e.target.files ?? new FileList());
	};
</script>

<div
	tabindex="0"
	role="button"
	on:click={onClickButton}
	on:dragenter={onDragenter}
	on:dragover={onDragover}
	on:drop={onDrop}
	on:keydown={onKeydown}
	{...$$restProps}
>
	<slot>
		<p>Select file</p>
	</slot>
	<input
		bind:this={ref}
		type="file"
		class="hidden"
		{multiple}
		{accept}
		{disabled}
		on:change={onChange}
	/>
</div>
