function trap(element: HTMLElement): void {
  document.addEventListener("focusin", (e) => {
    if (e.target == null) {
      return;
    }

    if (element.contains(e.target as HTMLElement)) {
      console.log("inside of the area");
      return;
    }

    element.setAttribute("tabindex", "0");
    window.requestAnimationFrame(() => {
      element.focus();

      window.requestAnimationFrame(() => {
        element.removeAttribute("tabindex");
      });
    });
  });
}

function release(): void {}

function init(triggerAttr: string, areaAttr: string): void {
  const triggers = [...document.querySelectorAll(`[${triggerAttr}]`)];

  for (const trigger of triggers) {
    trigger.addEventListener("click", () => {
      const id = trigger.getAttribute(triggerAttr);

      if (id == null) {
        return;
      }

      const area = document.querySelector(`[${areaAttr}="${id}"]`);
      if (area == null) {
        return;
      }

      trap(area as HTMLElement);
    });
  }
}

init("data-trap-trigger", "data-trap-area");
