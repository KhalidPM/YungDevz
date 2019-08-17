import FirstRunNavigator from 'screens/FirstRun/FirstRunNavigator'
import TeacherMenu from 'screens/TeacherScreens/TeacherMenu';
import FirstScreenLoader from './FirstScreenLoader'
import StudentMenu from '../StudentScreens/StudentMenu';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from '../AuthenticationScreens/LoginScreen';


export default createAppContainer(createStackNavigator({
  FirstScreenLoader: { screen: FirstScreenLoader },
  TeacherMenu: { screen: TeacherMenu },
  FirstRun: { screen: FirstRunNavigator },
  Login: { screen: LoginScreen },
  TeacherScreens: { screen: TeacherMenu },
  StudentScreens: { screen: StudentMenu }
}, {
    initialRouteName: 'FirstScreenLoader',
    headerMode: 'none'
  }));
