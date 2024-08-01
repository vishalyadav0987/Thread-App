import { useNavigate } from "react-router-dom"

const useConverationMessage = () => {
    const navaigate = useNavigate();
    const navigateToMessage = () => {
        navaigate('/chat')
    }
    return { navigateToMessage }
}

export default useConverationMessage
