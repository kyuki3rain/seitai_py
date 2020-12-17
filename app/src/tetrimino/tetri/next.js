import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setIntervalId,resetGame,setAdvanceId } from '../actions';
import {minoForm} from "./menu";

const Style = styled.div`
    width:10vw;
    height:40vw;
`;

const Box = styled.div`
    width:7.5vw;
    height:7.5vw;
    border:3px black solid;
    box-sizing:border-box;
    margin:0 0 1vw;
    padding:1vw 0 0;
    background-color:#dbe2ef;
`;

const Button = styled.button`
    width:6vw;
    height:3vw;
    border:3px black solid;
    box-sizing:border-box;
    margin:0 0 0 0.75vw;
    font-size:1.5vw;
`;

const Rect = styled.div`
    width:1.5vw;
    height:1.5vw;
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
    pauseGame(){
        this.props.resetGame();
        clearInterval(this.props.intervalId);
        clearInterval(this.props.advanceId);
        this.props.setIntervalId(0);
        this.props.setAdvanceId(0);
        // console.log("clear "+ this.props.intervalId);
        // console.log("clear "+ this.props.advanceId);
    }
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
    color(k){
        let blockBox = this.props.blockBox
        for(let i=0;i<4;i++){
            blockBox[minoForm[this.props.mino[k]][i+1][0]+1][minoForm[this.props.mino[k]][i+1][1]+1]=this.props.mino[k];
        }
        this.props.setNextBlock(blockBox);
    }
    render() {
        const box=[];
        for(let k=0;k<4;k++){
            
            const boxrow = [];
            for(let i=0;i<4;i++){
                const boxcol = [];
                for(let j=0;j<4;j++){
                    boxcol.push(<Rect color={this.returnColor(this.props.blockBox[k][i][j])} key={j}></Rect>);
                }
                boxrow.push(<Boxrow key={i}>{boxcol}</Boxrow>);
            }
        box.push(<Box key={k}>{boxrow}</Box>);
        }
        return (
        <Style>
            {box}
            <Button onClick={this.pauseGame.bind(this)}>pause</Button>
        </Style>
        );
    }
}

export default connect(
    state => ({ intervalId:state.intervalId,mino:state.mino,blockBox:state.blockBox,advanceId:state.advanceId }),
    { setIntervalId,resetGame,setAdvanceId }
)(Container);
