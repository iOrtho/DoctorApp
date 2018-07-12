import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import UserAction from 'app/store/actions/user';
import OfficeAction from 'app/store/actions/office';
import store from 'app/store/store';
import Router from 'app/router';
import { auth, database } from 'app/config/firebase';

export default class App extends React.Component {

    /**
     * Set listener on the auth status of the user to sync the store's user model
     */
    componentDidMount() {
        const Users = database.collection('Users');
        const {authIsChecked} = store.getState().user;
        this.loadOfficeDetails();

        auth().onAuthStateChanged((user) => {
            if(user) {
                Users.where('auth_id', '==', user.uid).onSnapshot(snap => {
                    snap.docChanges().forEach(change => {
                        const data = {
                            id: change.doc.id,
                            ...change.doc.data(),
                            authIsChecked: true,
                        };

                        store.dispatch(UserAction.setUserModel(data));
                    });
                });

            }else {
                store.dispatch(UserAction.resetUserModel());
                store.dispatch(UserAction.setAuthChecked());
            }

        });
    }

    /**
     * Set a listener on the office model and sync it to the store
     * @return {Void} 
     */
    loadOfficeDetails() {
        const {id} = store.getState().office;
        const Offices = database.collection('Offices');

        Offices.doc(id).onSnapshot(doc => {
            store.dispatch(OfficeAction.setOfficeModel({
                ...doc.data(),
                ready:true,
            }));
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});