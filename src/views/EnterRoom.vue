<template>
	<div class="main_box">
		<div class="enter-room__container">
			<h1 class="enter-room__head">Enter chat room</h1>
			<label for="chat">Enter Room Name:</label>
			<div class="enter-room__submit">
				<input v-model="lobbyName" id="chat" type="text" class="enter-room__input" />
				<button @click="submit" class="enter-room__button">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lobbyName: ""
			};
		},
		methods: {
			submit() {
				console.log('aa')
				this.$store.dispatch("enterRoom", { lobbyName: this.lobbyName });
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main_box {
		width: 40rem;
		background: rgba(8, 42, 65, 0.637);
		border-radius: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.596);
	}
	.enter-room__container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding: 1rem 2rem;
	}

	.enter-room__head {
		font-weight: 100;
		border-bottom: 0.5px solid rgb(109, 136, 146);
		margin-bottom: 0.5rem;
	}

	.enter-room__input {
		border: 0.5px solid rgb(109, 136, 146);
		background: rgb(157, 184, 194);
		width: 20rem;
		height: 2rem;
		align-items: center;
		font: inherit;
		margin-right: 1rem;
		padding: 0.5rem;
	}
	.enter-room__input:focus {
		outline: none;
	}

	.enter-room__button {
		padding: 0.5rem 1rem;
		background: #145c9e;
		border: 1px solid #145c9e;
		border-radius: 5px;
		cursor: pointer;
		font: inherit;
		color: rgb(131, 166, 175);
	}
	.enter-room__button:hover {
		color: rgb(131, 166, 175);
		background: #0f4679;
		border: 1px solid #0f4679;
	}

	.enter-room__button:focus {
		outline: none;
	}
	.enter-room__submit {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 800px) {
		.main_box {
			max-width: 30rem;
		}
		.enter-room__container {
			flex-wrap: nowrap;
		}
	}
</style>
