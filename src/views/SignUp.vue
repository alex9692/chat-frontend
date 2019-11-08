<template>
	<div class="main_box">
		<div class="sign-up__container">
			<h1 class="signin__head">Sign up</h1>
			<div class="sign-up__details">
				<label for="name">Enter User name:</label>
				<input
					v-model="username"
					ref="usernameCheck"
					@blur="checkUsername"
					id="name"
					type="text"
					class="sign-up__input"
					placeholder="enter your username"
				/>
				<label for="password">Enter User password:</label>
				<input
					v-model="password"
					ref="passwordCheck"
					@blur="checkPassword"
					id="password"
					type="password"
					class="sign-up__input"
					placeholder="enter your password"
				/>
			</div>
			<button :disabled="!allowSubmit" @click="submit" class="sign-up__button">Submit</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: ""
			};
		},
		computed: {
			allowSubmit() {
				return (
					this.username &&
					this.password &&
					this.username.trim().length > 3 &&
					this.password.trim().length > 4
				);
			}
		},
		methods: {
			checkUsername(e) {
				if (this.username.trim().length <= 3) {
					e.target.classList.add("invalid");
				}
			},
			checkPassword(e) {
				if (this.password.trim().length <= 4) {
					e.target.classList.add("invalid");
				}
			},
			submit() {
				this.$store.dispatch("register", {
					username: this.username,
					password: this.password
				});
			}
		},
		watch: {
			username(val) {
				if (val.trim().length > 3) {
					this.$refs.usernameCheck.classList.remove("invalid");
				}
			},
			password(val) {
				if (val.trim().length > 4) {
					this.$refs.passwordCheck.classList.remove("invalid");
				}
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
	.sign-up__container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding: 1rem 2rem;
	}

	.signin__head {
		font-weight: 100;
		border-bottom: 0.5px solid rgb(109, 136, 146);
		margin-bottom: 0.5rem;
	}

	.sign-up__input {
		border: 0.5px solid rgb(109, 136, 146);
		background: rgb(157, 184, 194);
		width: 20rem;
		height: 2rem;
		align-items: center;
		font: inherit;
		margin-right: 1rem;
		padding: 0.5rem;
		border-radius: 5px;
	}
	.sign-up__input:focus {
		outline: none;
	}

	.sign-up__button {
		padding: 0.5rem 1rem;
		margin-top: 1rem;
		background: rgb(109, 136, 146);
		border: 1px solid rgb(109, 136, 146);
		border-radius: 5px;
		cursor: pointer;
		font: inherit;
		color: rgb(46, 58, 61);
	}
	.sign-up__button:hover {
		color: rgb(154, 178, 185);
		background: rgb(66, 104, 119);
		border: 1px solid rgb(66, 104, 119);
	}
	.sign-up__button:disabled {
		cursor: not-allowed;
		background: rgb(153, 164, 168);
		border: 1px solid rgb(153, 164, 168);
	}
	.sign-up__button:disabled:hover {
		background: rgb(153, 164, 168);
		border: 1px solid rgb(153, 164, 168);
		color: rgb(46, 58, 61);
		cursor: not-allowed;
	}
	.sign-up__details {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.sign-up__input.invalid {
		border: 1px solid rgb(121, 9, 9);
		background: rgb(153, 65, 65);
	}
</style>