import { VFX } from "https://esm.sh/@vfx-js/core";

document.addEventListener("DOMContentLoaded", () => {
  const vfx = new VFX();

  const glitchBtn = document.querySelector(".glitch-btn");
  const plasmaBtn = document.querySelector(".plasma-btn");

  vfx.add(glitchBtn, { shader: "glitch", overflow: 100 });
  vfx.add(plasmaBtn, { shader: "plasma", overflow: 100 });

  glitchBtn.addEventListener("mouseleave", () => vfx.remove(glitchBtn));
  plasmaBtn.addEventListener("mouseleave", () => vfx.remove(plasmaBtn));
});