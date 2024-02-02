export const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "REGISTER": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};
