import React, { useState } from 'react';

const Riley = (props)=>{
const {firstName, middleName, lastName} = props

    return<div>
        <span> First Name: {firstName}</span>
        <span> Middle Name: {middleName}</span>
        <span> Last Name: {lastName}</span>
    </div>
}

export default Riley