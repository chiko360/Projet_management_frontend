import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBlack from '../header/NavBlack';
import AOS from 'aos';
import {
    Form,
    Button,
    Modal,
    Label,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import Footer from '../Footer';


function FinalResults() {
    const [results, setRes] = useState([]);
    const [members, setMembers] = useState([]);
    const [first_name, setfirstName] = useState('');
    const [last_name, setlastName] = useState('');
    const [grp, setgrp]= useState('')

    const getResults = async () => {
        let url = 'http://localhost:8001/groups/finalresults/';
        let token = localStorage.getItem("token")
        let options = {
            method: 'get',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
        };
        await axios(options).then(res => {
            const response = res.data;
            setRes(response);
            getMembers(results.grp);
        })
    }

    const getMembers = async (grp) => {
        let url = 'http://localhost:8001/posts/myprojects/';
        let token = localStorage.getItem("token")
        let options = {
            method: 'post',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            data: { 'grp': grp }
        };
        await axios(options).then(res => {
            const response = res.data;
            setMembers(response)
        })
    }

    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('type') !== 'teacher') {
            history.push('/Forbiden')
        }
        AOS.init();
        AOS.refresh();
        getResults();
    }, []);
    return (
        <>
            <NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')} />
            <br />
            <br />
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div className="section about">
                            <Container>
                                <section class="breadcrumbs" data-aos="fade-up" data-aos-delay="200">
                                    <div class="container">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <h2>view final results</h2>
                                            <ol>
                                                <li><a href="/">home</a></li>
                                                <li><a href="/teacher">teacher</a></li>
                                                <li>final results</li>
                                            </ol>
                                        </div>
                                    </div>
                                </section>
                                <hr />
                                {(() => {
                                    if (results.length === 0) {
                                        return <div className="container">
                                            <div class="card my-4">
                                                <div class="card-body" data-aos="fade-up" data-aos-delay="400">
                                                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                                                    <center><h1 > final results aren't anounced yet</h1></center>
                                                    <br /><br /><br /><br /><br /><br /><br /><br />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })()}
                                {results.map((result, index) => {
                                    return <div className="container">
                                        <div class="card my-4">
                                            <h5 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">{result.selected_project}</h5>
                                            <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                                                <h3>groupe name : {result.groupfiche}</h3>
                                                <h3>selected project : {result.teacher_profile}</h3>
                                <h2>members :</h2>{members.map((member, index) => {return <h1>{member.first_name} {member.last_name}</h1>})}
                                                
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FinalResults;