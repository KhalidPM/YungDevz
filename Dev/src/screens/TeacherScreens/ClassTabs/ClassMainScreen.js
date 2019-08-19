import React from "react";
import { ScrollView, StyleSheet, FlatList, View, Text, Image } from "react-native";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import studentImages from "config/studentImages"
import LoadingSpinner from '../../../components/LoadingSpinner';
import strings from 'config/strings';
import QcParentScreen from "screens/QcParentScreen";
import QcActionButton from "components/QcActionButton";
import FirebaseFunctions from 'config/FirebaseFunctions';

export class ClassMainScreen extends QcParentScreen {

  state = {
    isLoading: true,
    teacher: '',
    userID: '',
    currentClass: '',
    currentClassID: ''
  }

  async componentDidMount() {

    FirebaseFunctions.setCurrentScreen("Class Main Screen", "ClassMainScreen");
    this.setState({ isLoading: true });
    const { teacher, userID } = this.props.navigation.state.params;
    const { currentClassID } = teacher;
    const currentClass = await FirebaseFunctions.getClassByID(currentClassID);
    this.setState({
      isLoading: false,
      teacher,
      userID,
      currentClass,
      currentClassID
    });

  }

  render() {
    const { isLoading, teacher, userID, currentClass, currentClassID } = this.state;
    if (isLoading === true) {
      return (
        <View style={styles.container}>
          <LoadingSpinner isVisible={true} />
        </View>
      )
    }
    //---------------------------------no class state---------------------------------
    else if (currentClass === -1 || currentClassID === "") {
      return (
        <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
          {(this.props.navigation.state.params && navigation.state.params.classTitle) ? (
            <TopBanner
              LeftIconName="navicon"
              LeftOnPress={() => this.props.navigation.openDrawer()}
              Title={this.props.navigation.state.params.classTitle}
              RightIconName="edit"
              RightOnPress={() => this.props.navigation.push('ClassEdit', {
                classID: currentClassID,
                currentClass
              })}
            />
          ) : (
              <TopBanner
                LeftIconName="navicon"
                LeftOnPress={() => navigation.openDrawer()}
                Title={"Quran Connect"}
              />
            )
          }
          <Image
            source={require('assets/emptyStateIdeas/ghostGif.gif')}
            style={{
              width: 300,
              height: 150,
              resizeMode: 'contain',
            }}
          />

          <Text
            style={{
              fontSize: 30,
              color: colors.primaryDark,
              flexDirection: "row",
            }}
          >
            {strings.NoClass}
          </Text>

          <QcActionButton
            text={strings.AddClassButton}
            onPress={() => {
              this.props.navigation.push("AddClass", {
                userID: this.state.userID,
                teacher: this.state.teacher
              })
            }} />
        </View>
      )
    }
    else if (currentClass.students.length === 0) {
      /**
       * ------Overview:
       * The Page will display a message that will redirect the teacher to the 
       * add student page if the class does not contain any students.
       * 
       * ------Components:
       * We are using a touchable opacity with a large message telling the
       * teacher that there are no students in the class, and a smaller message
       * telling the teacher to click the text to add students.
       * 
       * ------Conditonal:
       * The conditional will check to see if the length of the students array is 0,
       * if it is, then there is no students in the class, and thus the class is empty,
       * triggering the message. */
      return (
        <View
          style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>

          <Image
            source={require('assets/emptyStateIdeas/ghostGif.gif')}
            style={{
              width: 300,
              height: 150,
              resizeMode: 'contain',
            }}
          />

          <Text
            style={{
              fontSize: 30,
              color: colors.primaryDark,
              flexDirection: "row",
            }}
          >
            {strings.EmptyClass}
          </Text>

          <QcActionButton
            text={strings.AddStudentButton}
            onPress={() => this.props.navigation.push("ClassEdit", {
              classID: currentClassID,
              currentClass
            })} />
        </View>
      )
    }


    else {

      return (
        <ScrollView style={styles.container}>
          <FlatList
            data={currentClass.students}
            keyExtractor={(item) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item }) => (
              <StudentCard
                key={item.id}
                studentName={item.name}
                background={colors.white}
                profilePic={studentImages.images[item.profileImageID]}
                currentAssignment={item.currentAssignment}
                onPress={() =>
                  this.props.navigation.push("StudentProfile", {
                    studentID: item.ID,
                    currentClass: currentClass,
                    classID: currentClassID
                  })
                }
              />
            )}
          />
        </ScrollView>
      );
    }

  }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 3
  },
  classTitle: {
    color: colors.primaryDark,
    fontSize: 25
  }
});

export default ClassMainScreen;