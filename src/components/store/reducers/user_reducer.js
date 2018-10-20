import {REGISTER_USER,SIGN_USER,AUTO_SIGN_IN,GET_USER_POSTS} from '../types';

export default function(state={},action){
    switch(action.type){
        case SIGN_USER:
          return{...state,
            userData:{
                uid:action.payload.localId || false,
                token:action.payload.idToken || false,
                refToken:action.payload.refreshToken || false,
            }    
        }
           break;
        case REGISTER_USER:
          return {...state,
                 userData:{
                     uid:action.payload.localId || false,
                     token:action.payload.idToken || false,
                     refToken:action.payload.refreshToken || false,
                 }
        }
    break;
        case AUTO_SIGN_IN:
            return {...state,
                userData:{
                    uid:action.payload.user_id || false,
                    token:action.payload.id_token || false,
                    refToken:action.payload.refresh_token || false,
                }
            }
        case GET_USER_POSTS:
            return {...state,userPosts:action.payload
                   }    
        default:
             return state
    }
}