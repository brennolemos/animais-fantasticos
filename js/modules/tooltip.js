export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    // Bind do objeto da Classe aos Callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }


  // Cria a tooltipBox e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  onMouseLeave(event) {
    this.tooltipBox.remove();
    event.currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    event.currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseOver(event) {
    // Cria a tooltipbox e coloca em uma propriedade
    this.criarTooltipBox(event.currentTarget);
    // tooltipBox.style.top = `${event.pageY}px`;
    // tooltipBox.style.left = `${event.pageX}px`;

    // onMouseMove.tooltipBox = tooltipBox;
    event.currentTarget.addEventListener('mousemove', this.onMouseMove);

    // onMouseLeave.tooltipBox = tooltipBox;
    // onMouseLeave.element = this;
    event.currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }


  addTooltipEvents() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTooltipEvents();
    }
    return this;
  }
}
