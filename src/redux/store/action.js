
export const setuserid = (userid) =>async dispatch=> {

    let id=userid;
    console.log("Userid: ",id)
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
    console.log("Email: ",useremail)
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
    console.log("Avatar: ",ava)
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
    console.log("Products: ",items)
    dispatch({
        type: 'SET_PRODUCTS',
        payload: items
    })
}
export const setUserproducts = (items)=> dispatch => {
    console.log("USERProducts: ",items)
    dispatch({
        type: 'SET_USERPRODUCTS',
        payload: items

    })
}
export const setboughtProductsHistory = (items)=> dispatch => {
    console.log("boughtProductsHistory: ",items)
    dispatch({
        type: 'SET_BOUGHTPRODUCTSHISTORY',
        payload: items
    })
}
export const setfavoriteProducts = (items)=> dispatch => {
    console.log("favoriteProducts: ",items)
    dispatch({
        type: 'SET_FAVORITEPRODUCTS',
        payload: items
    })
}
export const setshoppingCart = (items)=> dispatch => {
    console.log("shoppingCart: ",items)
    dispatch({
        type: 'SET_SHOPPINGCART',
        payload: items
    })
}
export const setsoldProductsHistory = (items)=> dispatch => {
    console.log("soldProductsHistory: ",items)
    dispatch({
        type: 'SET_SOLDPRODUCTSHISTORY',
        payload: items
    })
}
export const setsolvingProducts = (items)=> dispatch => {
    console.log("solvingProducts: ",items)
    dispatch({
        type: 'SET_SOLVINGPRODUCTS',
        payload: items
    })
}
export const settradedProductsHistory = (items)=> dispatch => {
    console.log("tradedProductsHistory: ",items)
    dispatch({
        type: 'SET_TRADEDPRODUCTSHISTORY',
        payload: items
    })
}
export const settradingProducts = (items)=> dispatch => {
    console.log("tradingProducts: ",items)
    dispatch({
        type: 'SET_TRADINGPRODUCTS',
        payload: items
    })
}