//This will be the drawer going to all the different possible student screens
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LeftNavPane from './LeftNavPane';
import allSettingsScreen from '../SettingsScreen/allSettingsScreen';
import StudentMainScreen from './StudentMainScreen';

const routeConfig = {
    /*
    Make a student profile screen similar to the teacher one, where they can edit previously entered info
    StudentProfileScreen: {
      screen: StudentProfile,
    },
    */
    CurrentClass: {
        screen: StudentMainScreen,
    },
    Settings: {
        screen: allSettingsScreen,
    }
};

const navigationConfig = {
    contentComponent: LeftNavPane,
    drawerWidth: 325,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'CurrentClass'
}


const drawer = createDrawerNavigator(routeConfig, navigationConfig);
const studentMenu = createStackNavigator({ Home: drawer }, {
    headerMode: 'none'
});

export default createAppContainer(studentMenu);
