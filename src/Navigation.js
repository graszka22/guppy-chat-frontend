import NavigationActions from "@react-navigation/core/dist/NavigationActions";

let navigator = null;

export const setNavigator = nevNavigator => {
    navigator = nevNavigator;
}

export const navigate = routeName => {
    console.log(navigator);
    navigator.dispatch(NavigationActions.navigate({ routeName }));
}