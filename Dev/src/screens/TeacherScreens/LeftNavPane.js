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
    teacher: this.props.navigation.state.params.teacher,
    userID: this.props.navigation.state.params.userID
  }

  //Sets the screen name
  async componentDidMount() {

    FirebaseFunctions.setCurrentScreen("LeftNavPane", "LeftNavPane");

  }

  async openClass(classID, className) {

    await FirebaseFunctions.updateTeacherObject(this.state.userID, {
      currentClassID: classID
    });
    FirebaseFunctions.logEvent("OPEN_CLASS");

    //navigate to the selected class
    this.props.navigation.push("CurrentClass");
    this.props.navigation.closeDrawer();
  };

  //todo: change the ListItem header and footer below to the shared drawer component intead
  // generalize the QcDrawerItem to accept either an image or an icon
  render() {
    const { name, profileImageID, classes } = this.state.teacher;

    const profileCaption = name + strings.sProfile
    const teacherImageId = profileImageID ? profileImageID : 0

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
            onPress={() => this.props.navigation.push("TeacherProfile")}
          />

          <FlatList
            data={classes}
            keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item, index }) => (
              <QcDrawerItem
                title={item.name}
                image={classImages.images[item.imageId]}
                onPress={() => this.openClass(item.id, item.name)}
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

