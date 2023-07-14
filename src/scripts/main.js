import gsap from "gsap/dist/gsap.min"
import Canvas from './webgl/Canvas';
import Loader from './ui/Loader';

window.gsap = gsap

window.addEventListener('DOMContentLoaded', () => {
	new Loader();
	new Canvas()
});