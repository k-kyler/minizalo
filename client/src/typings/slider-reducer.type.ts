export type SliderActionsType = {
  NEXT_SLIDE: "next_slide";
  PREVIOUS_SLIDE: "previous_slide";
};

export type SliderReducerType = {
  slideWidth: number;
};

export type SliderActionType = {
  type: "next_slide" | "previous_slide";
};
