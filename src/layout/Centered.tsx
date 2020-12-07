import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Logo } from '../components/Logo';
import { ChildrenProps } from '../App'

export const Centered = (props: ChildrenProps) => {
    return (
        <Row className="m-0 justify-content-center" style={{minHeight: '100vh'}}>
            <Col className="p-0" xl={5} lg={6} md={8}>
                <div className="text-center border-0 mt-4">
                    <Logo />
                </div>
                {props.children}
            </Col>
        </Row>
    )
}