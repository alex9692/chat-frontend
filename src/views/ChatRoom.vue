<template>
	<div v-if="user" class="chat-body">
		<h4 class="chat-body__lobbyname">Lobby: {{selectedLobby.lobbyName}}</h4>
		<p class="chat-body__username">#{{user.username}}</p>
		<input type="text" class="chat-body__input" v-model="message" />

		<p class="chat-body__username">#Messages</p>
		<div class="chat-body__messages-container">
			<ul class="chat-body__messages-list" v-for="message in messages" :key="message._id">
				<li class="chat-body__messages-item">
					<p>{{message.user.username}}: {{message.message}}</p>
					<p>
						Posted At: {{new Date(message.createdAt).toLocaleDateString()}},
						<span
							style="fontSize:12px;"
						>{{new Date(message.createdAt).toLocaleTimeString()}}</span>
					</p>
				</li>
			</ul>
		</div>
		<button @click="submit" :disabled="!message.trim().length>0" class="chat-body__button">Submit</button>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				message: ""
			};
		},
		computed: {
			...mapState(["messages", "selectedLobby", "user", "socket"])
		},
		methods: {
			submit() {
				this.$store.dispatch("submitMessage", { message: this.message });
			}
		},
		created() {
			this.$store.dispatch("getUser");
			this.$store.dispatch("getMessages");
			this.socket.on("get-new-message", data => {
				if (data.message.lobby._id === this.selectedLobby._id) {
					this.$store.dispatch("pushMessage", data.message);
				}
			});
		}
	};
</script>

<style scoped>
	.chat-body {
		height: 80vh;
		width: 70vw;
		margin: 1rem auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		background: rgb(178, 208, 218);
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.596);
	}
	.chat-body__lobbyname {
		margin: 0 auto;
		color: rgb(8, 42, 65);
		font-size: 2rem;
		font-weight: 200;
	}
	.chat-body__input {
		border: 0.5px solid rgb(109, 136, 146);
		background: rgb(157, 184, 194);
		width: 100%;
		height: 2rem;
		align-items: center;
		font: inherit;
		margin-right: 1rem;
		padding: 0.5rem;
	}

	.chat-body__messages-container {
		height: 98%;
		width: 100%;
		margin: 0 auto;
		background: rgb(109, 136, 146);
		overflow-y: scroll;
	}

	.chat-body__messages-item {
		padding: 1rem 1rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgb(8, 42, 65);
	}

	.chat-body__button {
		padding: 0.5rem 1rem;
		margin-top: 1.5rem;
		background: rgb(109, 136, 146);
		border: 1px solid rgb(109, 136, 146);
		border-radius: 5px;
		cursor: pointer;
		font: inherit;
		color: rgb(46, 58, 61);
	}
	.chat-body__button:hover {
		color: rgb(154, 178, 185);
		background: rgb(66, 104, 119);
		border: 1px solid rgb(66, 104, 119);
	}
</style>