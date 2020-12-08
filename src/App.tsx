import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Default } from "./layout/Default";
import { Centered } from "./layout/Centered";
import { Login } from "./components/Login";
import { ProvideAuth } from "./helpers/Auth";
import { HomePage } from "./pages/HomePage";
import { Events } from "./pages/Events";
import { Users } from "./pages/Users";

library.add(faUserCircle);

export interface ChildrenProps {
    children: React.ReactNode
}

export const App = () => {

    return <Container fluid className="p-0 bg-dark">
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route exact path="/login" render={() => <Centered ><Login /></Centered>} />
                    <Route render={() => <Default >
                        <Switch>
                            <Route path="/events" render={() => <Events />} />
                            <Route path="/users" render={() => <Users />} />
                            <Route component={HomePage} />
                        </Switch>
                    </Default>} />
                </Switch>
            </Router>
        </ProvideAuth>
    </Container>;
}