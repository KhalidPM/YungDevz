import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentCard from 'components/StudentCard';
import QcActionButton from 'components/QcActionButton';
import { addAttendance } from 'model/actions/addAttendance';
import colors from 'config/colors';
import studentImages from 'config/studentImages'
import strings from 'config/strings';
import mapStateToCurrentClassProps from 'screens/TeacherScreens/helpers/mapStateToCurrentClassProps'
import QcParentScreen from 'screens/QcParentScreen';
import FirebaseFunctions from 'config/FirebaseFunctions';

export class ClassAttendanceScreen extends QcParentScreen {

    state = {
        isLoading: true,
        currentClass: '',
        currentClassID: '',
        students: '',
        absentStudents: [],
        selectedDate: new Date().toLocaleDateString("en-US")
    }

    //Sets the screen name for firebase analytics and gets the initial students
    async componentDidMount() {

        FirebaseFunctions.setCurrentScreen("Class Attendance Screen", "ClassAttendanceScreen");

        const { currentClassID } = this.props.navigation.state.params.teacher;
        const currentClass = await FirebaseFunctions.getClassByID(currentClassID);
        const { students } = currentClass;
        const { selectedDate } = this.state;
        const absentStudents = await FirebaseFunctions.getAbsentStudentsByDate(selectedDate, currentClassID);

        this.setState({
            isLoading: false,
            currentClass,
            currentClassID,
            students,
            absentStudents
        });

    }

    //This method will set the student selected property to the opposite of whatever it was
    //by either removing the student or adding them to the array of selected students
    //based on if they are already in the array or not
    onStudentSelected(id) {
        let tmp = this.state.absentStudents;

        if (tmp.includes(id)) {
            tmp.splice(tmp.indexOf(id), 1);
        } else {
            tmp.push(id);
        }

        this.setState({
            absentStudents: tmp,
            selectedDate: this.state.selectedDate
        });

    }

    //fetches the current selected students and the current selected date and adds the current
    //attendance to the database
    async saveAttendance() {

        let { absentStudents, selectedDate, currentClassID } = this.state;
        await FirebaseFunctions.saveAttendanceForClass(absentStudents, selectedDate, currentClassID);
        this.refs.toast.show(strings.AttendanceFor + date + strings.HasBeenSaved, DURATION.LENGTH_SHORT);

    }

    render() {

        return (
            //The scroll view will have at the top a date picker which will be defaulted to the current
            //date and it will allow the user to view previous day's attendance along with setting
            //and changing them. The max possible date will be the current date.
            <ScrollView style={styles.container}>
                <View style={styles.saveAttendance}>
                    <DatePicker
                        date={this.state.selectedDate}
                        confirmBtnText={strings.Confirm}
                        cancelBtnText={strings.Cancel}
                        format="MM-DD-YYYY"
                        duration={300}
                        style={{ paddingLeft: 15 }}
                        maxDate={new Date().toLocaleDateString("en-US")}
                        customStyles={{ dateInput: { borderColor: colors.lightGrey } }}
                        onDateChange={(date) => {
                            this.setState({
                                selectedDate: date,
                                isLoading: true
                            });
                            const absentStudents = await FirebaseFunctions.getAbsentStudentsByDate(this.state.selectedDate, this.state.currentClassID);
                            this.setState({
                                isLoading: false,
                                absentStudents
                            });
                        }}
                    />
                    <QcActionButton
                        text={strings.SaveAttendance}
                        onPress={() => this.saveAttendance()}
                        style={{ paddingRight: 30 }}
                        screen={this.name}
                    />
                </View>
                {this.state.students.map((student) => {
                    let color = this.state.absentStudents.includes(student.ID) ? colors.red : colors.green;
                    return (
                        <StudentCard
                            studentName={student.name}
                            profilePic={studentImages.images[student.profileImageID]}
                            currentAssignment={student.currentAssignment}
                            background={color}
                            onPress={() => this.onStudentSelected(student.ID)}
                        />
                    );
                })}
                <Toast ref="toast" />
            </ScrollView>);
    }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    saveAttendance: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGrey,
        flex: 1
    }
});

export default ClassAttendanceScreen;