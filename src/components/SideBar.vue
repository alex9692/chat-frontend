<template>
	<div class="sidebar">
		<h2 class="sidebar__title">List of Rooms:</h2>

		<ul class="sidebar__list">
			<li
				class="sidebar__items"
				v-for="lobby in lobbies"
				:key="lobby._id"
				@click="showAlert(lobby._id)"
			>
				<div>
					<span style="cursor:default">{{lobby.lobbyName}}</span>
					<p
						v-if="showTip && selectedLobby===lobby._id"
						class="tooltip"
					>You need to be logged in to continue.</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				showTip: false,
				selectedLobby: ""
			};
		},
		methods: {
			showAlert(lobbyId) {
				if (!this.isAuth) {
					if (this.showTip) {
						return;
					}
					this.showTip = true;
					this.selectedLobby = lobbyId;
					setTimeout(() => {
						this.showTip = false;
						this.selectedLobby = "";
					}, 5000);
				}
			}
		},
		computed: {
			...mapState(["lobbies", "isAuth"])
		},
		created() {
			this.$store.dispatch("getLobbyList");
		}
	};
</script>

<style scoped>
	.sidebar {
		font: inherit;
		position: absolute;
		height: 88vh;
		width: 25rem;
		z-index: 100;
		background: rgba(87, 114, 122, 0.726);
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.596);
		display: flex;
		flex-flow: column;
		padding: 0.5rem 1rem;
	}

	.sidebar__title {
		padding: 0.5rem 1rem;
		color: rgb(8, 42, 65);
		font-size: 2.8rem;
		border-bottom: 1px solid rgb(8, 42, 65);
		cursor: default;
	}
	.sidebar__list {
		padding: 0 1rem;
		list-style: none;
	}

	.sidebar__items {
		font-size: 2.2rem;
		margin: 0.8rem 0;
		padding: 0 0.5rem;
		color: rgb(32, 57, 73);
		padding: 0.2 1rem;
	}
	.sidebar__items a {
		cursor: pointer;
	}
	.sidebar__items:hover {
		color: rgb(135, 162, 180);
		background: rgb(55, 116, 156);
	}
	.tooltip {
		font-size: 0.8rem;
		padding: 0.3rem;
		border-radius: 6px;
		position: absolute;
		background: rgba(8, 42, 65, 0.616);
		color: #fff;
		left: 2rem;
		top: 5rem;
	}
</style>