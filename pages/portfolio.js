import { useUser } from "../firebase/useUser";

function portfolio(){
    const {user} = useUser()
    console.log(user)
    return(
        <h1>{user?user.name:""}</h1>
    )
}

export default portfolio