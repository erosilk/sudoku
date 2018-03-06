import React from "react";
import {
    Home,
    Game
} from "./containers";
import { StackNavigator } from "react-navigation";

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

const App = StackNavigator({
    Home: {
        screen: mapNavigationStateParamsToProps(Home)
    },
    Game: {
        screen: mapNavigationStateParamsToProps(Game)
    }
});

export default App;
