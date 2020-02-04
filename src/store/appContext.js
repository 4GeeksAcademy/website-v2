import React from "react";
import getState from "./store.js";

export const Context = React.createContext(null);

const Store = PassedComponent => {
    class StoreWrapper extends React.Component {
        constructor (props) {
            super(props);
            this.state = getState({
                getStore: () => this.state.store,
                setStore: updatedStore =>
                    this.setState({
                        store: Object.assign(this.state.store, updatedStore)
                    })
            });
        }

        componentDidMount () {
            console.log("data")
            fetch("https://assets.breatheco.de/apis/fake/contact/agenda/LuisRivera")
                .then(response => response.json())
                .then(data => {
                    let {store} = this.state;
                    this.setState({store: {...store, whatever: data}});

                });


        }

        render () {
            return (
                <Context.Provider value={this.state}>
                    <PassedComponent {...this.props} />
                </Context.Provider>
            );
        }
    }
    return StoreWrapper;
};

export default Store;