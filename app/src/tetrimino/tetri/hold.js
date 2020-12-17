import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Style = styled.div`
    width:10vw;
    height:10vw;
    border:3px black solid;
    box-sizing:border-box;
    margin:0;
    padding:1vw 0 0;
    background-color:#dbe2ef;
`;

const Rect = styled.div`
    width:2vw;
    height:2vw;
    border:1px #dbe2ef solid;
    box-sizing:border-box;
    background-color:${props => props.color};
`;

const Boxrow = styled.div`
    display:flex;
    flex-direction:row;
    padding:0 10px;
`;


class Container extends React.Component {
    returnColor(f){
        switch(f){
            case 0:
                return "transparent";
            case 1:
                return "#ff2800";
            case 2:
                return "#35a16b";
            case 3:
                return "#ff9900";
            case 4:
                return "#0041ff";
            case 5:
                return "#faf500";
            case 6:
                return "#66ccff";
            case 7:
                return "#9a0079";
            default:
                return "black";
        }
    }
    render() {
        const boxrow = [];
        for(let i=0;i<4;i++){
            const boxcol = [];
            for(let j=0;j<4;j++){
                boxcol.push(<Rect color={this.returnColor(this.props.blockBox[4][i][j])} key={j}></Rect>);
            }
            boxrow.push(<Boxrow key={i}>{boxcol}</Boxrow>);
        }
        return (
        <Style>
            {boxrow}
        </Style>
        );
    }
}

export default connect(
    state => ({ blockBox:state.blockBox }),
    {  }
)(Container);
