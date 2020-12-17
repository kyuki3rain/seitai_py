
import React from 'react';
import { Provider } from 'react-redux';
import Tetri from "./tetri/tetrimino";

import { createStore } from "redux";
import reducer from "./reducer";

export const store = createStore(reducer);

export default class Container extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Tetri setFlagsFunction={this.props.setFlagsFunction} setMode={this.props.setMode}></Tetri>
            </Provider>
        );
    };
}