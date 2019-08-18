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

        let account = await this.auth.createUserWithEmailAndPassword(email, password);

        //Creates the firestore object with an ID that matches this one
        let ID = account.user.uid;
        accountObject.ID = ID;
        if (isTeacher === true) {

            let ref = this.teachers.doc(ID);
            this.batch.set(ref, accountObject);
            await this.batch.commit();
            this.logEvent("TEACHER_SIGN_UP");
            return ID;

        } else {

            let ref = this.students.doc(ID);
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
            let account = await this.auth.signInWithEmailAndPassword(email, password);
            return account.user;
        } catch (err) {
            return -1;
        }

    }

    //This function takes in a user's email and sends them a code to reset their password (not async)
    static sendForgotPasswordCode(email) {

        this.auth.sendPasswordResetEmail(email);

    }

    //This functions will log out whatever user is currently signed into the device
    static logOut() {

        this.logEvent("LOG_OUT");
        this.auth.signOut();

    }

    //This function will take in an ID of a teacher and return that teacher object.
    //Will return -1 if the document does not exist
    static async getTeacherByID(ID) {

        let teacher = await this.teachers.doc(ID).get();
        if (teacher.exists) {
            return teacher.data();
        } else {
            return -1;
        }

    }

    //This function will take in an ID of a student and return that student's object
    //Will return -1 if the document does not exist
    static async getStudentByID(ID) {

        let student = await this.students.doc(ID).get();
        if (student.exists) {
            return student.data();
        } else {
            return -1;
        }

    }

    //This function will take in an ID of a class and return that class object
    //Will return -1 if the document does not exist
    static async getClassByID(ID) {

        let classByID = await this.classes.doc(ID).get();
        if (classByID.exists) {
            return classByID.data();
        } else {
            return -1;
        }

    }

    //This function will take in an array of class IDs and return an array of class objects that'll
    //be fetched from firestore
    static async getClassesByIDs(classIDs) {

        let arrayOfClassObjects = await classIDs.map((classID) => {
            const classObject = await this.getClassByID(classID);
            return classObject;
        });

        return arrayOfClassObjects;

    }

    //This function will take in an ID of a teacher document, and an updated object, and will update
    //the document in firestore accordingly
    static async updateTeacherObject(ID, newObject) {

        let docRef = this.teachers.doc(ID);
        this.batch.update(docRef, newObject);
        await this.batch.commit();
        return 0;

    }

    //This function will take in an ID of a class document, and an updated object, and will update the
    //document in firestore accordingly
    static async updateClassObject(ID, newObject) {

        let docRef = this.classes.doc(ID);
        this.batch.update(docRef, newObject);
        await this.batch.commit();
        return 0;

    }

    //This function will take in an ID of a student document, and an updated object, and will update the
    //document in firestore accordingly
    static async updateStudentObject(ID, newObject) {

        let docRef = this.students.doc(ID);
        this.batch.update(docRef, newObject);
        await this.batch.commit();
        return 0;

    }

    //This function will take in a new class object, and a teacher object and create a new class
    //that belongs to that teacher in the firestore database. It will do this by creating a new document
    //in the "classes" collection, then linking that class to a certain teacher by relating them through
    //IDs
    static async addNewClass(newClassObject, teacherID) {

        //Adds the new class document and makes sure it has a reference to its own ID
        let newClass = await this.classes.add(newClassObject);
        await this.updateClassObject(newClass.id, {
            ID: newClass.id
        });
        //Appends the class ID to the array of classes belonging to this teacher
        let ref = this.teachers.doc(teacherID);
        this.batch.update(ref, {
            currentClassID: newClass.id,
            classes: firebase.firestore.FieldValue.arrayUnion(newClass.id)
        })
        await this.batch.commit();
        return 0;

    }

    //This method will allow a student to join a class. It will take in a studentID and a classID.
    //It will add that student to the array of students within the class object. Then it will add
    //the classID to the array of classes withint the student object. Then it will finally update
    //the "currentClassID" property within the student object. If the class does not exist, the method
    //will return a value of -1, otherwise it will return 0;
    static async joinClass(studentID, classID) {

        const classToJoin = await this.classes.doc(classID).get();
        if (!classToJoin.exists) {
            return -1;
        }

        await this.updateClassObject(classID, {
            students: firebase.firestore.FieldValue.arrayUnion(studentID)
        });

        await this.updateStudentObject(studentID, {
            classes: firebase.firestore.FieldValue.arrayUnion(classID),
            currentClassID: classID
        });

        return 0;

    }

    //This function will take in a student ID & a class ID and remove the connection between that student
    //and the class 
    static async removeStudent(classID, studentID) {

        //First removes the student from the class
        let theClass = await this.getClassByID(classID);
        let arrayOfClassStudents = theClass.students;
        let indexOfStudent = arrayOfClassStudents.findIndex((student) => {
            return student.ID === studentID;
        });
        arrayOfClassStudents.splice(indexOfStudent, 1);
        await this.updateClassObject(classID, {
            students: arrayOfClassStudents
        });

        //Then removes the class's reference from the student's array of classes
        let theStudent = await this.getStudentByID(studentID);
        let arrayOfStudentClasses = theStudent.classes;
        let indexOfClass = arrayOfStudentClasses.findIndex((eachClass) => {
            return eachClass === classID;
        });
        arrayOfClassStudents.splice(indexOfClass, 1);
        await this.updateStudentObject(studentID, {
            classes: arrayOfClassStudents
        });

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