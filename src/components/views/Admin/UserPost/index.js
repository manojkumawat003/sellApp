import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Modal,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {getUserPosts} from '../../../store/actions/user_actions';
import {bindActionCreators} from 'redux';

class UserPost extends Component {

  constructor(props){
      super(props);
         this.state = {
          posts:[],
          modal:false
      }
  }

  componentDidMount(){
      const UID = this.props.User.userData.uid;
      this.props.getUserPosts(UID);
  }  

  componentWillReceiveProps(nextProps){
          if(nextProps.User.userPosts){
           this.setState({
            posts:nextProps.User.userPosts
           })
           
         }  
         
  }  

  showConfirm=(ID)=> {
     this.setState({
         modal:true,
         toDelete:ID
     })
  } 
 
  showPosts=(posts)=>(
      
      posts ? 
         posts.map(item=>(
            
             <View style={styles.itemWrapper} key={item.id}>
                <View style={styles.itemTittle}>
                  <Text style={{fontFamily:'Roboto-Black'}} >{item.title}</Text>
                </View>
              <View style={{marginBottom:10}}>
                  <Text>Description: {item.description}</Text>
                  <View>
                      <Text>Price: {item.price}</Text>
                      <Text>Category: {item.category}</Text>
                  </View>
              </View>
               <View>  
             <Button
                title="Delete Post"
                onPress={()=>this.showConfirm(item.id)}
              />
             </View> 
               <Modal
                 animationType="slide"
                 transparent={false}
                 visible={this.state.modal}
                 onRequestClose={()=>{}}
                > 
                
                   <View>
                        <Text>Are you want to delete this post, sure?</Text>
                   <View> 
                   <TouchableOpacity
                         onPress={()=>alert('deleted')}
                   >
                       <Text>Yes, delete</Text>    
                   </TouchableOpacity>  
                   <TouchableOpacity
                          onPress={()=>{
                          this.setState({
                          modal:false,
                          toDelete:''

                      })
                  }}
                 >
                       <Text>Don't delete</Text>    
                    </TouchableOpacity>   
                  </View> 
                </View>  
            </Modal>

             </View>
         ))
      :null
      )

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                   <View style={{marginBottom:30}}>
                       <Text>You have {this.state.posts.length} posts.</Text>
                   </View>
                   {this.showPosts(this.state.posts)}

                

                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    itemWrapper:{
        borderWidth:1,
        borderColor:'#ececec',
        borderRadius:2,
        marginBottom:20
    },
    itemTittle:{
        borderBottomWidth:1,
        borderBottomColor:"#ececec",
        padding:10,
        backgroundColor:'#f5f5f5'
    }
})

function mapStateToProps(state){
    console.log(state)
   return {
       User:state.User
   }
}

function mapDispatchToProps(dispatch){
 return bindActionCreators({getUserPosts},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPost);