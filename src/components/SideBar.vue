<template>
	<div class="sidebar">
		<h2 class="sidebar__title">List of Rooms:</h2>
		<ul class="sidebar__list">
			<li class="sidebar__items">test1</li>
			<li class="sidebar__items">test1</li>
			<li class="sidebar__items">test1</li>
			<li class="sidebar__items">test1</li>
		</ul>
	</div>
</template>

<style scoped>
	.sidebar {
		font: inherit;
		position: relative;
		height: 88vh;
		width: 25rem;
		z-index: 100;
		background: rgba(87, 114, 122, 0.726);
		display: flex;
		flex-flow: column;
		padding: 0.5rem 1rem;
	}

	.sidebar__title {
		padding: 0.5rem 1rem;
        border-bottom: 1px solid rgb(8, 42, 65);
        cursor: default;
	}
	.sidebar__list {
		padding: 0 1rem;
		list-style: none;
	}

	.sidebar__items {
        margin: 0.8rem 0;
        cursor: pointer;
        padding: 0 0.5rem;
		color: rgb(32, 57, 73);
		padding: 0.2 1rem;
	}
	.sidebar__items:hover {
		color: rgb(135, 162, 180);
		background: rgb(55, 116, 156);
	}
</style>