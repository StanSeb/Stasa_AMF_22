import React, { createContext, Component } from 'react';
import Axios from "axios";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = { 
        loggedInUser: null
    }

    setLoggedInUser = (user) => {
        this.setState({ 
            loggedInUser: user // Contains "id", "username" and "enabled"
         });
    }

    componentDidMount() {
        Axios
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
				} else {
					console.log("Status: " + response.status);
				}
			});
    }
    
    render() { 
        return (
            <AuthContext.Provider value={{
                    ...this.state, 
                    setLoggedInUser: this.setLoggedInUser
                }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
 
export default AuthContextProvider;