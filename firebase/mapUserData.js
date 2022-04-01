export const mapUserData = (user) => {
    console.log(user)
    const {uid,email, xa,displayName,photoURL}=user
    return {
        id: uid,
        email:email,
        token: xa,
        name: displayName,
        profilePic: photoURL
    }
}