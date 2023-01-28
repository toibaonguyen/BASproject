
export const setuserid = (userid) =>async dispatch=> {
    dispatch({
        type: 'SET_USERID',
        payload: userid
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
    dispatch({
        type: 'SET_USERAVATAR',
        payload: ava
    })
}
export const setbaseavatar = (ava)=> async dispatch => {
    console.log("Base Avatar: ",ava)
    dispatch({
        type: 'SET_BASEAVATAR',
        payload: ava
    })
}
export const setproducts = (items)=> dispatch => {
    dispatch({
        type: 'SET_PRODUCTS',
        payload: items
    })
}
export const setUserproducts = (items)=> dispatch => {
    dispatch({
        type: 'SET_USERPRODUCTS',
        payload: items

    })
}
export const setboughtProductsHistory = (items)=> dispatch => {
    dispatch({
        type: 'SET_BOUGHTPRODUCTSHISTORY',
        payload: items
    })
}
export const setfavoriteProducts = (items)=> dispatch => {
    dispatch({
        type: 'SET_FAVORITEPRODUCTS',
        payload: items
    })
}
export const setshoppingCart = (items)=> dispatch => {
    dispatch({
        type: 'SET_SHOPPINGCART',
        payload: items
    })
}
export const setsoldProductsHistory = (items)=> dispatch => {
    dispatch({
        type: 'SET_SOLDPRODUCTSHISTORY',
        payload: items
    })
}
export const setsolvingProducts = (items)=> dispatch => {
    dispatch({
        type: 'SET_SOLVINGPRODUCTS',
        payload: items
    })
}

export const setlistofsolvingProducts = (items)=> dispatch => {
    dispatch({
        type: 'SET_LISTSOLVINGPRODUCTS',
        payload: items
    })
}

export const setwallet = (items)=> dispatch => {
    dispatch({
        type: 'SET_WALLET',
        payload: items
    })
}

export const setbaseproductImage=(item)=>dispatch=>{
    dispatch({
        type: 'SET_BASEPRODUCTIMAGE',
        payload: items
    })
}
export const setusertype=(item)=>dispatch=>{
    console.log("user type: ",item)
    dispatch({
        type: 'SET_USERTYPE',
        payload: item
    })
}

export const setDMid=(item)=>dispatch=>{
    dispatch({
        type: 'SET_DMID',
        payload: item
    })
}