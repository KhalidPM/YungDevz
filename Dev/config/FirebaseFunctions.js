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
    //for this account (with the same ID)
    static async signUp(email, password, isTeacher, accountObject) {

        const account = await this.auth.createUserWithEmailAndPassword(email, password);

        //Creates the firestore object with an ID that matches this one
        const ID = account.user.uid;
        accountObject.ID = ID;
        if (isTeacher === true) {

            const ref = this.teachers.doc(ID);
            this.batch.set(ref, accountObject);
            await this.batch.commit();
            await this.analytics.logEvent("TEACHER_SIGN_UP");
            return 0;

        } else {

            const ref = this.students.doc(ID);
            this.batch.set(ref, accountObject);
            await this.batch.commit();
            await this.analytics.logEvent("STUDENT_SIGN_UP");
            return 0;

        }

    }
}