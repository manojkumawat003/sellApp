import React from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Article = (props) => {

    const articleImage = () =>(
        <View style={{position:'relative'}}>
        <Image
        resizeMode='cover'
         source={{uri:'https://loremflickr.com/320/240/brazil,rio'}}
         style={styles.articleImage}
        />
        <Text style={styles.priceTag}>
           $ {props.ArticleData.price}
        </Text>
        </View>
    )
   
    const articleData = () =>(
        <View style={styles.articleData}>
             <Text style={styles.articleTitle}>
                  {props.ArticleData.title}
             </Text>
             <Text style={styles.articleDescription}>
                    {props.ArticleData.description}
             </Text>
             
        </View>
    )

  OwnerInfo = () =>(
       <View>
           <Text style={styles.OwnerInfo}>Contact the owner of this article to the following link</Text>
           <Icon.Button
            name="envelope-o"
            size={20}
            color="#00ADA9"
            backgroundColor="#ffffff"
            onPress={()=>openEmail()}
           >
              <Text style={{fontSize:20}}>{props.ArticleData.email}</Text>
           </Icon.Button>
       </View>
  )
      
  const openEmail = () =>{
       Linking.openURL(`mailto:${props.ArticleData.email}?subject=${props.ArticleData.title}`)
  }
   
    return (
        <ScrollView style={styles.articleContainer}>
            {articleImage()}
            {articleData()}
            {OwnerInfo()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    articleContainer:{
        padding:10
    },
    articleImage:{
        width:'100%',
        height:240,
           
    },
    priceTag:{
        position:'absolute',
        backgroundColor:'red',
        fontSize:20,
        fontFamily:'Roboto-Black',
        color:'#ffffff',
        padding:10,
        bottom:0
    },
    articleData:{
        margin:5
    },
    articleTitle:{
        fontSize:25,
        fontFamily:'Roboto-Black',
        
    },
    articleDescription:{
        fontSize:18
    },
    OwnerInfo:{
        marginTop:30,
        padding:10,
        borderTopWidth:1,
        borderTopColor:'lightgrey'
    }
})
export default Article;