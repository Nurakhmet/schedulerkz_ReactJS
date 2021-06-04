import React from 'react';

const UserCon = React.createContext({
    email: "nura7kz@gmail.com",
    fullName:"Nurakhmet Matanov",
    address: "",
    phoneNumber: "",
    avatar: "",
    auth: false,
    roles:[{}],
    jwtToken: ""
});

export default UserCon;