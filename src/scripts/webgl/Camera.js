export default class Camera {
  get CAMERA_PARAM() {
    return {
      fovy: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000,
    };
  }

  constructor() {
    this.camera = new THREE.PerspectiveCamera(this.CAMERA_PARAM.fovy, this.CAMERA_PARAM.aspect, this.CAMERA_PARAM.near, this.CAMERA_PARAM.far);
    this.camera.position.z = 4.2;
    this.camera.rotation.z = 0.1;
  }
}