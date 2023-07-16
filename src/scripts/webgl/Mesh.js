export default class Mesh {
  get CLASSES() {
    return {
      isHovering: 'is-hovering',
      isModalOpened: 'is-modal-opened',
    };
  }

  constructor(camera) {
    this.camera = camera;
    this.scene = new THREE.Scene();
    this.geometry = new THREE.PlaneGeometry(1.33, 1);
    this.planeGroup = new THREE.Group();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.$overlay = document.querySelector('[data-modal-overlay]');
    this.$modal = document.querySelector('[data-modal]');
    this.$close = [...document.querySelectorAll('[data-modal-close]')];
    this.$img = document.querySelector('[data-modal-img]');

    this.clickEvent = this.clickEvent.bind(this);
    this.touchEvent = this.touchEvent.bind(this);

    this.totalPlanes = 12;
    this.ringRadius = 2.65;
    this.isModalOpen = false;

    this.planeArray;

    this.registerClickEvent();
    this.onCloseClick();
    this.onMouseMove();
  }

  async initTexturesPlanes() {
    const texturePromises = Array.from({length: this.totalPlanes}, (_, i) => {
      return new Promise((resolve) => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(`assets/img/img-${i + 1}.png`, resolve);
        texture.encoding = THREE.sRGBEncoding;
      });
    });

    const textures = await Promise.all(texturePromises);
    this.planeArray = textures.map((texture, i) => {
      texture.repeat.x = -1;
      texture.offset.x = 1;
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(this.geometry, material);
      const angle = (Math.PI * 2) * (i / this.totalPlanes);
      plane.position.x = this.ringRadius * Math.cos(angle);
      plane.position.z = this.ringRadius * Math.sin(angle);
      plane.lookAt(0, 0, 0);
      plane.userData.index = i;
      this.planeGroup.add(plane);
      return plane;
    });

    this.scene.add(this.planeGroup);
  }

  updateMouseRaycaster(mouseEvent) {
    mouseEvent.preventDefault();
    this.mouse.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (mouseEvent.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    return this.raycaster.intersectObjects(this.planeArray);
  }

  onMouseMove() {
    window.addEventListener('mousemove', (mouseEvent) => {
      if (this.isModalOpen) return;
      const intersects = this.updateMouseRaycaster(mouseEvent);
      document.documentElement.classList.toggle(this.CLASSES.isHovering, intersects.length > 0);
    });
  }

  registerClickEvent() {
    window.addEventListener('click', this.clickEvent);
    window.addEventListener('touchstart', this.touchEvent);
  }

  clickEvent(mouseEvent) {
    if (this.isModalOpen) return;
    const intersects = this.updateMouseRaycaster(mouseEvent);
    if (intersects.length > 0) {
      this.onPlaneClick(intersects[0].object);
    }
  }

  touchEvent(touchEvent) {
    if (this.isModalOpen) return;
    touchEvent.preventDefault();
    const touch = touchEvent.touches[0];
    const mouseEvent = new MouseEvent('click', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.clickEvent(mouseEvent);
  }

  onPlaneClick(plane) {
    const planeIndex = plane.userData.index;
    this.$img.src = `assets/img/img-${planeIndex + 1}.png`
    this.showModal();
  }

  showModal() {
    this.$overlay.classList.add(this.CLASSES.isModalOpened);
    this.$modal.classList.add(this.CLASSES.isModalOpened);
    this.isModalOpen = true;
    document.documentElement.classList.remove(this.CLASSES.isHovering);
  }

  onCloseClick() {
    this.$close.forEach((element) => {
      element.addEventListener('click', () => {
        this.$overlay.classList.remove(this.CLASSES.isModalOpened);
        this.$modal.classList.remove(this.CLASSES.isModalOpened);
        setTimeout(() => this.isModalOpen = false, 500);
      });
    });
  }
}