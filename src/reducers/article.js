export default (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLE_PAGE_LOADED' :
      console.log('payload: ', action.payload)
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };
    case 'ARTICLE_PAGE_UNLOADED' :
      return {};
    default:
      return state;
  }
}
