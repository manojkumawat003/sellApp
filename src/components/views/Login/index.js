import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView,ActivityIndicator} from 'react-native';
import Logo from "./Logo.js";
import {getOrientation,setOrientationListener,removeOrientationListener, getPlatform,getTokens,setTokens} from '../../util/misc'; 
import LoginPanel from "./loginPanel";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {autoSignIn} from '../../store/actions/user_actions';
import LoadTabs from '../Tabs/index.js';
 
class Login extends Component {

    constructor(props){
      super(props)
      this.state = {
        loading:true,
        platform:getPlatform(),
        orientation:getOrientation(500),
        logoAnimation:false
      }

      setOrientationListener(this.changeOrientation)
    }

    changeOrientation =() => {
      this.setState({
        orientation:getOrientation(500)
      })
    }

    showLogin = () => {
      this.setState({
        logoAnimation:true
      })
    }

    componentWillUnmount(){

      removeOrientationListener()
    }
    
    componentDidMount(){
      getTokens((value)=>{
        if (value[0][1] === null) {
          this.setState({loading:false})
        } else{
          this.props.autoSignIn(value[1][1]).then(()=>{
            if(!this.props.User.userData.token){
              ths.setState({loading:false})
            } else {
              setTokens(this.props.User.userData,()=>{
                LoadTabs(true)
              })
            }
          })
        }
      })
    } 
          
  render() {

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
            <ActivityIndicator/>
        </View>
      )
      
    } else {

      return (
        <ScrollView>
            <View style={styles.container}>
                 <Logo
                     showLogin = {this.showLogin}
                    orientation={this.state.orientation}
                  />
                           
                 <LoginPanel 
                   show = {this.state.logoAnimation}
                   orientation={this.state.orientation}
                   platform={this.state.platform}
                 />  
            </View>
        </ScrollView>
  
);

    }
     
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center'
  },
  loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
});

function mapStateToProps(state){
  return{
     User:state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);