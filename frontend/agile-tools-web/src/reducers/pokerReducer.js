const pokerReducer = (state, action) => {
    switch (action.type) {
      case 'CREDENTIALS_CHANGED':
        return { ...state, credentials: action.payload }
      case 'STORAGE_KEY_CHANGED':
        return { ...state, storageKey: action.payload }
      default:
        return { ...state };
    }
  };

  export default pokerReducer;