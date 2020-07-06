import React, {Component, useEffect, useState} from 'react';
import { Link } from "react-router-dom";

function HorNavbar(props) {
    const type = props.type
    const logged = props.islogged

    function Loginbutton(props){
        const logged = props.logged
        if (logged===null){
            return <div class='right item'>
                    <i class='sign in icon'></i>
                    login
                   </div>
        }
        else {return null}
    }
    if (type ==='student'){
        return <div class='ui-container'>
                <div class='ui labeled icon menu'>
                  <div class='item'>
                    <i class='home icon'></i>
                      home
                  </div>
                  <div class='item'>
                    <i class='group icon'></i>
                      my group
                  </div>
                  <div class='item'>
                    <i class='file icon'></i>
                      projects
                  </div>
                  <div class='item'>
                    <i class='user icon'></i>
                      profile
                  </div>
                  <Loginbutton logged={logged}/>
                </div>
               </div>
    }
    else if (type ==='teacher'){
        return <div class='ui-container'>
                <div class='ui labeled icon menu'>
                  <div class='item'>
                    <i class='home icon'></i>
                      home
                  </div>
                  <div class='item'>
                    <i class='file icon'></i>
                      projects
                  </div>
                  <div class='item'>
                    <i class='add icon'></i>
                      add project
                  </div>
                  <div class='item'>
                    <i class='user icon'></i>
                      profile
                  </div>
                  <Loginbutton logged={logged}/>
                </div>
               </div>
    }
}

export default HorNavbar;