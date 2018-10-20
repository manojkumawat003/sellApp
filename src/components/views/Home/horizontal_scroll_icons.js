import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';


const categoriesIcon = (value) => {
  let name = '';
  switch (value) {
      case 'All':
           name = 'circle-o-notch'
           break;
      case 'Sports':
           name = 'soccer-ball-o'
           break;
      case 'Music':
            name = 'music'
            break;
      case 'Clothing':
            name = 'shopping-bag'
            break;
      case 'Electronics':
            name = 'tv'
            break;            
      default:
            name = ''
    }
      return name;
}

class HorizontalScrollIcons extends Component {
 
    generateIcon = (categories) => (
        categories ?
          categories.map(item=>
            <View style={{marginRight:15}} key={item}>
                <Icons.Button
                  name={categoriesIcon(item)}
                  iconStyle={{marginRight:10,marginLeft:3}}
                  backgroundColor={
                      this.props.categorySelected === item ? '#FF6444' : "#c1c1c1" 
                  }
                  size={20}
                  borderRadius={100}
                  onPress={()=> this.props.updateCategoryHandler(item)}
                >
                    <Text style={{color:'#ffffff',marginRight:5}}>
                         {item}
                    </Text>

                </Icons.Button>
            </View>
           
        ) 
        : null
    )

    render(){
        return(
            <ScrollView
             horizontal={true}
             decelerationRate={0}
             snapToInterval={200}
             showsHorizontalScrollIndicator={false}
            >
              <View style={styles.scrollContainer}>
                  {this.generateIcon(this.props.categories)}
              </View>
            </ScrollView>
        )
    }
}

const styles =StyleSheet.create({
    scrollContainer:{
        flex:1,
        flexDirection:'row',
        padding:10,
        width:'100%'
    }
})

export default HorizontalScrollIcons;