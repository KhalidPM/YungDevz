/* eslint-disable no-extra-semi */
import React from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import FirebaseFunctions from 'config/FirebaseFunctions';
import { SafeAreaView } from "react-navigation";
import QcAppBanner from "components/QcAppBanner";
import QcDrawerItem from "components/QcDrawerItem";
import teacherImages from "../../../config/teacherImages";
import strings from '../../../config/strings';
import QcParentScreen from "screens/QcParentScreen";

class LeftNavPane extends QcParentScreen {

  state = {
    teacher: this.props.teacher,
    userID: this.props.userID,
    classes: this.props.classes,
  }

  //Sets the screen name
  async componentDidMount() {

    FirebaseFunctions.setCurrentScreen("Teacher Left Nav Pane", "LeftNavPane");

  }

  async openClass(classID) {

    await FirebaseFunctions.updateTeacherObject(this.state.userID, {
      currentClassID: classID
    });
    FirebaseFunctions.logEvent("TEACHER_OPEN_CLASS");

    //navigate to the selected class
    this.props.navigation.push("CurrentClass");
    this.props.navigation.closeDrawer();
  };

  //todo: change the ListItem header and footer below to the shared drawer component intead
  // generalize the QcDrawerItem to accept either an image or an icon
  render() {
    const { name, profileImageID } = this.state.teacher;
    const { classes } = this.state;
    const profileCaption = name + strings.sProfile;
    const teacherImageId = profileImageID ? profileImageID : 0;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}
          >
            <View
              style={{
                padding: 10,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <QcAppBanner />
            </View>

            <QcDrawerItem
              title={profileCaption}
              image={teacherImages.images[teacherImageId]}
              onPress={() => this.props.navigation.push("TeacherProfile", {
                teacher: this.state.teacher,
                userID: this.state.userID
              })}
            />

            <FlatList
              data={classes}
              keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
              renderItem={({ item, index }) => (
                <QcDrawerItem
                  title={item.name}
                  image={classImages.images[item.classImageID]}
                  onPress={() => this.openClass(item.ID)}
                />
              )} />

            <QcDrawerItem
              title={strings.AddNewClass}
              icon="plus"
              onPress={() => {
                this.props.navigation.push("AddClass", {
                  userID: this.state.userID,
                  teacher: this.state.teacher
                })
              }} />

            <QcDrawerItem
              title={strings.Settings}
              icon="cogs"
              onPress={() => this.props.navigation.push("Settings")} />

          </SafeAreaView>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LeftNavPane;

