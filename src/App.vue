<template>
	<div id="app">
		<Header @slide="followUp" :show="show" />
		<transition name="fade">
			<div v-if="show" class="backdrop" @click="show=!show"></div>
		</transition>

		<transition name="slide">
			<SideBar v-if="show" @close="closeSideBar" />
		</transition>
		<transition>
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import Header from "./components/Header";
	import SideBar from "./components/SideBar";

	export default {
		components: {
			Header,
			SideBar
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			followUp() {
				this.show = !this.show;
			},
			closeSideBar() {
				this.show = false;
			}
		}
	};
</script>

<style>
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
			"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
		background-color: #2c3e50;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	.slide-enter-active {
		animation: slide-in 0.3s ease-out forwards;
	}
	.slide-leave-active {
		animation: slide-out 0.3s ease-out forwards;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateX(-20vw);
		}

		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slide-out {
		from {
			opacity: 1;
			transform: translateX(0);
		}

		to {
			opacity: 0;
			transform: translateX(-20vw);
		}
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 5;
	}

	::placeholder{
		color: rgba(30, 37, 44, 0.74);
		font-size: 12px;
	}
</style>
