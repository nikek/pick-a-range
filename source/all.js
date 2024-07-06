/*
  Timespan picker
  A range input field for quickly selecting a time range, timespan or duration.
*/

// // Grab our DOM elements
// const output = document.querySelector("output");
// const range = document.querySelector("input");
// const slopeClipPath = document.querySelector("#slope-cut rect");
// const slopeGrayClipPath = document.querySelector("#slope-cut-gray rect");
// const tickContainer = document.querySelector(".tick-container");

// // Setup defaults
// range.min = 0;
// range.max = timespanOptions.length - 1;
// range.value = timespanOptions.findIndex((v) => v.label === "2 hours");
// output.value = timespanOptions[range.value].label;

// // Find the ticks in dataset and plot them
// const timespanTicks = timespanOptions
//   .filter(function (tso) {
//     return tso.tick;
//   })
//   .map(function (tso) {
//     tso.index = timespanOptions.indexOf(tso);
//     return tso;
//   })
//   .forEach(function (tso) {
//     const tick = document.createElement("span");
//     tick.classList.add("timespan-tick");
//     tick.style.width = (tso.index / range.max) * 100 + "%";
//     tick.innerHTML = tso.tickLabel;
//     tickContainer.appendChild(tick);
//   });

// // Set a new value function
// const setValue = function (value) {
//   value = value || range.value;
//   const clipPathWidth = (value / range.max) * 100;
//   slopeClipPath.setAttribute(
//     "style",
//     "-webkit-transform: translateX(" +
//       clipPathWidth +
//       "%); " +
//       "transform: translateX(" +
//       clipPathWidth +
//       "%)"
//   );
//   slopeGrayClipPath.setAttribute(
//     "style",
//     "-webkit-transform: translateX(" +
//       (clipPathWidth - 100) +
//       "%); " +
//       "transform: translateX(" +
//       (clipPathWidth - 100) +
//       "%)"
//   );
//   output.value = timespanOptions[value].label;
// };

// // When input range changes: set new value
// range.addEventListener("input", function (e) {
//   setValue(e.target.valueAsNumber);
// });

// // set initial state
// setValue();

customElements.define(
  "ne-pick-a-range",
  class PickARange extends HTMLElement {
    constructor() {
      super();

      // Units
      const minutes = 60;
      const hours = 3600;
      const days = 86400;

      // Dataset for timespan picker
      this.timespanOptions = [
        { label: "1 year", seconds: 366 * days },
        { label: "6 months", seconds: 180 * days },
        { label: "3 months", seconds: 90 * days },
        { label: "2 months", seconds: 60 * days },
        { label: "1.5 months", seconds: 45 * days },
        { label: "1 month", seconds: 30 * days, tick: true, tickLabel: "mo" },
        { label: "3 weeks", seconds: 21 * days },
        { label: "2 weeks", seconds: 14 * days },
        { label: "10 days", seconds: 10 * days },
        { label: "7 days", seconds: 7 * days, tick: true, tickLabel: "w" },
        { label: "5 days", seconds: 5 * days },
        { label: "3 days", seconds: 3 * days },
        { label: "2 days", seconds: 2 * days },
        { label: "1.5 days", seconds: 32 * hours },
        { label: "1 day", seconds: 24 * hours, tick: true, tickLabel: "d" },
        { label: "18 hours", seconds: 18 * hours },
        { label: "12 hours", seconds: 12 * hours },
        { label: "9 hours", seconds: 9 * hours },
        { label: "6 hours", seconds: 6 * hours },
        { label: "4 hours", seconds: 4 * hours },
        { label: "3 hours", seconds: 3 * hours },
        { label: "2 hours", seconds: 2 * hours },
        { label: "1.5 hours", seconds: 90 * minutes },
        { label: "1 hour", seconds: 60 * minutes, tick: true, tickLabel: "h" },
        { label: "45 min", seconds: 45 * minutes },
        { label: "30 min", seconds: 30 * minutes },
        { label: "20 min", seconds: 20 * minutes },
        { label: "15 min", seconds: 15 * minutes },
        { label: "10 min", seconds: 10 * minutes },
        { label: "5 min", seconds: 5 * minutes },
        { label: "3 min", seconds: 3 * minutes },
        { label: "2 min", seconds: 2 * minutes },
        { label: "1 min", seconds: 60 },
        { label: "30 sec", seconds: 30 },
        { label: "15 sec", seconds: 15 },
      ];
    }

    connectedCallback() {
      this.innerHTML = `<div class="wrap">
    <svg viewBox="0 0 600 50" preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <clipPath id="slope-cut"><rect x="0" y="0" width="100%" height="100%" /></clipPath>
      <clipPath id="slope-cut-gray"><rect x="0" y="0" width="100%" height="100%" /></clipPath>
      <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope" clip-path="url(#slope-cut)"></path>
      <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope gray" clip-path="url(#slope-cut-gray)"></path>
    </svg>

    <input type="range">
    <output></output>
    <div class="tick-container"></div>
  </div>`;

      // Grab our DOM elements
      this.output = this.querySelector("output");
      this.range = this.querySelector("input");
      this.slopeClipPath = this.querySelector("#slope-cut rect");
      this.slopeGrayClipPath = this.querySelector("#slope-cut-gray rect");
      this.tickContainer = this.querySelector(".tick-container");

      // Setup defaults
      this.range.min = 0;
      this.range.max = this.timespanOptions.length - 1;
      this.range.value = this.timespanOptions.findIndex(
        (v) => v.label === "1 day"
      );
      this.output.value = this.timespanOptions[this.range.value].label;

      // Find the ticks in dataset and plot them
      this.timespanTicks = this.timespanOptions
        .filter((tso) => tso.tick)
        .map((tso) => ((tso.index = this.timespanOptions.indexOf(tso)), tso))
        .forEach((tso) => {
          const tick = document.createElement("span");
          tick.classList.add("timespan-tick");
          tick.style.width = (tso.index / this.range.max) * 100 + "%";
          tick.innerHTML = tso.tickLabel;
          this.tickContainer.appendChild(tick);
        });

      // When input range changes: set new value
      this.range.addEventListener("input", (e) =>
        this.setValue(e.target.valueAsNumber)
      );

      // set initial state
      this.setValue();
    }
    setValue(value = this.range.value) {
      const clipPathWidth = (value / this.range.max) * 100;
      this.slopeClipPath.setAttribute(
        "style",
        `transform: translateX(${clipPathWidth}%)`
      );
      this.slopeGrayClipPath.setAttribute(
        "style",
        `transform: translateX(${clipPathWidth - 100}%)`
      );
      this.output.value = this.timespanOptions[value].label;
    }
  }
);
