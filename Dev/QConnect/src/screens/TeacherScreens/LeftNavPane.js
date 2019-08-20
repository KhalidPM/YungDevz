import React from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { SafeAreaView } from "react-navigation";
import QcAppBanner from "components/QcAppBanner";
import QcDrawerItem from "components/QcDrawerItem";
import teacherImages from "../../../config/teacherImages";
import strings from '../../../config/strings';
import QcParentScreen from "screens/QcParentScreen";
import QcActionButton from 'components/QcActionButton';

class LeftNavPane extends QcParentScreen {
  name = "LeftNavPane";

  state = {
    deleteOrStopDeleteText: strings.deleteClass,
    backColor : colors.white,
    deleteBool : false

  }

  openClass = (id, className) => {
    //update current class index in redux
    this.props.saveTeacherInfo(
      { currentClassId: id }
    );

    //navigate to the selected class
    this.props.navigation.push("CurrentClass");
    this.props.navigation.closeDrawer();
  };



  triggerDeleteClass(){
    let newText = this.state.deleteOrStopDeleteText === strings.deleteClass ? strings.finishDeleteClass : strings.deleteClass;
    let newColor = this.state.backColor === colors.white ? colors.red : colors.white;
    this.setState((oldState) => ({
      deleteOrStopDeleteText : newText,
      backColor: newColor,
      deleteBool: !oldState.deleteBool
    }));

  }


  //Go to teacher page method resets the delete class button.
  goToTeacherPage(){
    if(this.state.deleteBool){
     this.triggerDeleteClass();
    }
    this.props.navigation.push("TeacherProfile");
  }

  handleClassPress(item){
    if (this.state.deleteBool){
      //delete class method to go in here.
    }else{

      this.openClass(item.id, item.name);
    }
  }


  //todo: change the ListItem header and footer below to the shared drawer component intead
  // generalize the QcDrawerItem to accept either an image or an icon
  render() {
    const { name, profileImageId } = this.props;


    const profileCaption = name + strings.sProfile
    const teacherImageId = profileImageId ? profileImageId : 0
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
            onPress={this.goToTeacherPage.bind(this)}

          />

          <FlatList
            data={this.props.classes}
            extraData = {this.state.deleteOrStopDeleteText}
            keyExtractor={(item, index) =>  item.name } // fix, should be item.id (add id to classes)
            renderItem={({ item, index }) => (
              <QcDrawerItem
                title={item.name}
                image={classImages.images[item.imageId]}
                onPress={() => this.handleClassPress(item)}
                backColor = {this.state.backColor}
              />
            )} />

          <QcDrawerItem
            title={strings.AddNewClass}
            icon="plus"
            onPress={() => this.props.navigation.push("AddClass")} />

          <QcDrawerItem
            title={strings.Settings}
            icon="cogs" 
            onPress={() => this.props.navigation.push("Settings")} />

          <QcActionButton
          text={this.state.deleteOrStopDeleteText}
          onPress = {this.triggerDeleteClass.bind(this)}/>

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

const getTeacherClasses = (classIds, classes) => {
  return Object.values(classes).filter(c => classIds.includes(c.id))
}

const mapStateToProps = state => {
  const { name, profileImageId, currentClassId } = state.data.teacher;
  const classes = getTeacherClasses(state.data.teacher.classes, state.data.classes);

  return { classes, name, profileImageId, currentClassId };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    saveTeacherInfo
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavPane);

