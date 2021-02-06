import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router'
import { useAuth } from '../helpers/Auth'
import { ChildrenProps } from '../App'
import { Footer } from '../components/Footer'
import { SideBar } from '../components/SideBar'
import { TopBar } from '../components/TopBar'

export const Default = (props: ChildrenProps) => {
    let auth = useAuth();

    return (
        !auth.user ?
        <Redirect to="/login" /> :
        <Row className="m-0" style={{minHeight: '100vh'}}>
            <SideBar md={3} lg={2} className="p-0" />
            <Col className="p-0 bg-white">
                <Container fluid className="p-0 d-flex flex-column" style={{minHeight: '100vh'}}>
                    <TopBar />
                    <Row className="flex-fill p-2 m-0 mt-3">
                        {props.children}
                    </Row>
                    <Footer md={2} className={"align-self-last p-2 m-0 mt-3"} />
                </Container>
            </Col>
        </Row>
    )
}