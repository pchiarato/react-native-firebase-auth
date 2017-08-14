import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button,Card,CardSection, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import startFirebase from './../config/config';

class App extends Component {
    state = {
        loggedIn: null
    }
    componentWillMount() {
            // credentials are in the config file.
        startFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        })
    }
    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                <Text>Log Out</Text>
                            </Button>
                        </CardSection>
                    </Card>
                )
            case false:
                return <LoginForm />
            default:
                return (
                    <View style={styles.spinnerContainer}>
                        <Spinner size={'large'}/>
                    </View>
                )
            
        } 
    }
    render() {
        return (
            <View style={styles.appContainer}>
                <Header title={'Authentication'} />
                    {this.renderContent()}
            </View>
        );
    };
}
styles = {
    appContainer: {
        flex: 1
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default App;