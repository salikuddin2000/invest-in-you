export const mapUserData = (user) => {
    const {uid,email, xa,displayName, photoUrl}=user
    return {
        id: uid,
        email:email,
        token: xa,
        name: displayName,
        profilePic: photoUrl
    }
}