import {View, Text, TextInput, Switch, TouchableOpacity, TouchableHighlight, ListView, StyleSheet, Dimensions} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
import area from '../../data/area.json';

export default class AddressAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            telephone: this.props.data.telephone,
            trueSwitchIsOn: this.props.data.isDefault
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <TouchableOpacity style={styles.header_back_box} onPress={this._goBack.bind(this)}>
                        <Icon style={styles.back_icon} name="ios-arrow-back"/>
                        <Text style={styles.back_text}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.header_title}>{this.props.title}</Text>
                    <TouchableOpacity style={styles.header_submit} onPress={this._submit.bind(this)}>
                        <Text style={styles.back_text}>保存</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={[styles.item, styles.border_top, styles.backgound_white,
                                styles.border_bottom, styles.padding_left_and_right]}>
                        <Text style={styles.item_text1}>收货人</Text>
                        <TextInput style={styles.item_input} placeholder="姓名" value={this.state.name}/>
                        <Text style={styles.item_text2} onPress={this._emptyName.bind(this)}>清空</Text>
                    </View>
                    <View style={[styles.item, styles.backgound_white,
                                styles.border_bottom, styles.padding_left_and_right]}>
                        <Text style={styles.item_text1}>手机号</Text>
                        <TextInput style={styles.item_input} placeholder="手机号" value={this.state.telephone}/>
                        <Text style={styles.item_text2} onPress={this._emptyTelephone.bind(this)}>清空</Text>
                    </View>
                    <View style={[styles.item, styles.backgound_white,
                                styles.border_bottom, styles.padding_left_and_right]}>
                        <Text style={styles.item_text1}>所在地区</Text>
                        <Text style={styles.item_text2} onPress={this._showAreaPicker.bind(this)}>选择</Text>
                    </View>
                    <View style={[styles.item_address, styles.backgound_white,
                                styles.border_bottom, styles.padding_left_and_right]}>
                        <TextInput style={styles.item_address_input} multiline={true} placeholder="详细地址"/>
                    </View>
                    <View style={[styles.item, styles.backgound_white, styles.border_top, styles.border_bottom,
                        styles.margin_top, styles.padding_left_and_right]}>
                        <Text style={styles.item_text1}>设为默认</Text>
                        <Switch onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                                value={this.state.trueSwitchIsOn} />
                    </View>
                </View>
            </View>
        );
    }

    _goBack() {
        const {navigator} = this.props;

        if (navigator) {
            navigator.pop();
        }
    }

    _submit() {

    }

    _emptyName() {
        this.setState({
            name: ''
        });
    }

    _emptyTelephone() {
        this.setState({
            telephone: ''
        });
    }

    _showAreaPicker() {
        let me = this;
        Picker.init({
            pickerData: me._createAreaData(),
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            pickerConfirmBtnColor: [0, 0, 0, 1],
            pickerCancelBtnColor: [0, 0, 0, 1],
            pickerToolBarFontSize: 18,
            pickerFontSize: 20,
            selectedValue: ['上海', '上海', '杨浦区'],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    margin_top: {
        marginTop: 10
    },
    border_top: {
        borderTopWidth: 1,
        borderTopColor: '#000'
    },
    border_bottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    padding_left_and_right: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    backgound_white: {
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 64,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff'
    },
    header_back_box: {
        position: 'absolute',
        left: 12,
        top: 32,
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2
    },
    header_title: {
        width: width - 120,
        textAlign: 'center',
        fontSize: 16
    },
    header_submit: {
        position: 'absolute',
        right: 12,
        top: 32,
    },
    back_icon: {
        color: '#999',
        fontSize: 20,
        marginRight: 5
    },
    back_text: {
        color: '#999',
        fontSize: 16,
    },
    body: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    item: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item_input: {
        height: 50,
        width: 250,
        fontSize: 16
    },
    item_text1: {
        fontSize: 16,
    },
    item_text2: {
        fontSize: 16,
        color: '#666'
    },
    item_address_input: {
        width: width - 20,
        height: 100,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16
    }
});