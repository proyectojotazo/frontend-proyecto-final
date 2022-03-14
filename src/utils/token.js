
const getAuthUserId = () => {
    const token = localStorage.getItem('auth')
    if (token === null) {
        return null
    }
    const b64Parts = token.split('.')
    if (b64Parts.length !== 3) {
        return null
    }
    const b64Data = b64Parts[1]

    try {
        const userJSON = atob(b64Data)
        const user = JSON.parse(userJSON)
        return user.nickname
    } catch (error) {
        console.error('Error while decoding JWT Token', error)
        return null
    }
}

export default getAuthUserId;