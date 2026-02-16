import { Link } from "react-router"
export const Page=()=>{
    // const dir=useNavigate();
    return(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"2px"}}>
          <h1 style={{marginTop:"200px"}}>The Enter the Page is Not found</h1>
          <Link to='/' style={{marginLeft:"150px",textAlign:"center"}}>Go to Login Page</Link>
            </div>   
        </>
    )
}
