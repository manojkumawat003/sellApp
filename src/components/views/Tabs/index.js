import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const navStyle = {
    navBarBackgroundColor: '#00ADA9',
    navBarTextFontSize:20,
    navBarTextFontFamily:'RobotoCondensed-Bold',
    navBarTitleTextCentered: true,  // for android only
    navBarTextColor:'#ffffff'
    

}

const navLeftButton = (sources) => {
    return {
               title:'Drawer',
               id: 'DrawerButton',
               icon:sources[0],
               disableIconTint: true,
               buttonColor:'white'

}
}



const LoadTabs = (allow) => {

    Promise.all([
           Icon.getImageSource('bars',20,'white'),
           Icon.getImageSource('search',20,'white'),
           Icon.getImageSource('dollar',20,'white')
    ]).then(sources =>{
              
        Navigation.startTabBasedApp({
            tabs:[
                   {
                       screen:"sellitApp.Home",
                       label:"Home",
                       title:"Home",
                       icon:sources[1],
                       navigatorStyle:navStyle,
                       navigatorButtons:{
                           leftButtons:[navLeftButton(sources)]
                       }
                   },
                   {
                       screen: allow ? "sellitApp.AddPost" : "sellitApp.NotAllow",
                       label:"Sell it",
                       title:"Sell it",
                       icon:sources[2],
                       navigatorStyle:navStyle,
                       navigatorButtons:{
                        leftButtons:[navLeftButton(sources)]
                    }

                   }
            ],
            // tabsStyle is used for ios
            tabsStyle:{
                   tabBarButtonColor:'grey',
                   tabBarSelectedButtonColor:'#FFC636',
                   tabBarTextFontFamily:'RobotoCondensed-Bold',
                   tabBarBackgroundColor:'white',
                   tabBarTranslucent:false,
            },
            // appStyle is used for android
            appStyle:{
                tabBarButtonColor:'#00ADA9',
                tabBarSelectedButtonColor:'#FFC636',
                tabBarTextFontFamily:'RobotoCondensed-Bold',
                tabBarBackgroundColor:'white',
                navBarButtonColor:'#ffffff',
                keepStyleAcrossPush:true,
            },
            drawer:{
                left:{
                    screen:"sellitApp.sidedrawerComponent",
                    fixedWidth:500,
                    
                }
            }
        })

    })

    
}

export default LoadTabs;