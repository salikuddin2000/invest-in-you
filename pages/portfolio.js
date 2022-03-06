import { useUser } from "../firebase/useUser";
import AppBarComponent from "../components/AppBarComponent";

function portfolio(){
    const {user} = useUser()
    console.log(user)
    return(
    <>
      <AppBarComponent path={"/dashboard"} pathname={"Dashboard"} /><br />
        <h1>{user?user.name:""}</h1>
    </>
    )
}

export default portfolio