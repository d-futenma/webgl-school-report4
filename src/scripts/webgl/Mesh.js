import * as THREE from 'three';

export default class Mesh {
  get CLASSES() {
    return {
      isModalOpened: 'is-modal-opened',
    };
  }

  constructor(camera) {
    this.camera = camera;
    this.scene = new THREE.Scene();
    this.geometry = new THREE.PlaneGeometry(1.33, 1); // 4:3
    // this.geometry = new THREE.PlaneGeometry(1.77, 1); // 16:9
    this.planeGroup = new THREE.Group();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.$overlay = document.querySelector('[data-modal-overlay]');
    this.$modal = document.querySelector('[data-modal]');
    this.$close = [...document.querySelectorAll('[data-modal-close]')];
    this.$img = document.querySelector('[data-modal-img]');

    this.planeArray = [];
    this.ringRadius = 2.65; // 4:3
    // this.ringRadius = 3.0; // 16:9

    this.onMouseClick();
    this.onCloseClick();
  }

  async initTexturesPlanes() {
    const texturePromises = Array.from({length: 12}, (_, i) => {
      return new Promise((resolve) => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(`assets/img/img-${i + 1}.png`, resolve);
        texture.encoding = THREE.sRGBEncoding;
      });
    });
  
    const textures = await Promise.all(texturePromises);
    this.planeArray = [];

    textures.forEach((texture, i) => {
      texture.repeat.x = -1;
      texture.offset.x = 1;
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
      let plane = new THREE.Mesh(this.geometry, material);
      let angle = (Math.PI * 2) * (i / 12);
      plane.position.x = this.ringRadius * Math.cos(angle);
      plane.position.z = this.ringRadius * Math.sin(angle);
      plane.lookAt(0, 0, 0);
      plane.userData.index = i;
      this.planeGroup.add(plane);
      this.planeArray.push(plane);
    });
  
    this.scene.add(this.planeGroup);
  }

  onMouseClick() {
    window.addEventListener('click', (mouseEvent) => {
      mouseEvent.preventDefault();
      this.mouse.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = - (mouseEvent.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planeArray);
        if (intersects.length > 0) {
        this.onPlaneClick(intersects[0].object);
      }
    });
  }

  onPlaneClick(plane) {
    const planeIndex = plane.userData.index;
    this.$img.src = `assets/img/img-${planeIndex + 1}.png`
    this.showModal();
  }

  showModal() {
    this.$overlay.classList.add(this.CLASSES.isModalOpened);
    this.$modal.classList.add(this.CLASSES.isModalOpened);
  }

  onCloseClick() {
    this.$close.forEach((element) => {
      element.addEventListener('click', (event) => {
        this.$overlay.classList.remove(this.CLASSES.isModalOpened);
        this.$modal.classList.remove(this.CLASSES.isModalOpened);
      });
    });
  }
}
