import * as THREE from 'three';

export default class Renderer {
  constructor() {
    this.$webgl = document.querySelector('[data-webgl]');
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.$webgl.appendChild(this.renderer.domElement);
  }
}