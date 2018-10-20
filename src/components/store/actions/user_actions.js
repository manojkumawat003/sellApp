import {REGISTER_USER,SIGN_USER,AUTO_SIGN_IN,GET_USER_POSTS} from '../types';
import { SIGNUP,SIGNIN,REFRESH,FIREBASEURL } from '../../util/misc';

import axios from 'axios';

export function signIn(data){
    const request = axios({
        method:"POST",
        url:SIGNIN,
        data:{
            email:data.email,
            password:data.password,
            returnSecureToken:true,
        },
        headers:{
            "Content-Type": "application/json"
        }
    }).then(response=>{
        return response.data
    }).catch(e => {
        return false
    })

    return{
        type:SIGN_USER,
        payload:request
    }
};

export function signUp(data){
const request = axios({
    method:"POST",
    url:SIGNUP,
    data:{
        email:data.email,
        password:data.password,
        returnSecureToken:true,
    },
    headers:{
        "Content-Type": "application/json"
    }
}).then(response=>{
    return response.data
}).catch(e => {
    return false 
})

return {
    type:REGISTER_USER,
    payload:request
}

}

export function autoSignIn(refToken){
 
    const request = axios({
        method:"POST",
        url:REFRESH,
        data:"grant_type=refresh_token&refresh_token=" + refToken,
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response=>{
        console.log(response.data)
        return response.data
    }).catch(e => {
        return false 
    })

    return {
        type:AUTO_SIGN_IN,
        payload: request
    }
}

export function getUserPosts(UID){
  const request = axios(`${FIREBASEURL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}"`)
  .then(response =>{
      const articles =[];

      for(let key in response.data){
        articles.push({
            ...response.data[key],
            id:key
        })
    } return articles;
  })
     return {
         type:GET_USER_POSTS ,
         payload: request
     }
}