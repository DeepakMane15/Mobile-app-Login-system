import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

const API_URL = 'http://6bc3-223-236-240-169.ngrok.io';

const Authenticate = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const setNull = () => {
        setEmail('');
        setName('');
        setPassword('');
    }
    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
        setNull();
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status === 200) {
                        setMessage(jsonRes.message);
                        
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                        setIsError(true);
                        setMessage(jsonRes.message);
                    } else {
                        onLoggedIn(jsonRes.token);
                        setIsError(false);
                        setMessage(jsonRes.message);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (<ImageBackground source={require('../public/images/gradient-back.jpeg')}
        style={styles.image} >
             <View style={styles.card} >
             <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
             <View style={styles.form}>
             <View style={styles.inputs}>
             <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail} value={email}></TextInput>
             {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name}></TextInput>}
             <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword} value={password}></TextInput>
             <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : message}</Text>
             <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>{isLogin ? 'Log in' : 'Sign up'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.buttonAltText}> {isLogin ? "Don't have an account ? " : 'already have an account? '}
                        <Text  onPress={onChangeHandler}>
<Text style={styles.buttonAlt1Text}>{isLogin ? 'create one.' : 'login here.'}</Text>
                             </Text>
                        </Text>
                       
                 </View>
                 </View>

             </View>

        </ImageBackground >
                                                    );
};

                                                    const styles = StyleSheet.create({
                                                        image: {
                                                        flex: 1,
                                                    width: '100%',
                                                    alignItems: 'center',
    },
                                                    card: {
                                                        flex: 1,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                                    width: '80%',
                                                    marginTop: '40%',
                                                    borderRadius: 20,
                                                    maxHeight: 380,
                                                    paddingBottom: '30%',
    },
                                                    heading: {
                                                        fontSize: 30,
                                                    fontWeight: 'bold',
                                                    marginLeft: '10%',
                                                    marginTop: '5%',
                                                    marginBottom: '30%',
                                                    color: 'black',
    },
                                                    form: {
                                                        flex: 1,
                                                    justifyContent: 'space-between',
                                                    paddingBottom: '5%',
    },
                                                    inputs: {
                                                        width: '100%',
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingTop: '10%',
    },
                                                    input: {
                                                        width: '80%',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: 'black',
                                                    paddingTop: 10,
                                                    fontSize: 16,
                                                    minHeight: 40,
    },
                                                    button: {
                                                        width: '80%',
                                                    backgroundColor: 'black',
                                                    height: 40,
                                                    borderRadius: 50,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginVertical: 5,
    },
                                                    buttonText: {
                                                        color: 'white',
                                                    fontSize: 16,
                                                    fontWeight: '400'
    },
                                                    buttonAlt: {
                                                    justifyContent: 'center',
                                                    color:'blue',
                                                    alignItems: 'center',
                                                    marginVertical: 5,
    },
                                                    buttonAltText: {
                                                        color: 'blue',
                                                    fontSize: 16,
                                                    fontWeight: '400',
                                                    marginTop:20
    },
    buttonAlt1Text: {
        color: 'blue',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 20,

},
                                                    message: {
                                                        fontSize: 16,
                                                    marginVertical: '5%',
    },
});

                                                    export default Authenticate;