export const initialState = {
  display: "jobs",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "display":
      return {
        ...state,
        display: action.payload,
      };
    default:
      return state;
  }
};
