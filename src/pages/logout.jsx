import { useEffect } from "react"
import { useNavigate } from "react-router";
export const Logout = () => {
    alert("Are You Sure To leave the System")
    const usenav = useNavigate();
      useEffect(() => {

        localStorage.clear()
        localStorage.clear()
        
        usenav('/login');
        window.location.reload();
    }, []);
    return (
        <>

        </>
    )
}
// export default Logout;