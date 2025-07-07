import { createContext } from "react";
import Shepherd from "shepherd.js";
import { tourSteps } from "./tourSteps";

// Context/provider pattern adapted from: https://docs.shepherdjs.dev/recipes/react/

export const ShepherdTourContext = createContext(null);

export const shepherdTourInstance = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    scrollTo: true,
    classes: 'custom-shepherd-popup',
  },
  steps: tourSteps,
});
