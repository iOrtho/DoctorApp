import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import UserAction from 'app/store/actions/user';
import OfficeAction from 'app/store/actions/office';
import store from 'app/store/store';
import Router from 'app/router';
import { auth, database } from 'app/config/firebase';

export default class App extends React.Component {

    /**
     * Set listeners on live data
     */
    componentDidMount() {
        this.loadOfficeDetails();
        this.loadUserDetails();
    }

    /**
     * Set a listener on the auth status of the user
     * @return {Void} 
     */
    loadUserDetails() {
        const Users = database.collection('Users');

        auth().onAuthStateChanged((user) => {
            if(user) {
                Users.where('auth_id', '==', user.uid).onSnapshot(snap => {
                    snap.docChanges().forEach(change => {
                        const data = {
                            ...change.doc.data(),
                            id: change.doc.id,
                            authIsChecked: true,
                        };
                        
                        //store.dispatch(UserAction.resetUserModel());
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

    /**
     * Render the component's markup
     * @return {ReactElement} 
     */
    render() {
    
        return (
            <Provider store={store}>
                <Root>
                    <Router />
                </Root>
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