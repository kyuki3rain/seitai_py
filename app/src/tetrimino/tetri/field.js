import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Style = styled.div`
    width:20vw;
    margin:0vw 2vw;
    height:calc(40vw);
    border:4px #112d4e solid;
`;

const Rect = styled.div`
    width:2vw;
    height:2vw;
    border:1px ${props => props.pred} solid;
    box-sizing:border-box;
    /* margin:-1px; */
    background-color:${props => props.color};
`;

const Boxrow = styled.div`
    display:flex;
    flex-direction:row;
    /* padding:0 10px; */
`;

class Container extends React.Component {
    returnColor(f){
        switch(f){
            case 0:
                return "white";
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
            case 8:
                return "#dbe2ef";
            default:
                return "black";
        }
    }
    returnColor2(f,g){
        if(g!=0)f=8;
        switch(f){
            case 0:
                return "white";
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
            case 8:
                return "#dbe2ef";
            default:
                return "black";
        }
    }
    render() {
        const boxrow = [];
        for(let i=0;i<20;i++){
            const boxcol = [];
            for(let j=0;j<10;j++){
                boxcol.push(<Rect color={this.returnColor(this.props.map[i][j])} pred={this.returnColor2(this.props.predictPos[i][j],this.props.map[i][j])} key={j}></Rect>);
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
    state => ({ map:state.map,predictPos:state.predictPos }),
    {  }
)(Container);
