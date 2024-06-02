import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from "./NavMenu";
import {useAuth} from "./AuthContext";

type Props = {
    children?: React.ReactNode;
}

export default function Layout(props: Props) {
    const { isAuthenticated, userRole, login, logout } = useAuth();

    return (
        <div>
            <NavMenu isAuthenticated={isAuthenticated} userRole={userRole} login={login} logout={logout} />
            <Container tag="main">{props.children}</Container>
        </div>
    );
}
