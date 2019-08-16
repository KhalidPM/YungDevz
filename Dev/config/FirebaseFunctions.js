//This class will contain all the functions that interact with the react native firebase
//library
import firebase from 'react-native-firebase';

export default class FirebaseFunctions {

    //References that'll be used throughout the class's static functions
    static database = firebase.firestore();
    static batch = this.database.batch();
    static teachers = this.database.collection('teachers');
    static students = this.database.collection('students');
    static classes = this.database.collection('classes');
    static auth = firebase.auth();
    static analytics = firebase.analytics();

    //Methods that can be called from any other class

    //This functions will take in an email and a password & will sign a user up using 
    //firebase authentication (will also sign the user in). Additionally, it will take
    //in a boolean to determine whether this is a student or a teacher account. Based
    //on that info, it will call another function to create the designated account object
    //for this account (with the same ID). The function returns that ID
    static async signUp(email, password, isTeacher, accountObject) {

        const account = await this.auth.createUserWithEmailAndPassword(email, password);

        //Creates the firestore object with an ID that matches this one
        const ID = account.user.uid;
        accountObject.ID = ID;
        if (isTeacher === true) {

            const ref = this.teachers.doc(ID);
            this.batch.set(ref, accountObject);
            await this.batch.commit();
            this.logEvent("TEACHER_SIGN_UP");
            return ID;

        } else {

            const ref = this.students.doc(ID);
            this.batch.set(ref, accountObject);
            await this.batch.commit();
            this.logEvent("STUDENT_SIGN_UP");
            return ID;

        }

    }

    //This function will take in a user's email & password and then log them in using Firebase 
    //Authentication. It will then return the account user object that can be used to retrieve info like the
    //student/teacher object, etc. If the info is incorrect, the value -1 will be returned
    static async logIn(email, password) {

        try {
            const account = await this.auth.signInWithEmailAndPassword(email, password);
            return account.user;
        } catch (err) {
            return -1;
        }

    }

    //This function will take in an ID of a teacher and return that teacher object.
    //Will return -1 if the document does not exist
    static async getTeacherByID(ID) {

        const teacher = await this.teachers.doc(ID).get();
        if (teacher.exists) {
            return teacher.data();
        } else {
            return -1;
        }

    }

    //This function will take in an ID of a student and return that student's object
    //Will return -1 if the document does not exist
    static async getStudentByID(ID) {

        const student = await this.students.doc(ID).get();
        if (student.exists) {
            return student.data();
        } else {
            return -1;
        }

    }

    //This function will take in an ID of a class and return that class object
    //Will return -1 if the document does not exist
    static async getClassByID(ID) {

        const classByID = await this.classes.doc(ID).get();
        if (classByID.exists) {
            return classByID.data();
        } else {
            return -1;
        }

    }

    //This function will take in an ID of a teacher document, and an updated object, and will update
    //the document in firestore accordingly
    static async updateTeacherObject(ID, newObject) {

        const docRef = this.teachers.doc(ID);
        this.batch.update(docRef, newObject);
        await this.batch.commit();
        return 0;

    }

    //This function will take a name of an event and log it to firebase analytics (not async)
    static logEvent(eventName) {

        this.analytics.logEvent(eventName);

    }

    //This function will take in the name of a screen as well as the name of the class and set the
    //current screen to those inputs in firebase analytics (not async)
    static setCurrentScreen(screenName, screenClass) {

        this.analytics.setCurrentScreen(screenName, screenClass);

    }

}