import * as THREE from 'three';
import gsap from "gsap/dist/gsap.min"
import Canvas from './webgl/Canvas';
import Loader from './ui/Loader';

window.gsap = gsap
window.THREE = THREE

window.addEventListener('DOMContentLoaded', () => {
  new Loader();
  new Canvas()
});