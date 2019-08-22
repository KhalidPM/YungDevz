import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import QcActionButton from 'components/QcActionButton';
import TouchableText from 'components/TouchableText'
import teacherImages from 'config/teacherImages'
import colors from 'config/colors';
import TopBanner from 'components/TopBanner';
import ImageSelectionModal from 'components/ImageSelectionModal'
import TeacherInfoEntries from 'components/TeacherInfoEntries';
import strings from 'config/strings';
import QcParentScreen from 'screens/QcParentScreen';
import FirebaseFunctions from 'config/FirebaseFunctions';
import SideMenu from 'react-native-side-menu';
import LeftNavPane from '../LeftNavPane';

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherProfileScreen extends QcParentScreen {

    //Sets the current screen for firebase analytics
    componentDidMount() {

        FirebaseFunctions.setCurrentScreen("Teacher Profile Screen", "TeacherProfileScreen");


    }

    state = {

        teacher: this.props.navigation.state.params.teacher,
        userID: this.props.navigation.state.params.userID,
        name: this.props.navigation.state.params.teacher.name,
        phoneNumber: this.props.navigation.state.params.teacher.phoneNumber,
        emailAddress: this.props.navigation.state.params.teacher.emailAddress,
        profileImageID: this.props.navigation.state.params.teacher.profileImageID,
        classes: this.props.navigation.state.params.classes,
        isPhoneValid: true,
        isOpen: false,
        modalVisible: false

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    //to-do: method must be able to update the profile picture
    editProfilePic() {
        this.setModalVisible(true);
    }

    //this method saves the new profile information to the firestore database
    async saveProfileInfo() {
        let { userID, name, phoneNumber, emailAddress, profileImageID } = this.state;
        name = name.trim();
        phoneNumber = phoneNumber.trim();
        emailAddress = emailAddress.trim();
        if (!name ||
            !phoneNumber ||
            !emailAddress ||
            name.trim() === ""
            || phoneNumber.trim() === ""
            || emailAddress.trim() === "") {
            Alert.alert(strings.Whoops, strings.PleaseMakeSureAllFieldsAreFilledOut);
        } else if (!this.state.isPhoneValid) {
            Alert.alert(strings.Whoops, strings.InvalidPhoneNumber);
        } else {
            await FirebaseFunctions.updateTeacherObject(userID, {
                name,
                phoneNumber,
                profileImageID
            });
            this.refs.toast.show(strings.YourProfileHasBeenSaved, DURATION.LENGTH_SHORT);
            //Just goes to the first class
            this.props.navigation.push('TeacherCurrentClass', {
                userID: userID
            });
        }
    }

    //------ event handlers to capture user input into state as user modifies the entries -----
    onNameChanged = (value) => {
        this.setState({ name: value })
    }

    onPhoneNumberChanged = (phone) => {
        this.setState({
            isPhoneValid: phone.isValidNumber(),
            phoneNumber: phone.getValue()
        });
    }

    onImageSelected(index) {
        this.setState({ profileImageID: index, })
        this.setModalVisible(false);
    }

    //-----------renders the teacher profile UI ------------------------------------
    render() {

        const { userID, emailAddress, name, phoneNumber, profileImageID } = this.state;
        return (
            <SideMenu isOpen={this.state.isOpen} menu={<LeftNavPane
                teacher={this.state.teacher}
                userID={userID}
                classes={this.state.classes}
                edgeHitWidth={0}
                navigation={this.props.navigation} />}>
                <View style={{
                    flexDirection: "column",
                    backgroundColor: colors.lightGrey,
                    flex: 3
                }}>
                    <TopBanner
                        LeftIconName="navicon"
                        LeftOnPress={() => this.setState({ isOpen: true })}
                        Title={strings.MyProfile} />
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.container} behavior="padding">
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <View style={styles.container}>
                                    <ImageSelectionModal
                                        visible={this.state.modalVisible}
                                        images={teacherImages.images}
                                        cancelText={strings.Cancel}
                                        setModalVisible={this.setModalVisible.bind(this)}
                                        onImageSelected={this.onImageSelected.bind(this)}
                                    />
                                    <View style={styles.picContainer}>
                                        <Image
                                            style={styles.profilePic}
                                            source={teacherImages.images[profileImageID]} />
                                        <TouchableText
                                            text={strings.UpdateProfileImage}
                                            onPress={() => this.editProfilePic()} />
                                    </View>

                                    <TeacherInfoEntries
                                        name={name}
                                        phoneNumber={phoneNumber}
                                        emailAddress={emailAddress}
                                        onNameChanged={this.onNameChanged}
                                        noEmailField={true}
                                        onPhoneNumberChanged={this.onPhoneNumberChanged}
                                        onEmailAddressChanged={() => { }}
                                    />
                                    <View style={styles.buttonsContainer}>
                                        <QcActionButton
                                            text={strings.Cancel}
                                            onPress={() => {
                                                //Just goes back without saving anything
                                                this.props.navigation.push('TeacherCurrentClass', {
                                                    userID: this.state.userID
                                                });
                                            }}
                                        />
                                        <QcActionButton
                                            text={strings.Save}
                                            onPress={() => this.saveProfileInfo()}
                                        />
                                    </View>
                                    <Toast ref="toast" />
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </SideMenu>
        )
    }

}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1,
        justifyContent: "flex-end"
    },
    picContainer: {
        paddingTop: 25,
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    profilePic: {
        width: 130,
        height: 130,
        borderRadius: 65
    },
    editInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: colors.black,
        borderBottomWidth: 0.25
    },
    //Next one is the same as previous but since it's like a fencepost algorithm, it has no border
    infoRowLast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    infoTextInput: {
        paddingRight: 20,
        fontSize: 16
    },
    infoTitle: {
        paddingLeft: 20,
        fontSize: 16
    },
    buttonsContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.white,
    },
    filler: {
        flexDirection: 'column',
        flex: 1
    }
});

export default TeacherProfileScreen;

