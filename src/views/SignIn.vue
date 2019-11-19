<template>
	<div ref="main_box" class="main_box">
		<div class="sign-in__container">
			<h1 class="signin__head">Sign in</h1>
			<div class="sign-in__details">
				<label for="name">Enter User name:</label>
				<input
					v-model="username"
					id="name"
					type="text"
					class="sign-in__input"
					ref="usernameCheck"
					@blur="checkUsername"
					placeholder="username must be atleast 4 characters long"
				/>
				<label for="password">Enter User password:</label>
				<input
					v-model="password"
					id="password"
					type="password"
					class="sign-in__input"
					ref="passwordCheck"
					@blur="checkPassword"
					placeholder="password must be atleast 8 characters long"
				/>
				<label for="confirm-password">Confirm User password:</label>
				<input
					v-model="confirmPassword"
					id="confirm-password"
					type="password"
					class="sign-in__input"
					ref="confirmPasswordCheck"
					@blur="checkConfirmPassword"
					placeholder="enter confirmation password"
				/>
			</div>
			<div v-if="error" class="error">{{error.message}}</div>
			<button :disabled="!allowSubmit" class="sign-in__button" @click="submit">Submit</button>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				username: "",
				password: "",
				confirmPassword: ""
			};
		},
		computed: {
			...mapState(["error"]),
			allowSubmit() {
				return (
					this.username &&
					this.password &&
					this.username.trim().length > 3 &&
					this.password.trim().length > 4 &&
					this.password === this.confirmPassword
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
			checkConfirmPassword(e) {
				if (this.confirmPassword !== this.password) {
					e.target.classList.add("invalid");
				}
			},
			submit() {
				this.$store.dispatch("signin", {
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
			},
			confirmPassword(val) {
				if (val === this.password) {
					this.$refs.confirmPasswordCheck.classList.remove("invalid");
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
	.sign-in__container {
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

	.sign-in__input {
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
	.sign-in__input:focus {
		outline: none;
	}

	.sign-in__button {
		padding: 0.5rem 1rem;
		margin-top: 1rem;
		background: rgb(109, 136, 146);
		border: 1px solid rgb(109, 136, 146);
		border-radius: 5px;
		cursor: pointer;
		font: inherit;
		color: rgb(46, 58, 61);
	}
	.sign-in__button:disabled {
		cursor: not-allowed;
		background: rgb(153, 164, 168);
		border: 1px solid rgb(153, 164, 168);
	}
	.sign-in__button:disabled:hover {
		background: rgb(153, 164, 168);
		border: 1px solid rgb(153, 164, 168);
		color: rgb(46, 58, 61);
		cursor: not-allowed;
	}
	.sign-in__button:hover {
		color: rgb(154, 178, 185);
		background: rgb(66, 104, 119);
		border: 1px solid rgb(66, 104, 119);
	}

	.sign-in__details {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.sign-in__input.invalid {
		border: 1px solid rgb(121, 9, 9);
		background: rgb(153, 65, 65);
	}
	.error {
		color: rgb(153, 65, 65);
		margin: 0 auto;
		margin-top: 0.4rem;
	}
</style>
