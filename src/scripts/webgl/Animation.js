export default class Animation {
  constructor(scene, camera, renderer, mesh) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.mesh = mesh;
    this.rotationSpeed = 0.03; 
    this.currentRotation = this.mesh.planeGroup.rotation.y;
    this.animate = this.animate.bind(this);
    window.addEventListener('wheel', this.handleScroll.bind(this));
    this.opening();
    this.animate();
  }

  opening() {
    this.mesh.planeGroup.rotation.y = Math.PI;

    gsap.to(this.mesh.planeGroup.rotation, {
      y: 0,
      duration: 4,
      ease: 'expo.inOut',
    });
  }

  handleScroll(event) {
    if (event.deltaY < 0) {
      this.currentRotation += this.rotationSpeed;
    } else {
      this.currentRotation -= this.rotationSpeed;
    }

    gsap.to(this.mesh.planeGroup.rotation, {
      y: this.currentRotation,
      duration: 1.0,
      ease: "power1.out"
    });
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
}