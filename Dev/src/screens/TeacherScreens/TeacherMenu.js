import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LeftNavPane from './LeftNavPane';
import SettingsNavigator from '../SettingsScreen/SettingsNavigator';
import TeacherProfileNavigator from './TeacherProfile/TeacherProfileNavigator';
import ClassTabsNavigator from './ClassTabs/ClassTabsNavigator';
import strings from '../../../config/strings';
import AddClassScreen from './AddClass/AddClassScreen';
import allSettingsScreen from '../SettingsScreen/allSettingsScreen';

const routeConfig = {
  TeacherProfile: {
    screen: TeacherProfileNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Teacher',
    })
  },
  CurrentClass: {
    screen: ClassTabsNavigator,
    path: 'teacher/class/tabs',
    navigationOptions: ({ navigation }) => ({
      title: 'Quran Class',
    }),
  },
  AddClass: {
    screen: AddClassScreen,
    path: 'teacher/class/new',
    navigationOptions: ({ navigation }) => ({
      title: strings.AddNewClass,
    }),
  },
  Settings: {
    screen: allSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
    })
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
const teacherClasses = createStackNavigator({ Home: drawer }, {
  headerMode: 'none',
})

export default createAppContainer(teacherClasses);
