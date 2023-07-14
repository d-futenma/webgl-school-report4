import * as THREE from 'three';

export default class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.z = 4.5; // // 16:9
    this.camera.position.z = 4.2; // 4:3
    this.camera.rotation.z = 0.1;
  }
}