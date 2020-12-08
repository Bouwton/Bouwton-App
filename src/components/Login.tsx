import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../helpers/Auth';

export interface LoginProps {
    loggedIn: boolean;
    loginHandler: (token: string, role: string) => void;
}

export interface LoginState { 
    email: string;
    password: string;
    rememberMe: boolean;
    error: number;
}

export const Login = () => {
    let auth = useAuth();
    const [state, setState] = useState({ 
        email: localStorage.getItem('LoginData:email') || "",
        password: localStorage.getItem('LoginData:password') || '',
        rememberMe: localStorage.getItem('LoginData:rememberMe') == "true" || false,
        error: 0,
    });

    let login = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (state.rememberMe) {
            localStorage.setItem('LoginData:email', state.email)
            localStorage.setItem('LoginData:password', state.password)
            localStorage.setItem('LoginData:rememberMe', state.rememberMe ? "true" : "false")
        }
        auth.signin(state.email, state.password);
    };

    let handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = {}
        switch (event.target.type){
            case 'checkbox':
                value = { [event.target.name]: event.target.checked }
                break;
            default:
                value = { [event.target.name]: event.target.value }
        }
        setState({
            ...state,
            ...value,
        });
    }
  
    return (
        auth.user ?
        <Redirect to="/" /> :
        <Card border="light" className="shadow-lg my-5">
            <Card.Header>
                <Card.Title className="text-center h4">
                    Login
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={login}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Emailaddress</Form.Label>
                        <Form.Control 
                            required
                            name="email"
                            type="email" 
                            placeholder="Emailaddress" 
                            value={state.email}
                            onChange={handleChange} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid emailaddress.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required 
                            name="password"
                            type="password" 
                            placeholder="Password" 
                            value={state.password}
                            onChange={handleChange} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid Password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check 
                            name="rememberMe"
                            type="checkbox" 
                            label="Remember Me"
                            defaultChecked={state.rememberMe}
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Button variant="primary" block type="submit" onClick={login}>
                        Login
                    </Button>
                </Form>
                {/* <Card.Footer className="text-muted hidden">
                    <Card.Link href="#" className="small">Forgot Password?</Card.Link>
                </Card.Footer> */}
            </Card.Body>
        </Card>
    );
}

// export class Login extends React.Component<LoginProps, LoginState> {
//     state: LoginState
//     // private setValidated: React.Dispatch<React.SetStateAction<boolean>>

//     constructor(props: LoginProps) {
//         super(props);
//         // [this.state, this.setValidated] = useState(false);
//         this.state = {
//             // email: settings.getSync('login.email') && settings.getSync('login.email').toString() || "",
//             email: "",
//             password: "",
//             // rememberMe: settings.getSync('login.rememberMe') && settings.getSync('login.rememberMe').toString() == "true" || false,
//             rememberMe: false,
//             error: 0,
//         };

//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleCheckbox = this.handleCheckbox.bind(this);
//     }

//     handleChange(event: React.ChangeEvent<HTMLInputElement>){
//         this.setState({
//             ...this.state,
//             ...{ [event.target.name]: event.target.value },
//           });
//     }
//     handleCheckbox(){
//         this.setState({
//             rememberMe: !this.state.rememberMe
//         });
//     }
//     handleSubmit(event: React.FormEvent){
//         const { email, password, rememberMe } = this.state;
//         if (rememberMe) {
//             settings.setSync('login', {
//                 email,
//                 rememberMe
//             });
//         }
//         if (email == "test@test") {
//             this.props.loginHandler("test", "ADMIN");
//         // } else {
//             // axios
//             //     .post(
//             //         "https://api.bouwton.nu/auth/login",
//             //         {
//             //             email: email,
//             //             password: password,
//             //         }
//             //     )
//             //     .then(response => {
//             //         console.log("Login Response:", response);
//             //         if (response.status === 200) {
//             //             this.props.loginHandler(response.data.data.token, response.data.data.role);
//             //         }
//             //     })
//             //     .catch(error => {
//             //         console.log("Login Error:", error.response.data);
//             //         this.setState({
//             //             error: error.response.status
//             //         })
//             //     })
//         }
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <Card border="light" className="shadow-lg my-5">
//                 <Card.Header>
//                     <Card.Title className="text-center h4">
//                         Inloggen
//                     </Card.Title>
//                 </Card.Header>
//                 <Card.Body>
//                     <Form onSubmit={this.handleSubmit}>
//                         <Form.Group controlId="formBasicEmail">
//                             <Form.Label>Emailadres</Form.Label>
//                             <Form.Control 
//                                 required 
//                                 type="email" 
//                                 placeholder="Emailadres" 
//                                 value={this.state.email}
//                                 onChange={this.handleChange} 
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 Gebruikersnaam onjuist.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group controlId="formBasicPassword">
//                             <Form.Label>Wachtwoord</Form.Label>
//                             <Form.Control 
//                                 required 
//                                 type="password" 
//                                 placeholder="Wachtwoord" 
//                                 value={this.state.password}
//                                 onChange={this.handleChange} 
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 Wachtwoord onjuist.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group controlId="formBasicCheckbox">
//                             <Form.Check 
//                                 type="checkbox" 
//                                 label="Onthoud Gebruikersnaam"
//                                 defaultChecked={this.state.rememberMe}
//                                 onChange={this.handleCheckbox} 
//                             />
//                         </Form.Group>

//                         <Button variant="primary" block type="submit">
//                             Inloggen
//                         </Button>
//                     </Form>
//                     {/* <Card.Footer className="text-muted hidden">
//                         <Card.Link href="#" className="small">Forgot Password?</Card.Link>
//                     </Card.Footer> */}
//                 </Card.Body>
//             </Card>
//         )
//     }
// }