import React, {Component} from 'react';
import { StyleSheet,View, Text,Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import {navigatorDrawer} from '../../../util/misc';

class NotAllow extends Component {

          constructor(props){
              super(props),
              this.props.navigator.setOnNavigatorEvent((event)=>{
                navigatorDrawer(event,this)
              })
          }    


    render(){
        return(
          <View style={{
              flex:1,
              justifyContent:'center',
              alignItems:'center'
          }}>
              <Icon
               name="frown-o"
               size={60}
               color="red"
              />
            <Text>You need to login or register to sell !!!</Text>
            <TouchableOpacity
              onPress={()=>
                Navigation.startSingleScreenApp({
                    screen:{
                       screen:"sellitApp.Login",
                       title:"Login",
                       navigatorStyle:{
                         navBarHidden:true
                       }
                    }
                   
                   }) 
            }
            >
               <Text style={{fontSize:30,color:"red",textDecorationLine:'underline'}}>Login/Register</Text>
            </TouchableOpacity>

          </View>
        )
    }
}

export default NotAllow;