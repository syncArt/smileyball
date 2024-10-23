import chroma from "chroma-js";

const MARQUEE_WIDTH = 800;
const MARQUEE_LABEL_WIDTH = 120;

const LEFT_LABEL_LINEAR_GRADIENT_START =
  1 - MARQUEE_LABEL_WIDTH / MARQUEE_WIDTH;
const RIGHT_LABEL_LINEAR_GRADIENT_START = MARQUEE_LABEL_WIDTH / MARQUEE_WIDTH;

export const colors = {
  marqueeLeftStart: "#FEBC24",
  marqueeLeftMiddle: chroma
    .scale(["#FEBC24", "#FE8059"])(LEFT_LABEL_LINEAR_GRADIENT_START)
    .hex(),
  marqueeLeftEnd: "#FE8059",
  marqueeRightStart: "#FE6471",
  marqueeRightMiddle: chroma
    .scale(["#FE6471", "#FE25A7"])(RIGHT_LABEL_LINEAR_GRADIENT_START)
    .hex(),
  marqueeRightEnd: "#FE25A7",
};

export const width = {
  marqueeWidth: `${MARQUEE_WIDTH}px`,
  marqueeLabelWidth: `${MARQUEE_LABEL_WIDTH}px`,
  marqueeTextWidth: `${MARQUEE_WIDTH - MARQUEE_LABEL_WIDTH}px`,
};

export const minWidth = {
  marqueeLabelMinWidth: `${MARQUEE_LABEL_WIDTH}px`,
};

export const margin = {
  marqueeLabelWidth: `${MARQUEE_LABEL_WIDTH}px`,
};
