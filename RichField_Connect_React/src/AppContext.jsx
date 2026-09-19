import React, { createContext, useReducer, useEffect } from 'react';

export const AppContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('rc_user')) || null,
  posts: JSON.parse(localStorage.getItem('rc_posts')) || []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'REGISTER_USER':
      return { ...state, user: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked
              }
            : post
        )
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem('rc_user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('rc_posts', JSON.stringify(state.posts));
  }, [state.posts]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};