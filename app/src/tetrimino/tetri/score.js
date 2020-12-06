import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {setAdvanceId} from "../actions";

const Style = styled.div`
    height:25vw;
    width:10vw;
    border:3px black solid;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    justify-content:center;
`;

const Text = styled.div`
    color:white;
    font-size:2.4vw;
    margin:0vw 0;
    text-align:center;
`;

function getdoubleDigestNumer(number) {
    return ("0" + number).slice(-2);
}

class Container extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {  } = this.props;
        return (
        <Style>
            <Text>Score</Text>
            <Text>{this.props.score}</Text>
            <Text>Time</Text>
            <Text>{getdoubleDigestNumer(this.props.time[0])}:{getdoubleDigestNumer(this.props.time[1])}</Text>
            <Text>Frame</Text>
            <Text>{this.props.flame}</Text>
        </Style>
        );
    }
}

export default connect(
    state => ({ score:state.score,time:state.time,flame:state.flame }),
    {  }
)(Container);
