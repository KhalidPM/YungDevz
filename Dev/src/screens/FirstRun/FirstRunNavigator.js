import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import FirstRunScreen from './FirstRunScreen';
import TeacherMenu from '../TeacherScreens/TeacherMenu';
import TeacherWelcomeScreen from './TeacherWelcomeScreen';
import AddClassScreen from '../TeacherScreens/AddClass/AddClassScreen';
import TopBanner from 'components/TopBanner';
import strings from 'config/strings';
import StudentMenu from '../StudentScreens/StudentMenu';
import LoginScreen from 'screens/AuthenticationScreens/LoginScreen';
import ForgotPassword from 'screens/AuthenticationScreens/ForgotPassword';
import NewPassword from 'screens/AuthenticationScreens/NewPassword';
import StudentWelcomeScren from 'screens/StudentScreens/StudentWelcomeScreen';

const routeConfig = {
    FirstRunScreen: {
        screen: FirstRunScreen
    },
    ForgotPassword:{
        screen: ForgotPassword
    },
    NewPassword:{
        screen: NewPassword
    },  
    TeacherWelcomeScreen: {
        screen: TeacherWelcomeScreen,
    },
    TeacherScreens: {
        screen: TeacherMenu
    },
    StudentScreens: {
        screen: StudentMenu
    },
    LoginScreen: {
        screen: LoginScreen
    },
    StudentWelcomeScreen: {
        screen: StudentWelcomeScren
    },
    AddClassScreenFirstRun: {
        screen: AddClassScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    Title={strings.AddNewClass}
                />
            )
        }),
    },
}



const navigatorConfig = {
    headerMode: 'none',
    initialRouteName: 'FirstRunScreen'
}

const FirstRunStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const FirstRunNavigator = createAppContainer(FirstRunStackNavigator);

export default FirstRunNavigator;