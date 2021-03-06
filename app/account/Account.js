import {View, Text, ListView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabViewAnimated, TabBarTop} from "react-native-tab-view";

export default class Account extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '去部'},
                {key: '2', title: '积分获取记录'},
                {key: '3', title: '积分消费记录'}
            ],

            dataSource: ds.cloneWithRows([
                {
                    type: '积分充值',
                    time: '2016-11-11 15:52:29',
                    count: 10
                },
                {
                    type: '卖出闲置',
                    time: '2016-11-12 15:52:29',
                    count: 100
                },
                {
                    type: '积分充值',
                    time: '2016-11-13 15:52:29',
                    count: 10
                },
                {
                    type: '卖出闲置',
                    time: '2016-11-12 15:52:29',
                    count: 100
                },
                {
                    type: '积分充值',
                    time: '2016-11-13 15:52:29',
                    count: 100
                },
                {
                    type: '卖出闲置',
                    time: '2016-11-12 15:52:29',
                    count: 10
                },
                {
                    type: '积分充值',
                    time: '2016-11-13 15:52:29',
                    count: 100
                }
            ])
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.header, styles.border_bottom]}>
                    <TouchableOpacity style={styles.header_back_box} onPress={this._goBack.bind(this)}>
                        <Icon style={styles.back_icon} name="ios-arrow-back"/>
                        <Text style={styles.back_text}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.header_title}>我的账户</Text>
                </View>
                <View style={styles.body}>
                    <View style={[styles.current_coin, styles.backgound_white,
                        styles.border_bottom, styles.padding_left_and_right]}>
                        <Text style={styles.current_coin_text1}>当前积分:</Text>
                        <Text style={styles.current_coin_text2}>300</Text>
                    </View>
                    <TabViewAnimated
                        style={[styles.container, styles.coin_info, styles.margin_top, this.props.style]}
                        navigationState={this.state}
                        renderScene={this._renderScene.bind(this)}
                        renderHeader={this._renderHeader}
                        onRequestChangeTab={this._handleChangeTab}
                        initialLayout={initialLayout}
                    />
                </View>
            </View>
        );
    }

    _renderHeader = (props) => {
        return (
            <TabBarTop
                {...props}
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                labelStyle={styles.label}
            />
        )
    };

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return (
                    <View style={styles.container}>
                        <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                                  automaticallyAdjustContentInsets={false} showsVerticalScrollIndicator={false}
                                  renderRow={(rowData, sectionID, rowID) => this._renderItem(rowData, rowID)}
                                  renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.item_separator} />}
                        />
                    </View>
                );
            case '2':
                return (
                    <View style={styles.container}>
                        <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                                  automaticallyAdjustContentInsets={false} showsVerticalScrollIndicator={false}
                                  renderRow={(rowData, sectionID, rowID) => this._renderItem(rowData, rowID)}
                                  renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.item_separator} />}
                        />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.container}>
                        <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                                  automaticallyAdjustContentInsets={false} showsVerticalScrollIndicator={false}
                                  renderRow={(rowData, sectionID, rowID) => this._renderItem(rowData, rowID)}
                                  renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.item_separator} />}
                        />
                    </View>
                );
            default:
                return null;
        }
    }

    _renderItem(rowData, rowID) {
        return (
            <View style={styles.item_container}>
                <View>
                    <Text style={styles.item_type}>{rowData.type}</Text>
                    <Text style={styles.item_time}>{rowData.time}</Text>
                </View>
                <View>
                    <Text style={styles.item_count}>{rowData.count}</Text>
                </View>
            </View>
        );
    }

    _handleChangeTab = (index) => {
        this.setState({
            index,
        });
    }

    _goBack() {
        const {navigator} = this.props;

        if (navigator) {
            navigator.pop();
        }
    }
}

const width = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: width,
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgound_white: {
        backgroundColor: '#fff'
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
    margin_top: {
        marginTop: 10
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
        alignItems: 'center'
    },
    header_title: {
        width: width - 120,
        textAlign: 'center',
        fontSize: 16
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
        backgroundColor: '#ddd'
    },
    tabbar: {
        backgroundColor: '#ee735c'
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    current_coin: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    current_coin_text1: {
        fontSize: 18
    },
    current_coin_text2: {
        fontSize: 18,
        color: '#ee735c'
    },
    coin_info: {
        marginBottom: 48,
    },
    item_separator: {
        height: 1,
        backgroundColor: '#000',
    },
    item_container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item_type: {
        fontSize: 16,
        marginBottom: 2
    },
    item_time: {
        color: '#666',
        fontSize: 15
    },
    item_count: {
        color: '#ee735c',
        fontSize: 15
    }
});