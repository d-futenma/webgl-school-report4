import Mesh from './Mesh.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Animation from './Animation.js';

export default class Canvas {
  constructor() {
    this.camera = new Camera();
    this.mesh = new Mesh(this.camera.camera);
    this.mesh.initTexturesPlanes().then(() => {
      this.renderer = new Renderer();
      this.animation = new Animation(this.mesh.scene, this.camera.camera, this.renderer.renderer, this.mesh);
    });
    this.onResize();
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.renderer.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.camera.updateProjectionMatrix();
    }, false);
  }
}