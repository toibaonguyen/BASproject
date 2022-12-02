



const InitialUserInfoState ={

    id: null,
    user: "",
    phone: "",
    email: "",
    name: "",
    avatar:""
}

const InitialLogicFrontEndState ={

    isLoading:false,
    isSignOut:false,
    isStartingUp:false,
}

const InitialListofProducts={
    products:[]
}
export function ReducerUserInfo(state=InitialUserInfoState,action){
    switch (action.type){

        case 'SET_USERID':
            return {...state,id: action.payload};
        case 'SET_USERNAME':
            return {...state,user: action.payload};
        case 'SET_USERPHONE':
            return {...state,phone: action.payload};
        case 'SET_USEREMAIL':
            return {...state,email: action.payload};
        case 'SET_USERHINTNAME':
            return {...state,name: action.payload};
        case 'SET_USERAVATAR':
            return {...state,avatar: action.payload};
        default:
            return state;
    }
}

export function ReducerLogicFrontEnd(state=InitialLogicFrontEndState,action){
    switch(action.type){
        case 'SET_ISLOADING':
            return {...state,isLoading: action.payload};
        case 'SET_ISSIGNOUT':
            return {...state,isSignOut: action.payload};
        case 'SET_ISSTARTINGUP':
            return {...state,isStartingUp: action.payload};
        default:
            return state;

    }
}

export function ReducerListofProducts(state=InitialListofProducts,action){
    switch(action.type){
        case 'SET_PRODUCTS':
            return {products:action.payload};
        default:
            return state;
    }
}




