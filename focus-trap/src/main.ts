function waitForAnimationFrame(): Promise<void> {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      resolve();
    });
  });
}

function trap(element: HTMLElement): void {
  document.addEventListener("focusin", async (e) => {
    if (e.target == null) {
      return;
    }

    if (element.contains(e.target as HTMLElement)) {
      console.log("inside of the area");
      return;
    }

    element.setAttribute("tabindex", "0");
    await waitForAnimationFrame();
    element.focus();
    await waitForAnimationFrame();
    element.removeAttribute("tabindex");
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
