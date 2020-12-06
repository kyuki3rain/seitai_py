import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { leftPosition,rightPosition,makeGame,
    resetGame,initialize,setIntervalId,waitTime,
    blockChange,blockRotateChange,mapUpdate,
    addMino,updatePreBlock,pullMino,setPosition,
    advancePosition,updateMino,resetPreBlock,
    setNextBlock,setAdvanceId,setHoldBlock,addScore,
    timeUpdate,flameUpdate,changeOption,changeSpeed,
    predictPosition,dropPosition,changeFlame,changeWait,changePosition } from "../actions";


const Style = styled.div`
    width:36vw;
    height:24vw;
    background-color:#112d4e;
    position:absolute;
    top:10vw;
    opacity:0.9;
    color:#f9f7f7;
    text-align:center;
    /* padding:4vw 0; */
    box-sizing:border-box;
    display:${props => props.f};
    /* padding:2vw 0 5vw; */
`;

const Button = styled.div`
    width:20vw;
    height:3.5vw;
    font-size:3vw;
    margin:1vw auto;
    box-sizing:border-box;
    :hover{
        border-bottom:0.2vw #f9f7f7 solid;
    }
`;

const Menyu = styled.div`
    display:${props => props.f};
    padding:2vw 0;
`;

const Options = styled.div`
    display:${props => props.f};
    padding:1vw 0;
`;

const Option = styled.div`
    width:32vw;
    height:4vw;
    font-size:3vw;
    margin:1vw auto;
    box-sizing:border-box;
    display:flex;
    justify-content:space-around;
`;

const Tytle = styled.div`
    width:8vw;
    height:3vw;
    font-size:2vw;
    color:#f9f7f7;
    text-align:center;
`;

const Slider = styled.input`
    width:16vw;
    height:3vw;
`;

const Para = styled.input`
    width:4vw;
    height:3vw;
    font-size:2vw;
    background-color:transparent;
    border:none;
    color:#f9f7f7;
    text-align:center;
`;

export const minoForm = [
    [
        1,
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ],
    [
        4,
        [0,0],
        [-1,-1],
        [-1,0],
        [0,1]
    ],
    [
        4,
        [0,0],
        [-1,0],
        [-1,1],
        [0,-1]
    ],
    [
        4,
        [0,0],
        [0,1],
        [0,-1],
        [-1,1]
    ],
    [
        4,
        [0,0],
        [0,1],
        [0,-1],
        [-1,-1]
    ],
    [
        1,
        [0,0],
        [0,1],
        [-1,0],
        [-1,1]
    ],
    [
        4,
        [0,0],
        [0,1],
        [0,-1],
        [0,2]
    ],
    [
        4,
        [0,0],
        [0,1],
        [-1,0],
        [0,-1]
    ],
]

var arr = [1,2,3,4,5,6,7];
var a = arr.length;

const SRSCorrection = [
    //A1
    [
        [0,0],
        [0,-1],
        [1,-1],
        [-2,0],
        [-2,-1],
    ],
    //A2
    [
        [0,0],
        [0,1],
        [1,1],
        [-2,0],
        [-2,1],
    ],
    //B
    [
        [0,0],
        [0,-1],
        [-1,-1],
        [2,0],
        [2,-1],
    ],
    //B
    [
        [0,0],
        [0,-1],
        [-1,-1],
        [2,0],
        [2,-1],
    ],
    //C1
    [
        [0,0],
        [0,-1],
        [1,-1],
        [-2,0],
        [-2,-1],
    ],
    //C2
    [
        [0,0],
        [0,1],
        [1,1],
        [-2,0],
        [-2,1],
    ],
    //D
    [
        [0,0],
        [0,1],
        [-1,1],
        [2,0],
        [2,1],
    ],
    //D
    [
        [0,0],
        [0,1],
        [-1,1],
        [2,0],
        [2,1],
    ],
]

