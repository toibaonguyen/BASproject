
export const setuserid = (userid) =>async dispatch=> {

    let id=userid;
    console.log(id)
    dispatch({
        type: 'SET_USERID',
        payload: id
    })
}
export const setusername = (username)=>async dispatch => {
    dispatch({
        type: 'SET_USERNAME',
        payload: username
    })
}
export const setuserphone = (userpassword)=>async dispatch => {
    dispatch({
        type: 'SET_USERPHONE',
        payload: userpassword
    })
}
export const setuseremail = (useremail)=>async dispatch => {
    console.log(useremail)
    dispatch({
        type: 'SET_USEREMAIL',
        payload: useremail
    })
}
export const setuserhintname = (userhintname)=>async dispatch => {
    dispatch({
        type: 'SET_USERHINTNAME',
        payload: userhintname
    })
}
export const setisloading = (isLoading)=>async dispatch => {
    dispatch({
        type: 'SET_ISLOADING',
        payload: isLoading
    })
}
export const setissignout = (isSignOut)=>async dispatch => {
    dispatch({
        type: 'SET_ISSIGNOUT',
        payload: isSignOut
    })
}
export const setisstartingup = (isstartingup)=>async dispatch => {
    dispatch({
        type: 'SET_ISSTARTINGUP',
        payload: isstartingup
    })
}
export const setuseravatar = (ava)=>async dispatch => {
    console.log(ava)
    dispatch({
        type: 'SET_USERAVATAR',
        payload: ava
    })
}