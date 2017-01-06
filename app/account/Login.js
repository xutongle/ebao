import {StyleSheet, AsyncStorage, Dimensions, View, Text, TextInput, AlertIOS} from 'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';

import request from '../common/request';
import config from '../common/config';
import Register from './Register';
import Forget from './Forget';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOrMail: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.signup_box}>
                    <Text style={styles.title}>快速登录</Text>
                    <TextInput placeholder="用户名或邮箱" autoCaptialize={"none"} autoCorrect={false}
                               style={styles.input_field}
                               onChangeText={(text) => {
                                   this.setState({
                                       nameOrMail: text
                                   });
                               }}
                    />
                    <TextInput placeholder="密码" autoCaptialize={"none"} secureTextEntry={true}
                               autoCorrect={false} style={[styles.input_field, styles.margin_top]}
                               onChangeText={(text) => {
                                   this.setState({
                                       password: text
                                   });
                               }}
                    />
                    <Button style={styles.btn} onPress={this._submit.bind(this)}>
                        登录
                    </Button>
                    <View style={[styles.margin_top, styles.text_box]}>
                        <Text style={styles.text} onPress={this._gotoView.bind(this, 'register')}>注册</Text>
                        <Text style={styles.text} onPress={this._gotoView.bind(this, 'forget')}>忘记密码</Text>
                    </View>
                </View>
            </View>
        );
    }

    _submit() {
        let me = this;
        let nameOrMail = this.state.nameOrMail;
        let password = this.state.password;

        if (!nameOrMail) {
            AlertIOS.alert('请输入用户名或邮箱!');
            return;
        }

        if (!password) {
            AlertIOS.alert('请输入密码!');
            return;
        }

        let body = {
            nameOrMail: nameOrMail,
            password: password
        };
        let verifyUrl = config.api.base + config.api.verify;

        request.post(verifyUrl, body).then((data) => {
            if (data && data.success) {
                me.props.afterLogin(data.data);
            } else {
                AlertIOS.alert('获取验证码失败,请检查手机号!');
            }
        }).catch((error) => {
            AlertIOS.alert('获取验证码失败,请检查网络!');
        });
    }

    _gotoView(name) {
        const {navigator} = this.props;

        if (navigator) {
            let info = {
                name : name
            };

            if (name === 'register') {
                info.component = Register;
            } else if (name === 'forget') {
                info.component = Forget;
            }

            navigator.push(info);
        }
    }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    margin_top: {
        marginTop: 10
    },
    signup_box: {
        marginTop: 30,
    },
    title: {
        marginBottom: 20,
        color: '#333',
        fontSize: 20,
        textAlign: 'center'
    },
    input_field: {
        height: 40,
        padding: 5,
        color: '#666',
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4
    },
    btn: {
        padding: 10,
        marginTop: 10,
        backgroundColor: 'transparent',
        borderColor: '#ee735c',
        borderWidth: 1,
        borderRadius: 4,
        color: '#ee735c'
    },
    text_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    text: {
        fontSize: 16
    }
});