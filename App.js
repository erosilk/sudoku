import React from "react";
import {
    Home,
    Game
} from "./containers";
import { StackNavigator } from "react-navigation";


const App = StackNavigator({
    Home: {
        screen: Home
    },
    Game: {
        screen: Game
    }
});

export default App;
