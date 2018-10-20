import {Navigation} from 'react-native-navigation';
import ConfigureStore from './src/components/store/config';
import {Provider} from 'react-redux';

import Login from './src/components/views/Login';
import Home from './src/components/views/Home';
import AddPost from './src/components/views/Admin/AddPost';
import sidedrawerComponent from './src/components/views/Sidedrawer';
import UserPost from './src/components/views/Admin/UserPost';
import Article from './src/components/views/Article';
import NotAllow from './src/components/views/Admin/AddPost/notallow';

const store = ConfigureStore();

Navigation.registerComponent("sellitApp.Login",
()=>
Login,
store,
Provider
);


Navigation.registerComponent("sellitApp.Home",
()=>
Home,
store,
Provider
);


Navigation.registerComponent("sellitApp.AddPost",
()=>
AddPost,
store,
Provider
);

Navigation.registerComponent("sellitApp.sidedrawerComponent",
()=>
sidedrawerComponent,
store,
Provider
);

Navigation.registerComponent("sellitApp.UserPost",
()=>
UserPost,
store,
Provider
);

Navigation.registerComponent("sellitApp.Article",
()=>
Article,
store,
Provider
);

Navigation.registerComponent("sellitApp.NotAllow",
()=>
NotAllow,
store,
Provider
);


export default () => Navigation.startSingleScreenApp({
 screen:{
    screen:"sellitApp.Login",
    title:"Login",
    navigatorStyle:{
      navBarHidden:true
    }
 }

}) 