const SRSCorrectionI = [
    //A1
    [
        [0,0],
        [0,-2],
        [0,1],
        [2,1],
        [-1,-2],
    ],
    //A2
    [
        [0,0],
        [0,2],
        [0,-1],
        [-1,2],
        [2,-1],
    ],
    //B
    [
        [0,0],
        [0,-2],
        [0,1],
        [1,-2],
        [-2,1],
    ],
    //B
    [
        [0,0],
        [0,1],
        [0,-2],
        [2,1],
        [-1,-2],
    ],
    //C1
    [
        [0,0],
        [0,-1],
        [0,2],
        [-2,-1],
        [1,2],
    ],
    //C2
    [
        [0,0],
        [0,1],
        [0,-2],
        [1,-2],
        [-2,1],
    ],
    //D
    [
        [0,0],
        [0,2],
        [0,-1],
        [-1,2],
        [-2,-1],
    ],
    //D
    [
        [0,0],
        [0,-1],
        [0,2],
        [-2,-1],
        [1,2],
    ],
]

class Container extends React.Component {
    constructor(props){
        super(props);
        this.count = 0;
        this.holdCount = 0;
        this.flameCount = 0;
        this.state={option:0};
        this.line=0;
        this.stopping = 0;
        this.clear = () => {};
    }
    blockRotate(t){
        let map = JSON.parse(JSON.stringify(this.props.map));
        // let preMap = this.props.preMap;
        let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
        let nextBlock=new Array(4);
        let minoRotate=(this.props.rotate+4+t)%(minoForm[this.props.minoNum][0]);
        for(let i=0;i<4;i++){
            if(preBlock[i][0]>=0){
                map[preBlock[i][0]][preBlock[i][1]]=0;
            }
        }
        for(let i=0;i<4;i++){
            nextBlock[i] = JSON.parse(JSON.stringify(minoForm[this.props.minoNum][i+1]));
            for(let j=0;j<minoRotate;j++){
                nextBlock[i] = [nextBlock[i][1],-nextBlock[i][0]];
                if(this.props.minoNum==6){
                    nextBlock[i][0]++;
                }
            }
        }
        let f = 0;
        let SRSPosition_x,SRSPosition_y;
        if(this.props.minoNum==6){
            for(let j=0;j<5;j++){
                f=0;
                SRSPosition_x = this.props.position[0]+SRSCorrectionI[2*minoRotate+(t<0)?1:0][j][0];
                SRSPosition_y = this.props.position[1]+SRSCorrectionI[2*minoRotate+(t<0)?1:0][j][1];
                for(let i=0;i<4;i++){
                    if(nextBlock[i][0]+SRSPosition_x>=20
                        ||nextBlock[i][0]+SRSPosition_x<0
                        ||nextBlock[i][1]+SRSPosition_y>=10
                        ||nextBlock[i][1]+SRSPosition_y<0){
                            f=1;break;
                    }
                    else{
                        if(map[nextBlock[i][0]+SRSPosition_x][nextBlock[i][1]+SRSPosition_y]!=0){
                            f=1;break;
                        }
                    }
                }
                if(f==0)break;
            }
        }
        else{
            for(let j=0;j<5;j++){
                f=0;
                SRSPosition_x = this.props.position[0]+SRSCorrection[2*minoRotate-(t-1)/2][j][0];
                SRSPosition_y = this.props.position[1]+SRSCorrection[2*minoRotate-(t-1)/2][j][1];
                // console.log(2*minoRotate-(t-1)/2,j,SRSCorrection[2*minoRotate+(t+1)/2][j]);
                for(let i=0;i<4;i++){
                    if(nextBlock[i][0]+SRSPosition_x>=20
                        ||nextBlock[i][0]+SRSPosition_x<0
                        ||nextBlock[i][1]+SRSPosition_y>=10
                        ||nextBlock[i][1]+SRSPosition_y<0){
                            f=1;break;
                    }
                    else{
                        if(map[nextBlock[i][0]+SRSPosition_x][nextBlock[i][1]+SRSPosition_y]!=0){
                            f=1;break;
                        }
                    }
                }
                if(f==0)break;
            }
        }
        if(f==0){
            this.props.changePosition([SRSPosition_x,SRSPosition_y]);
            this.props.blockRotateChange(minoRotate);
            this.props.blockChange(nextBlock);
            this.predict(this.props.block);
        }
    }
    shaffle(){
        while (a) {
            var j = Math.floor( Math.random() * a );
            var t = arr[--a];
            arr[a] = arr[j];
            arr[j] = t;
        }
        return arr;
    }
    blockSet(){
        this.props.setPosition();
        if(this.props.mino.length<14)this.props.addMino();
        this.props.blockRotateChange(0);
        this.props.resetPreBlock();
        this.props.waitTime(0);
        this.holdCount = 0;
        let nextBlock = new Array(4);
        let mino = this.props.mino;
        let p = mino.shift();
        for(let i=0;i<4;i++){
            nextBlock[i] = minoForm[p][i+1];
        }
        this.props.blockChange(nextBlock);
        this.props.pullMino(mino);
        this.props.updateMino(p);
        this.predict(nextBlock);
    }
    Hold(){
        this.props.setHoldBlock();
        this.blockSet();
        this.nextSet();
        this.holdCount = 1;
    }
    gameCheck(){
        let map = JSON.parse(JSON.stringify(this.props.map));
        let zero = new Array(10).fill(0);
        if(map[0][4]!=0&&map[0][5]!=0){
            this.pauseGame();
        }
        else{
            let point = 0;
            for(let i=0;i<20;i++){
                let f=0;
                for(let j=0;j<10;j++){
                    if(map[i][j]==0){f=1;break;}
                }
                if(f==0){
                    point++;
                    map.splice(i,1);
                    map.unshift(zero);
                    this.props.addScore(point);
                    this.line++;
                    if(this.line>=10){
                        this.props.changeSpeed(this.props.advanceSpeed+3);
                        this.line=0;
                    }
                }
            }
            this.props.mapUpdate(map);
        }
    }
    nextSet(){
        let blockBox = new Array(5);
        for(let k=0;k<5;k++){
            blockBox[k] = new Array(4);
            for(let i=0;i<4;i++){
                blockBox[k][i] = new Array(4).fill(0);
            }
            for(let i=0;i<4;i++){
                if(k<4)blockBox[k][minoForm[this.props.mino[k]][i+1][0]+1][minoForm[this.props.mino[k]][i+1][1]+1]=this.props.mino[k];
                else blockBox[k][minoForm[this.props.holdBlock][i+1][0]+1][minoForm[this.props.holdBlock][i+1][1]+1]=this.props.holdBlock;
            }
        }
        this.props.setNextBlock(blockBox);

    }
    positionControl(){
        let map = JSON.parse(JSON.stringify(this.props.map));
        // let preMap = this.props.preMap;
        let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
        for(let i=0;i<4;i++){
            if(preBlock[i][0]>=0){
                map[preBlock[i][0]][preBlock[i][1]]=0;
            }
        }
        let f = 0;
        for(let i=0;i<4;i++){
            if(this.props.position[0]+this.props.block[i][0]+1<20){
                if(map[this.props.position[0]+this.props.block[i][0]+1][this.props.position[1]+this.props.block[i][1]]!=0){
                    f=1;
                    break;
                }
            }
            else{
                f=1;
                break;
            }
        }
        if(f==0){
            this.props.advancePosition();
            this.count = 0;
        }
        else{
            this.props.waitTime(this.props.wait+Math.floor(this.stopping/5)+1);
        }
    }
    Loop(){
        if(this.props.wait>=this.props.maxWait){
            // console.log(this.props.mino);
            this.props.waitTime(0);
            this.gameCheck();
            this.blockSet();
            this.nextSet();
        }else{
            let map = JSON.parse(JSON.stringify(this.props.map));
            // let preMap = this.props.preMap;
            let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
            let f = 0;
            for(let i=0;i<4;i++){
                if(preBlock[i][0]!=this.props.position[0]+this.props.block[i][0]||preBlock[i][1]!=this.props.position[1]+this.props.block[i][1])f = 1;
                if(preBlock[i][0]>=0){
                    map[preBlock[i][0]][preBlock[i][1]]=0;
                }
            }
            if(f==0){
                this.stopping+=1;
            }
            else {
                this.stopping = 0;
            }
            for(let i=0;i<4;i++){
                if(this.props.position[0]+this.props.block[i][0]>=0)map[this.props.position[0]+this.props.block[i][0]][this.props.position[1]+this.props.block[i][1]]=this.props.minoNum;
                preBlock[i]=[this.props.position[0]+this.props.block[i][0],this.props.position[1]+this.props.block[i][1]];
            }
            this.count++;
            this.props.updatePreBlock(preBlock);
            this.props.mapUpdate(map);
        }
        
        this.flameCount++;
        if(this.count >= this.props.gameSpeed/this.props.advanceSpeed){
            this.positionControl();
        }
    }
    time(){
        this.props.timeUpdate([this.props.time[0]+Math.floor((this.props.time[1]+1)/60),(this.props.time[1]+1)%60]);
        this.props.flameUpdate(this.flameCount);
        this.flameCount=0;
    }
    startGame(){
        this.line=0;
        this.props.initialize();
        this.props.makeGame();
        this.props.waitTime(this.props.maxWait);
        let localIntervalId = setInterval(this.Loop.bind(this), 1000/this.props.gameSpeed);
        let localAdvanceId = setInterval(this.time.bind(this), 1000);
        this.props.setIntervalId(localIntervalId);
        this.props.setAdvanceId(localAdvanceId);
        // console.log("start "+ localIntervalId);
        // console.log("start "+ localAdvanceId);
    }
    stopGame(){
        this.props.makeGame();
        let localIntervalId = setInterval(this.Loop.bind(this), 1000/this.props.gameSpeed);
        let localAdvanceId = setInterval(this.time.bind(this), 1000);
        this.props.setIntervalId(localIntervalId);
        this.props.setAdvanceId(localAdvanceId);
        // console.log("start "+ localIntervalId);
        // console.log("start "+ localAdvanceId);
    }
    pauseGame(){
        this.props.resetGame();
        clearInterval(this.props.intervalId);
        clearInterval(this.props.advanceId);
        // console.log("clear "+ this.props.intervalId);
        // console.log("clear "+ this.props.advanceId);
        this.props.setIntervalId(0);
        this.props.setAdvanceId(0);
    }
    serialCheck(list){
        if(!list) return;

        console.log(list);

        if(list[0] === 1 && list[1] === 0 && list[2] === 1){
            if(this.props.minoNum!=5)this.blockRotate(-1);
        }
        if(list[0] === 0 && list[1] === 1 && list[2] === 1){
            if(this.props.minoNum!=5)this.blockRotate(1);
        }
        if(list[0] === 0 && list[1] === 0 && list[2] === 1){
            if(this.holdCount==0){
                let map = JSON.parse(JSON.stringify(this.props.map));
                // let preMap = this.props.preMap;
                let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
                for(let i=0;i<4;i++){
                    if(preBlock[i][0]>=0){
                        map[preBlock[i][0]][preBlock[i][1]]=0;
                    }
                }
                this.props.mapUpdate(map);
                this.Hold();
            }
        }
        if(list[0] === 1 && list[1] === 1 && list[2] === 0){
            this.count+=10;
        }
        if(list[0] === 1 && list[1] === 0 && list[2] === 0){
            let map = JSON.parse(JSON.stringify(this.props.map));
            // let preMap = this.props.preMap;
            let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
            for(let i=0;i<4;i++){
                if(preBlock[i][0]>=0){
                    map[preBlock[i][0]][preBlock[i][1]]=0;
                }
            }
            let f = 0;
            for(let i=0;i<4;i++){
                if(this.props.position[1]+this.props.block[i][1]-1>=0){
                    if(map[this.props.position[0]+this.props.block[i][0]][this.props.position[1]+this.props.block[i][1]-1]!=0){
                        f=1;
                    }
                }
                else{
                    f=1;
                }
            }
            if(f==0){
                this.props.leftPosition();
                this.predict(this.props.block);
            }
        }
        if(list[0] === 0 && list[1] === 1 && list[2] === 0){
            let map = JSON.parse(JSON.stringify(this.props.map));
            // let preMap = this.props.preMap;
            let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
            for(let i=0;i<4;i++){
                if(preBlock[i][0]>=0){
                    map[preBlock[i][0]][preBlock[i][1]]=0;
                }
            }
            let f = 0;
            for(let i=0;i<4;i++){
                if(this.props.position[1]+this.props.block[i][1]+1<10){
                    if(map[this.props.position[0]+this.props.block[i][0]][this.props.position[1]+this.props.block[i][1]+1]!=0){
                        f=1;
                    }
                }
                else{
                    f=1;
                }
            }
            if(f==0){
                this.props.rightPosition();
                this.predict(this.props.block);
            }
        }
        if(list[0] === 1 && list[1] === 1 && list[2] === 1){
            this.props.dropPosition();
            this.props.waitTime(this.props.maxWait-5);
        }
    }
    keyCheck(e){
        console.log(this.props.gamePlay);
        if(e.keyCode == 27){
            if(this.props.gamePlay==1)this.pauseGame();
            else if(this.props.gamePlay==0)this.stopGame();
        }
        if(e.keyCode == 65){
            if(this.props.minoNum!=5)this.blockRotate(-1);
        }
        if(e.keyCode == 68){
            if(this.props.minoNum!=5)this.blockRotate(1);
        }
        if(e.keyCode == 69){
            if(this.holdCount==0){
                let map = JSON.parse(JSON.stringify(this.props.map));
                // let preMap = this.props.preMap;
                let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
                for(let i=0;i<4;i++){
                    if(preBlock[i][0]>=0){
                        map[preBlock[i][0]][preBlock[i][1]]=0;
                    }
                }
                this.props.mapUpdate(map);
                this.Hold();
            }
        }
        if(e.keyCode == 40){
            this.count+=5;
        }
        if(e.keyCode == 37){
            let map = JSON.parse(JSON.stringify(this.props.map));
            // let preMap = this.props.preMap;
            let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
            for(let i=0;i<4;i++){
                if(preBlock[i][0]>=0){
                    map[preBlock[i][0]][preBlock[i][1]]=0;
                }
            }
            let f = 0;
            for(let i=0;i<4;i++){
                if(this.props.position[1]+this.props.block[i][1]-1>=0){
                    if(map[this.props.position[0]+this.props.block[i][0]][this.props.position[1]+this.props.block[i][1]-1]!=0){
                        f=1;
                    }
                }
                else{
                    f=1;
                }
            }
            if(f==0){
                this.props.leftPosition();
                this.predict(this.props.block);
            }
        }
        if(e.keyCode == 39){
            let map = JSON.parse(JSON.stringify(this.props.map));
            // let preMap = this.props.preMap;
            let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
            for(let i=0;i<4;i++){
                if(preBlock[i][0]>=0){
                    map[preBlock[i][0]][preBlock[i][1]]=0;
                }
            }
            let f = 0;
            for(let i=0;i<4;i++){
                if(this.props.position[1]+this.props.block[i][1]+1<10){
                    if(map[this.props.position[0]+this.props.block[i][0]][this.props.position[1]+this.props.block[i][1]+1]!=0){
                        f=1;
                    }
                }
                else{
                    f=1;
                }
            }
            if(f==0){
                this.props.rightPosition();
                this.predict(this.props.block);
            }
        }
        if(e.keyCode === 38){
            this.props.dropPosition();
            this.props.waitTime(this.props.maxWait-5);
        }
    }
    changeMenu(){
        if(this.option){

        }
        else{
            
        }
        // this.props.changeOption();
        this.setState({option:(this.state.option+1)%2});
    }
    predict(block){
        let f;
        let map = JSON.parse(JSON.stringify(this.props.map));
        // let preMap = this.props.preMap;
        let preBlock = JSON.parse(JSON.stringify(this.props.preBlock));
        for(let i=0;i<4;i++){
            if(preBlock[i][0]>=0){
                map[preBlock[i][0]][preBlock[i][1]]=0;
            }
        }
        let prePosition = this.props.position[0];

        do{
            prePosition++;
            f=0;
            for(let i=0;i<4;i++){
                if(prePosition+block[i][0]<20){
                    if(map[prePosition+block[i][0]][this.props.position[1]+block[i][1]]!=0){
                        f=1;
                        break;
                    }
                }
                else{
                    f=1;
                    break;
                }
            }
        }while(f==0);
        prePosition--;
        this.props.predictPosition(prePosition);
    }
    componentDidMount(){
        window.addEventListener("keydown",this.keyCheck.bind(this));
        console.log(this.props.setFlagsFunction);
        this.clear = this.props.setFlagsFunction(this.serialCheck.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener("keydown",this.keyCheck.bind(this));
    }
    render() {
        // const {gameSpeed,gamePlay,intervalId,makeGame,resetGame,initialize,setIntervalId,minoNum,waitTime,wait,blockChange,blockRotateChange} = this.props;
        return (
        <Style f={(this.props.gamePlay)?"none":"block"}>
            <Menyu f={(this.state.option)?"none":"block"}>
                <Button onClick={this.startGame.bind(this)}>最初から</Button>
                <Button onClick={this.stopGame.bind(this)}>途中から</Button>
                <Button onClick={this.changeMenu.bind(this)}>設定</Button>
                <Button onClick={() => {this.clear();this.props.setMode("init");}}>戻る</Button>
            </Menyu>
            <Options f={(this.state.option)?"block":"none"}>
                <Option>
                    <Tytle>flame</Tytle>
                    <Para type={"text"} value={this.props.gameSpeed} onChange={e => this.props.changeFlame(e.target.value)}></Para>
                    <Slider type={"range"} value={this.props.gameSpeed} min={1} max={30} step={1} onChange={e => this.props.changeFlame(e.target.value)}></Slider>
                </Option>
                <Option>
                    <Tytle>猶予</Tytle>
                    <Para type={"text"} value={this.props.maxWait} onChange={e => this.props.changeWait(e.target.value)}></Para>
                    <Slider type={"range"} value={this.props.maxWait} min={1} max={100} step={1} onChange={e => this.props.changeWait(e.target.value)}></Slider>
                </Option>
                <Option>
                    <Tytle>レベル</Tytle>
                    <Para type={"text"} value={this.props.advanceSpeed/3} onChange={e => this.props.changeSpeed(e.target.value*3)}></Para>
                    <Slider type={"range"} value={this.props.advanceSpeed/3} min={1} max={15} step={1} onChange={e => this.props.changeSpeed(e.target.value*3)}></Slider>
                </Option>
                <Button onClick={this.changeMenu.bind(this)}>戻る</Button>
            </Options>
        </Style>
        );
    }
}

export default connect(
    state => state,
    { leftPosition,rightPosition,makeGame,resetGame,
        initialize,setIntervalId,waitTime,blockChange,
        blockRotateChange,mapUpdate,updatePreBlock,
        addMino,pullMino,setPosition,advancePosition,
        updateMino,resetPreBlock,setNextBlock,setAdvanceId,
        setHoldBlock,addScore,timeUpdate,flameUpdate,changeOption,
        changeSpeed,predictPosition,dropPosition,changeFlame,changeWait,changePosition }
)(Container);
