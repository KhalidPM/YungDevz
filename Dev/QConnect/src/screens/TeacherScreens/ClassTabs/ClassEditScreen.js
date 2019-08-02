import React from "react";
import { ScrollView, View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, Text, Alert, Share, TextInput } from "react-native";
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import { bindActionCreators } from "redux";
import { deleteStudent } from "model/actions/deleteStudent";
import { addStudent } from "model/actions/addStudent";
import studentImages from "config/studentImages";
import { Icon } from 'react-native-elements';
import strings from "config/strings";
import mapStateToCurrentClassProps from "screens/TeacherScreens/helpers/mapStateToCurrentClassProps";
import QcParentScreen from "screens/QcParentScreen";
import QcActionButton from "components/QcActionButton";
import Toast, { DURATION } from 'react-native-easy-toast'

export class ClassEditScreen extends QcParentScreen {

  name = "ClassEditScreen";

  // ---------- Helpers to initialize random suggested student images --------------
  //  2 gender neutral images, one female, and one male
  // -------------------------------------------------------------------------------
  getRandomGenderNeutralImage = () => {
    index = Math.floor(Math.random() * Math.floor(studentImages.genderNeutralImages.length));
    imageIndex = studentImages.genderNeutralImages[index];
    return imageIndex;
  }

  getRandomMaleImage = () => {
    index = Math.floor(Math.random() * Math.floor(studentImages.maleImages.length));
    imageIndex = studentImages.maleImages[index];
    return imageIndex;
  }

  getRandomFemaleImage = () => {
    index = Math.floor(Math.random() * Math.floor(studentImages.femaleImages.length));
    imageIndex = studentImages.femaleImages[index];
    return imageIndex;
  }

  initialDefaultImageId = this.getRandomGenderNeutralImage()

  getHighlightedImages = () => {
    defaultImageId = this.initialDefaultImageId;

    // get a second gender neutral image, make sure it is different than the first one
    do {
      secondGenericImageId = this.getRandomGenderNeutralImage();
    } while (secondGenericImageId === defaultImageId)

    //initialize the array of suggested images
    let proposedImages = [defaultImageId, secondGenericImageId, this.getRandomFemaleImage(), this.getRandomMaleImage()]
    return proposedImages;
  }

  state = {
    newStudentName: "",
    modalVisible: false,
    profileImageId: this.initialDefaultImageId,
    highlightedImagesIndices: this.getHighlightedImages(),
  }

  //Tests whether the entered input is already a student that exists in the given class
  studentNameExists() {
    if (!this.props.students) { return false; }

    const students = this.props.students;
    const input = this.state.newStudentName.trim();

    //Will search if there is a student with the same name or not, if there is, it will return the 
    //index, if there is not, it will return -1.
    const studentId = students.findIndex((student) => {
      return student.name === input;
    });

    return studentId !== -1;
  }

  // ----------- Redux function to persist the added student ------------------------
  addNewStudent(classId) {
    if (!this.state.newStudentName) {
      Alert.alert(strings.Whoops, strings.PleaseInputAName);
    } else if (this.studentNameExists()) {
      Alert.alert(strings.Whoops, strings.ThereIsAlreadyAStudentWithThatName);
    } else {
      this.props.addStudent(
        classId,
        {
          studentInfo: {
            name: this.state.newStudentName,
            imageId: this.state.profileImageId
          }
        }
      );

      this.refs.toast.show(this.state.newStudentName + strings.IsNowAddedToTheClass,
        DURATION.LENGTH_SHORT);

      this.refreshProposedImages();

    }
  }

  refreshProposedImages() {
    this.initialDefaultImageId = this.getRandomGenderNeutralImage();
    this.setState({
      newStudentName: "",
      highlightedImagesIndices: this.getHighlightedImages(),
      profileImageId: this.initialDefaultImageId
    });
  }

  // ------- event handlers of when images are selected or being selected ---------
  onImageSelected(index) {
    let candidateImages = this.state.highlightedImagesIndices;

    if (!this.state.highlightedImagesIndices.includes(index)) {
      candidateImages.splice(0, 1);
      candidateImages.splice(0, 0, index);
    }

    this.setState({
      profileImageId: index,
      highlightedImagesIndices: candidateImages
    })

    this.setModalVisible(false);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // ------- Render method: Main entry to render the screen's UI ------------------

  render() {
    const { deleteStudent, addStudent, classId, students } = this.props;

    if (this.state.highlightedImagesIndices.length == 0) {
      return false;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.shareCodeContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18 }}>{strings.AddStudents}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 14 }}>{strings.YourClassCode}</Text>
                <Text style={{ fontSize: 12, color: colors.primaryDark }}>{classId}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Icon
                  raised
                  name='share'
                  type='font-awesome'
                  color={colors.primaryDark}
                  size={15}
                  onPress={() => { Share.share({ message: strings.JoinMyClass + classId }) }} />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Text style={[styles.inputName, { paddingBottom: 5 }]}>{strings.EnterYourStudentsName}</Text>
                <TextInput
                  placeholder={strings.StudentName}
                  onChangeText={newStudentName => this.setState({ newStudentName })}
                  value={this.state.newStudentName}
                  style={{ paddingBottom: 10 }}
                />
              </View>
              <QcActionButton
                text={strings.AddStudent}
                onPress={() => this.addNewStudent(classId)}
                screen={this.name}
                style={{margin: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0}}
              />
            </View>
          </View>
          <ScrollView style={styles.flatList}>
            <FlatList
              data={students}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <StudentCard
                  key={index}
                  studentName={item.name}
                  profilePic={studentImages.images[item.imageId]}
                  background={colors.white}
                  onPress={() => { }}
                  comp={<Icon
                    name='user-times'
                    size={25}
                    type='font-awesome'
                    color={colors.primaryLight}
                    onPress={() => {
                      Alert.alert(
                        'Delete Student',
                        'Are you sure you want to delete this student?',
                        [
                          {
                            text: 'Delete', onPress: () => {
                              deleteStudent(
                                classId,
                                item.id
                              );
                            }
                          },

                          { text: 'Cancel', style: 'cancel' },
                        ]
                      );
                    }} />} />
              )} />
          <Toast ref="toast" />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  flatList: {
    flex: 1
  },
  shareCodeContainer: {
    flexDirection: "column",
    backgroundColor: colors.white,
    flex: 0.25,
  },
});

const mapStateToProps = (state) => {
  return mapStateToCurrentClassProps(state)
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteStudent,
      addStudent
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassEditScreen);
