import React from 'react'
import logo from '../static/logowit.png'

export const Logo = ({width = 350}) => {
    return (
        <img
            alt="Bouwton"
            src={logo}
            width={width}
        />
    )
}