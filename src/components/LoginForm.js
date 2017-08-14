import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false }

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({error: '',loading: true})
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSucess.bind(this))
                    .catch(this.onLoginFail.bind(this))
            })
    }
    onLoginFail() {
        this.setState({
            error: 'Authentication Failed',
            loading: false,
        })
    }
    onLoginSucess() {
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }
            return (
                <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
            )
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder={"user@gmail.com"}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        label={"Email: "}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        placeholder={"Password"}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        label={"Password: "}

                    />
                </CardSection>
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    }
}

export default LoginForm;