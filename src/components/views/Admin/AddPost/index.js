import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Modal } from 'react-native';
import { navigatorDrawer,getTokens,setTokens } from '../../../util/misc';

import Input from '../../../util/Forms/input';
import validationRules from '../../../util/Forms/validationRules';

import {connect} from 'react-redux';
import {addArticle,resetArticle} from '../../../store/actions/articles_actions';
import {bindActionCreators} from 'redux';
import {autoSignIn} from '../../../store/actions/user_actions';

class AddPost extends Component {
    constructor(props){
      super(props);
      this.props.navigator.setOnNavigatorEvent((event)=>{
        navigatorDrawer(event,this)
      })

    }

    state = {
      loading:false,
      hasErrors: false,
      errorsArray:[],  
      modalVisible:false,
      modalSuccess:false,
     form: {
      category: {
        value: "",
        name:"category",
        valid: false,
        type: "picker",
        options :['Select a category','Sports','Music','Clothing','Electronics'],
        rules: {
           isRequired:true,
               },
        errMsg:'Select a category!!'  
              },
        title:{
          value:"",
          name:"title",
          valid:false,
          type:"textinput",
          rules:{
                 isRequired:true,
                 maxLength:40,
              },
          errMsg:'Add a title,max 40 characters'     
        } , 
        description:{
          value:"",
          name:"description",
          valid:false,
          type:"textinput",
          rules:{
                 isRequired:true,
                 maxLength:200,
              },
          errMsg:'Add the description, max 200 characters'     
        },    
        price:{
          value:"",
          name:"price",
          valid:false,
          type:"textinput",
          rules:{
                 isRequired:true,
                 maxLength:6,
              },
          errMsg:'Add price, max 6 digits'     
            },
        email:{
          value:"",
          name:"email",
          valid:false,
          type:"textinput",
          rules:{
                 isRequired:true,
                 isEmail:true
              },
          errMsg:'Add a valid email address'    
             }     
      }
    }      
          updateInput(name,value){
        
            this.setState({
                hasErrors:false
            })  
  
            let formCopy = this.state.form;
              formCopy[name].value = value;
  
              let rules =  formCopy[name].rules;
              let valid = validationRules(value, rules,formCopy);
  
              console.log(valid)
          
              formCopy[name].valid = valid;
  
           this.setState({
               form:formCopy
           })
  
      }
  
