export default class Loader {
  get CLASSES() {
    return {
      isLoaded: 'is-loaded',
    };
  }

  constructor() {
    this.$element = document.querySelector('[data-loader]');
    if (!this.$element) return;
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      this.$element.classList.add(this.CLASSES.isLoaded);
    });
  }
}
