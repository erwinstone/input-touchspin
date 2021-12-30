/*!
* @erwinstone/input-touchspin v1.0.2 (https://input-touchspin.vercel.app/)
* Copyright 2021 erwinstone
* Licensed under MIT (https://github.com/erwinstone/input-touchspin/blob/master/LICENSE)
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.InputTouchspin = factory());
})(this, (function () { 'use strict';

	class InputTouchspin {
	  constructor(target) {
	    this.styleId = "input-touchspin-style";
	    this.input = target.querySelector("[data-touchspin-input]");
	    this.btnUp = target.querySelector("[data-touchspin-up]");
	    this.btnDown = target.querySelector("[data-touchspin-down]");
	    this.style();
	    if (!this.input.readOnly && !this.input.disabled) {
	      this.events();
	    }
	  }
	  style() {
	    if (document.getElementById(this.styleId) === null) {
	      const style = document.createElement("style");
	      style.id = this.styleId;
	      style.textContent = "[data-touchspin-input]::-webkit-inner-spin-button,[data-touchspin-input]::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}[data-touchspin-input]{-moz-appearance:textfield}";
	      document.head.appendChild(style);
	    }
	  }
	  events() {
	    this.btnUp.addEventListener("mousedown", () => this.spin());
	    this.btnDown.addEventListener("mousedown", () => this.spin(false));
	    this.btnUp.addEventListener("touchstart", (e) => {
	      this.spin();
	      e.cancelable && e.preventDefault();
	    });
	    this.btnDown.addEventListener("touchstart", (e) => {
	      this.spin(false);
	      e.cancelable && e.preventDefault();
	    });
	    Array.from(["mouseup", "mouseleave", "touchend"]).forEach((e) => {
	      this.btnUp.addEventListener(e, () => this.clearTimers());
	      this.btnDown.addEventListener(e, () => this.clearTimers());
	    });
	    this.input.addEventListener("wheel", (e) => {
	      Math.sign(e.deltaY) < 1 ? this.step() : this.step(false);
	      e.preventDefault();
	    });
	  }
	  clearTimers() {
	    clearTimeout(this.timeout);
	    clearInterval(this.interval);
	  }
	  step(up = true) {
	    const before = this.input.value;
	    up ? this.input.stepUp() : this.input.stepDown();
	    const after = this.input.value;
	    before !== after && this.input.dispatchEvent(new Event("change"));
	  }
	  spin(up = true) {
	    this.step(up);
	    this.timeout = setTimeout(() => this.interval = setInterval(() => this.step(up), 50), 300);
	  }
	}

	return InputTouchspin;

}));
