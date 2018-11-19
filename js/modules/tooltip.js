export default function initTooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip]');

  function criarTooltipBox(element) {
    const tooltipbox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipbox.classList.add('tooltip');
    tooltipbox.innerText = text;
    document.body.appendChild(tooltipbox);
    return tooltipbox;
  }

  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = `${event.pageY + 20}px`;
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    },
  };

  const onMouseLeave = {
    handleEvent() {
      this.tooltipBox.remove();
      this.element.removeEventListener('mouseleave', onMouseLeave);
      this.element.removeEventListener('mousemove', onMouseMove);
    },
  };

  function onMouseOver(event) {
    const tooltipBox = criarTooltipBox(this);
    tooltipBox.style.top = `${event.pageY}px`;
    tooltipBox.style.left = `${event.pageX}px`;

    onMouseMove.tooltipBox = tooltipBox;
    this.addEventListener('mousemove', onMouseMove);

    onMouseLeave.tooltipBox = tooltipBox;
    onMouseLeave.element = this;
    this.addEventListener('mouseleave', onMouseLeave);
  }

  tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver);
  });
}
