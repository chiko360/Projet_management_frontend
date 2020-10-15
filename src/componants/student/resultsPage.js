import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBlack from  '../header/NavBlack';
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



function Resultspage() {
    const [selected_project, setselected_project] = useState(null);
    const [groupfiche, setgroupfiche] = useState(null);
    const [Grp, setGrp] = useState('');
    const [mem, setmem] = useState([]);


    let history = useHistory();
    const [modal, setModal] = React.useState(false);
    const [modaldelete, setModalDelete] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("1");

    const toggleModal = () => {
        setModal(!modal);
    } 
    const toggleModalDelete = () => {
        setModalDelete(!modaldelete);
    }
    const toggle = tab => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };

    const havegrp = async () => {
        let url = 'http://localhost:8001/profiles/getgroup/';
        let token = localStorage.getItem("token");
        axios.create({
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
          },
        })
          .request({
            url: url,
            method: "get",
          })
          .then((res) => {
            setGrp(res.data.grp);
          }
          )
      }
    
    
     const getfinalresult = async () => {
    let url = 'http://localhost:8001/groups/finalresults/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "get",
      })
      .then((res) => {
        setmem(res.data);
      }
      )
      .catch(() => {
        ;
      })
  }


    useEffect(()=> {
        if (localStorage.getItem('type')!=='student'){
            history.push('/Forbiden')
        }
        havegrp();
        getfinalresult();
        AOS.init();
        AOS.refresh();
    },[]);

    return(
        <>
    <NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
    <br/>
        <br/>
<br/>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div className="section about">
                    <Container>  
                    <section class="breadcrumbs" data-aos="fade-up" data-aos-delay="200">
                                    <div class="container">
                                    <div class="d-flex justify-content-between align-items-center">
                                            <h2>Showing all results.</h2>
                                            <ol>
                                                <li><a href="/">home</a></li>
                                                <li><a href="/sort">results</a></li>
                                               
                                            </ol>
                                        </div>
                                    </div>
                                </section>
                                            <hr/>
                                           
                                       <div className="container">
                                            <div class="card my-4">
                                                <h5 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">
                                                    The Final Results 
                                                </h5>
                                                <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                                               {mem.map((mem, index) => {
                          return  <Col>
                          <p>
                          <h5> <span style={{color:'#3498db'}}> Group's name :</span>   {mem.groupfiche} </h5>
                          
                          <h5> <span  style={{color:'#3498db'}}>Project That the group in is concerned with : </span>
                          {mem.selected_project}
                             </h5>
                           
                          </p>
                          <hr/>
                        </Col>
                        
                         })}
                                               </div>
                                               </div>
                                               </div>
                        </Container>
                    </div>
                    <br/>
        <br/>
        <br/>
<br/>
                </div>
            </div>
        </div>
        <Footer/>  
        </>            
        );
    }

export default Resultspage;
