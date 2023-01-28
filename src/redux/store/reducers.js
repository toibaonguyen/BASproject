const InitialUserInfoState = {
  id: null,
  user: '',
  phone: '',
  email: '',
  name: '',
  avatar: '',
  baseavatar: '',
  products: [],
  boughtProductsHistory: [],
  favoriteProducts: [],
  shoppingCart: [],
  soldProductsHistory: [],
  solvingProducts: [],
  wallet: 0,
  usertype: 'common',
};

const InitialLogicFrontEndState = {
  isLoading: false,
  isSignOut: false,
  isStartingUp: false,
};

const InitialListofProducts = {
  products: [],
  baseProductImage: '',
};

const InitialListofSolvingProducts = {
  solvingProducts: [],
};
const InitialDMid = {
  DMid: '',
};

export function ReducerUserInfo(state = InitialUserInfoState, action) {
  switch (action.type) {
    case 'SET_USERID':
      return {...state, id: action.payload};
    case 'SET_USERNAME':
      return {...state, user: action.payload};
    case 'SET_USERPHONE':
      return {...state, phone: action.payload};
    case 'SET_USEREMAIL':
      return {...state, email: action.payload};
    case 'SET_USERHINTNAME':
      return {...state, name: action.payload};
    case 'SET_USERAVATAR':
      return {...state, avatar: action.payload};
    case 'SET_BASEAVATAR':
      return {...state, baseavatar: action.payload};
    case 'SET_USERPRODUCTS':
      return {...state, products: action.payload};
    case 'SET_BOUGHTPRODUCTSHISTORY':
      return {...state, boughtProductsHistory: action.payload};
    case 'SET_FAVORITEPRODUCTS':
      return {...state, favoriteProducts: action.payload};
    case 'SET_SHOPPINGCART':
      return {...state, shoppingCart: action.payload};
    case 'SET_SOLDPRODUCTSHISTORY':
      return {...state, soldProductsHistory: action.payload};
    case 'SET_SOLVINGPRODUCTS':
      return {...state, solvingProducts: action.payload};
    case 'SET_WALLET':
      return {...state, wallet: action.payload};
    case 'SET_USERTYPE':
      return {...state, usertype: action.payload};
    default:
      return state;
  }
}

export function ReducerLogicFrontEnd(
  state = InitialLogicFrontEndState,
  action,
) {
  switch (action.type) {
    case 'SET_ISLOADING':
      return {...state, isLoading: action.payload};
    case 'SET_ISSIGNOUT':
      return {...state, isSignOut: action.payload};
    case 'SET_ISSTARTINGUP':
      return {...state, isStartingUp: action.payload};
    default:
      return state;
  }
}

export function ReducerListofProducts(state = InitialListofProducts, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {products: action.payload};
    case 'SET_BASEPRODUCTIMAGE':
      return {baseProductImage: action.payload};
    default:
      return state;
  }
}

export function ReducerListofSolvingProducts( state = InitialListofSolvingProducts,action) {
  switch (action.type) {
    case 'SET_LISTSOLVINGPRODUCTS':
      return {solvingProducts: action.payload};
    default:
      return state;
  }
}


export function ReducerDM( state = InitialDMid,action) {
  switch (action.type) {
    case 'SET_DMID':
      return {DMid: action.payload};
    default:
      return state;
  }
}