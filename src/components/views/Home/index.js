import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import {navigatorDrawer,navigatorDeepLink,gridTwoColumns} from '../../util/misc';
import HorizontalScroll from './horizontal_scroll_icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticles} from '../../store/actions/articles_actions';

import BlockItem from './blockItem';



class Home extends Component {
    constructor(props){
    super(props);
 
         this.state = {
         isLoading:true,
         articles : [],
         categories :['All','Sports','Music','Clothing','Electronics'],
         categorySelected : "All"
     }

     this.props.navigator.setOnNavigatorEvent((event)=>{
                navigatorDeepLink(event,this)
                navigatorDrawer(event,this)
     })

  }

  updateCategoryHandler = (value) => {

    this.setState({
      categorySelected:value,
      isLoading:true,
      articles:[],
    })

    this.props.getArticles(value).then(()=>{

      const newArticles = gridTwoColumns(this.props.Articles.list)
           this.setState({
               isLoading:false,
               articles:newArticles
           })
    })
    
  }

  componentDidMount(){
    this.props.getArticles('All').then(()=>{

      const newArticles = gridTwoColumns(this.props.Articles.list)
           this.setState({
               isLoading:false,
               articles:newArticles
           })
    })
  }
   goToArticleHandler = (props) => {
     this.props.navigator.push({
       screen:"sellitApp.Article",
       animationType:"slide-horizontal",
       passProps:{
         ArticleData:props
       },
      backButtonTitle:'Back to Home',
       //title:'back to home',
      navigatorStyle:{
        navBarBackgroundColor:'#00ADA9',
        navBarTextFontSize:20,
        navBarTextColor:'#ffffff',
        navBarTextFontFamily:'RobotoCondensed-Bold',
        screenBackgroundColor:'#ffffff'
      }
     })
  }

  showArticles = () => (
    this.state.articles.map((item,i)=>(
       <BlockItem
        key={`columnHome-${i}`}
        item = {item}
        iteration = {i}
        goto = {this.goToArticleHandler}        
       />
    ))
  )

  render() {
    return (
             <ScrollView>
                 <View style={styles.container}>
                      <HorizontalScroll
                       categories={this.state.categories}
                       categorySelected={this.state.categorySelected}
                       updateCategoryHandler={this.updateCategoryHandler}
                      />
                   {
                     this.state.isLoading ? 
                      <View style={styles.loading}>
                           <Icon
                             name="gears"
                             color="lightgrey"
                             size={30}
                           />
                           <Text style={{color:"lightgrey",fontSize:25}}>Loading...</Text>
                      </View>
                     : null }
                     
                    <View style={styles.articleContainer}>
                         <View style={{flex:1}}>
                             {this.showArticles()}
                         </View>
                    </View>
                 </View>
             </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{
      marginTop:5,
  },
  loading:{
    flex:1,
    alignItems:'center',
    marginTop:"50%"
  },
  articleContainer:{
    padding:10,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

function mapStateToProps(state){
   console.log(state)
 return {
     Articles : state.Articles
 }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({getArticles},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)