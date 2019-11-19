<template>
	<div ref="header" class="header">
		<div class="header__brand">
			<h1 class="header__title">
				<router-link to="/">VueChat</router-link>
			</h1>
			<p @click="slide" v-if="isAuth" class="header__list--item brand" :class="{'activeRooms': show}">View Rooms</p>
		</div>
		<div>
			<ul class="header__list">
				<router-link
					v-if="isAuth"
					tag="li"
					to="/create-room"
					active-class="active"
					class="header__list--item"
				>Create Room</router-link>
				<router-link
					v-if="isAuth"
					tag="li"
					to="/enter-room"
					active-class="active"
					class="header__list--item"
				>Enter Room</router-link>
				<router-link
					v-if="!isAuth"
					tag="li"
					to="/sign-in"
					active-class="active"
					class="header__list--item"
				>Signin</router-link>
				<router-link
					v-if="!isAuth"
					tag="li"
					to="/sign-up"
					active-class="active"
					class="header__list--item"
				>SignUp</router-link>
				<li v-if="isAuth" active-class="active" class="header__list--item" @click="logout">Logout</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		props: ["show"],
		computed: {
			...mapState(["isAuth"])
		},
		methods: {
			logout() {
				this.$store.dispatch("logout");
			},
			slide() {
				this.$emit("slide");
			}
		}
	};
</script>

<style scoped>
	.header {
		background: rgb(8, 42, 65);
		padding: 2rem;
		display: flex;
		color: rgb(55, 116, 156);
		justify-content: space-between;
		align-items: center;
		z-index: 100;
		position: relative;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.596);
	}
	.header__brand {
		display: flex;
		align-items: center;
	}
	.header__title {
		cursor: pointer;
	}
	.activeRooms {
		background-color: rgb(55, 116, 156);
		color: rgb(8, 42, 65);
	}
	.header__title:hover {
		color: rgb(121, 186, 230);
	}
	.header__title a {
		text-decoration: none;
		color: inherit;
	}
	.header__list {
		list-style: none;
		display: flex;
		justify-content: center;
	}
	.header__list--item {
		margin-right: 0.5rem;
		cursor: pointer;
		padding: 0.5rem 1rem;
	}
	.header__list--item:hover,
	.header__list--item:active,
	.header__list--item.active {
		background-color: rgb(55, 116, 156);
		color: rgb(8, 42, 65);
	}
	.header__list--item.brand {
		margin-left: 2rem;
	}
</style>