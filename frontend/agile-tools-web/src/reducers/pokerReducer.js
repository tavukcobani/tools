const pokerReducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_NEW_SESSION': 
      return { ...state, storageKey: action.payload }
      default:
        return { ...state };
    }
  };

  export default pokerReducer;