      submitFormHandler = () => {
        let isFormValid = true;
        let dataToSubmit = {};
        const formCopy = this.state.form;

        for(let key in formCopy){
          isFormValid = isFormValid && formCopy[key].valid;
          dataToSubmit[key] = this.state.form[key].value;
        }
         if(isFormValid){
           this.setState({
             loading:true
           });

           getTokens((value)=>{
            const dateNow = new Date();
            const expiration = dateNow.getTime();
            const form = {
              ...dataToSubmit,
              uid:value[3][1]
            }

            if(expiration > value[2][1]){
               console.log('auto sign in')
               this.props.autoSignIn(value[1][1]).then(()=>{
                 setTokens(this.props.User.userData,()=>{
                   this.props.addArticle(form,this.props.User.userData.token).then(()=>{
                     this.setState({modalSuccess:true})
                   })
                 })
               })
            }else {
              console.log('posted')
              this.props.addArticle(form,value[0][1]).then(()=>{
                this.setState({modalSuccess:true})
              })
            }

           })
         } else {
           let errorsArray = [];

           for(let key in formCopy){
            if(!formCopy[key].valid){
              errorsArray.push(formCopy[key].errMsg)
            } 
           }
           this.setState({
             loading:false,
             hasErrors:true,
             modalVisible:true,
             errorsArray:errorsArray
           })
         }     

      }
      showErrorsArray=(error)=>(
        error ? 
        error.map((item,i)=>(
          <Text key={i} style={styles.errorItems}>-{item}</Text>
        ))
        :null
      )
      clearErrors=()=>{
        this.setState({
          hasErrors:false,
          modalVisible:false,
          errorsArray:[]
        })
      }   
      resetSellItScreen=()=>{
        const formCopy = this.state.form;
        
        for(let key in formCopy){
           formCopy[key].valid = false;
           formCopy[key].value = "";
          }
       this.setState({
         modalSuccess:false,
         hasErrors:false,
         errorsArray:[],
         loading:false
       })   

       this.props.resetArticle();
      }
  render() {

    return (
             <ScrollView>
                <View style={styles.formInputContainer}>
                    <View style={{flex:1,alignItems:'center'}}>
                       <Text style={styles.mainTitle}>Sell your things</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:1,}}>
                                  <Text>Select a category</Text>
                        </View>
                        <View style={{flex:1,}}>
                        <Input
                              placeholder="Select a category"
                              type={this.state.form.category.type}
                              value={this.state.form.category.value}
                              onValueChange={value => this.updateInput("category", value)}
                              options={this.state.form.category.options}
                              overrideStyle={styles.inputCategory}
                                />
                        </View>
                      </View>
                   <View style={{flex:1,alignItems:"center"}}>
                             <Text style={styles.secondTitle}>Describe what are you selling </Text>
                   </View>
                   <View>
                          <Text style={{fontFamily:"Roboto-Black",fontSize:15}}>Please add a title and description of product</Text>
                          <Input
                              placeholder="Enter a title"
                              type={this.state.form.title.type}
                              value={this.state.form.title.value}
                              onChangeText={value => this.updateInput("title", value)}
                              overrideStyle={styles.inputTitle}
                           />
                   </View>
                   <View>
                          <Input
                              placeholder="Enter the description"
                              type={this.state.form.description.type}
                              value={this.state.form.description.value}
                              onChangeText={value => this.updateInput("description", value)}
                              multiline={true}
                              numberOfLines={4}
                              overrideStyle={styles.inputTextMultiline}
                           />
                   </View>
                   <View>
                       <Text style={{fontFamily:"Roboto-Black",fontSize:15,marginTop:5}}>Enter selling cost</Text>
                       <Input
                          placeholder="Price"
                          type={this.state.form.price.type}
                          value={this.state.form.price.value}
                          onChangeText={value => this.updateInput("price", value)}
                          keyboardType = 'numeric'
                          overrideStyle={styles.inputTitle}
                       />
                   </View>
                   <View>
                       <Text style={{fontFamily:"Roboto-Black",fontSize:15,marginTop:5}}>Enter contact email address</Text>
                       <Input
                          placeholder="Enter your Email address"
                          type={this.state.form.email.type}
                          value={this.state.form.email.value}
                          onChangeText={value => this.updateInput("email", value)}
                          keyboardType = 'email-address'
                          autoCapitalize="none"
                          overrideStyle={styles.inputTitle}
                       />
                   </View>
                  {
                    !this.state.loading ?
                    <Button
                    title='Sell It'
                    autoCapitalize='none'
                    onPress={this.submitFormHandler}
                  /> 
                    :null
                }

                <Modal
                 animationType='slide'
                 visible={this.state.modalVisible}
                 onRequestClose={()=>{}}
                >
                 <View style={{padding:20}}>
                   {this.showErrorsArray(this.state.errorsArray)}
                   <Button
                    title="I got it!!!"
                    onPress={this.clearErrors}                   
                   />
                 </View>
                </Modal>
                <Modal  
                animationType='slide'
                 visible={this.state.modalSuccess}
                 onRequestClose={()=>{}}
                >
                  <View style={{padding:10}}>
                    <Text>You have successfully posted</Text>
                    <Button
                     title="Go to Home"
                     onPress={()=>{
                       this.resetSellItScreen(),
                       this.props.navigator.switchToTab({
                         tabIndex:0
                       })
                     }}
                    />
                  </View>
                </Modal>
                </View>
             </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer:{
    flex:1,
    flexDirection:'column',
    padding:20,
   },
   mainTitle:{
     fontFamily:'Roboto-Black',
     fontSize:30
   },
   secondTitle:{
    marginTop:30,
    fontSize:20,
    fontFamily:'Roboto-Black',
    color:'#00ADA9',
    marginBottom:30,
   },
   inputCategory:{
     width:'100%'
   },
   inputTitle:{
     backgroundColor:'lightgrey',
     borderWidth:0,
     padding:10
   },
   inputTextMultiline:{
    backgroundColor:'lightgrey',
    borderWidth:0,
    padding:10,
    minHeight:100,
     },
   errorItems:{
    fontSize:16,
    fontFamily:'Roboto-Black',
    color:'red',
    marginBottom:10
   }
});

function mapStateToProps(state){
  return{
    Articles:state.Articles,
    User:state.User 
  }
}

function mapDispatchToProps(dispatch){
return bindActionCreators({addArticle, autoSignIn,resetArticle},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);