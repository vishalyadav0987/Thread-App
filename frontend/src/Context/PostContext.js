import { createContext, useContext, useState } from 'react';
export const PostContext = createContext([]);


export const usePostContext = () => {
    return useContext(PostContext);
}

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    return <PostContext.Provider value={{ posts, setPosts }}>{children}</PostContext.Provider>
}