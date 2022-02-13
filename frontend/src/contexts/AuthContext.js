import React, { createContext, Component } from 'react';
import axios from "axios";

export const AuthContext = createContext();

class AuthContextProvider extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            loggedInUser: null,
            isAdmin: false,
        }

        this.checkIfAdmin = this.checkIfAdmin.bind(this);
    }

    setLoggedInUser = (user) => {
        this.setState({ 
            loggedInUser: user // Contains "id", "username" and "enabled"
         });
    }

    isLoggedIn() {
        return this.state.loggedInUser != null;
    }

    componentDidMount() {
        axios
		.get("/rest/whoami", {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;Access-Control-Allow-Origin:*'
			}
		})
		.then((response) => {
			if (response.data !== '') {
				const { id, username, enabled } = response.data;
				const userObject = { id: id, username: username, enabled: enabled };
				this.setState({ user: userObject });
                this.setLoggedInUser(userObject);
                this.checkIfAdmin();
			} else {
				console.log("Status: " + response.status);
			}
		});
    }

    checkIfAdmin(onResponse) {
        axios
            .get("/rest/isAdmin/" + this.state.loggedInUser.id)
            .then((response) => {
                this.setState({ isAdmin: response.data });
            });
    }
    
    render() { 
        return (
            <AuthContext.Provider value={{
                    ...this.state, 
                    setLoggedInUser: this.setLoggedInUser,
                    isLoggedIn: this.isLoggedIn,
                    checkIfAdmin: this.checkIfAdmin,
                    onLoggedIn: this.onLoggedIn,
                }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
 
export default AuthContextProvider;