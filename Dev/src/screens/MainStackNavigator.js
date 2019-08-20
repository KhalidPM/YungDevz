//This stack navigator will be the base line for all screens across the app (with the exception of the
//tabs navigator in the teacher screens & the drawerNavigators).
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TeacherMenu from './TeacherScreens/TeacherMenu';
import FirstScreenLoader from './FirstScreenLoader/FirstScreenLoader';
import StudentMenu from './StudentScreens/StudentMenu';
import LoginScreen from './AuthenticationScreens/LoginScreen';
import FirstRunScreen from './FirstRun/FirstRunScreen';
import TeacherWelcomeScreen from './TeacherScreens/TeacherWelcomeScreen';
import AddClassScreen from './TeacherScreens/AddClass/AddClassScreen';
import ForgotPassword from './AuthenticationScreens/ForgotPassword';
import StudentWelcomeScren from './StudentScreens/StudentWelcomeScreen';
import allSettingsScreen from './SettingsScreen/allSettingsScreen';
import creditsScreen from './SettingsScreen/creditsScreen';
import TeacherProfileScreen from './TeacherScreens/TeacherProfile/TeacherProfileScreen';
import StudentMainScreen from './StudentScreens/StudentMainScreen';
import ClassTabsNavigator from './TeacherScreens/ClassTabs/ClassTabsNavigator';
import StudentProfileScreen from './TeacherScreens/ClassTabs/StudentProfileScreen';
import ClassEditScreen from './TeacherScreens/ClassTabs/ClassEditScreen';
import EvaluationPage from './Evaluation/EvaluationPage';
import strings from 'config/strings';
import TopBanner from 'components/TopBanner';

//The routes containing all the screens & their navigation options
routeConfig = {

    FirstScreenLoader: {
        screen: FirstScreenLoader,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    TeacherScreens: {
        screen: ClassTabsNavigator,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    StudentScreens: {
        screen: StudentMenu,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    FirstRunScreen: {
        screen: FirstRunScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    TeacherWelcomeScreen: {
        screen: TeacherWelcomeScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    StudentWelcomeScreen: {
        screen: StudentWelcomeScren,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    AddClass: {
        screen: AddClassScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => navigation.openDrawer()}
                    Title={strings.AddNewClass}
                />
            )
        }),
    },


    Settings: {
        screen: allSettingsScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => navigation.openDrawer()}
                    Title={strings.Settings}
                />
            )
        }),
    },

    CreditsScreen: {
        screen: creditsScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="angle-left"
                    LeftOnPress={() => navigation.goBack()}
                    Title={strings.Credits}
                />
            )
        }),
    },

    TeacherProfile: {
        screen: TeacherProfileScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => navigation.openDrawer()}
                    Title={strings.MyProfile}
                />
            )
        })
    },

    StudentCurrentClass: {
        screen: StudentMainScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => { navigation.openDrawer() }}
                    Title={
                        //Todo: Make sure an actual class name is passed and not a hard coded one
                        "Tuesday Hifth Class"
                    } />
            ),
        }),
    },

    TeacherCurrentClass: {
        screen: ClassTabsNavigator,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },

    TeacherStudentProfile: {
        screen: StudentProfileScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="angle-left"
                    LeftOnPress={() => navigation.goBack()}
                    Title={strings.StudentProfile}
                />
            )
        })
    },

    EvaluationPage: {
        screen: EvaluationPage,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    
    ClassEdit: {
        screen: ClassEditScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    Title={strings.EditClass}
                    RightTextName={strings.Done}
                    RightOnPress={() => navigation.goBack()}
                />
            )
        })
    },

}

//The navigator config containing all the configurations of the navigator (initialRoute, header, etc)
navigatorConfig = {

    initialRouteName: 'FirstScreenLoader'

}

const MainStackStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const MainStackNavigator = createAppContainer(MainStackStackNavigator);

export default MainStackNavigator;