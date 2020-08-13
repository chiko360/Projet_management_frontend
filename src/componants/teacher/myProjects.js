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
function TeacherMyProjects() {
    const [title, setTitle] = useState(null);
    const [promo, setPromo] = useState(null);
    const [introduction, setIntro] = useState(null);
    const [tags, setTags] = useState(null);
    const [tools, setTools] = useState(null);
    const [details, setDetails] = useState(null);
    const [posts, setPost] = useState([]);
    const [id, setID] = useState(null);
    let history = useHistory();
    const [modal, setModal] = useState(false);
    const [modaldelete, setModalDelete] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

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

    const getprojects = async () => {
        let url = 'http://localhost:8000/posts/myprojects/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'get',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        await axios(options).then(res => {
            const response = res.data;
            setPost(response)
        })
    }

    const deleteProject = async (index) => {
        let url = 'http://localhost:8000/posts/'+index+'/delete/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'DELETE',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            getprojects();
        }
    }
    const editProject = async (index) => {
        let url = 'http://localhost:8000/posts/'+index+'/edit/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'PUT',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            history.replace('/teacher/MyProjects');
        }
    }

    const EditButton = (props) =>{
        if (props.approuved!=='true'){
            return <Button
            type="button"  
            className="btn-round" 
            color="primary"
            onClick={()=>{
                toggleModal();
                setTitle(props.title);
                setPromo(props.promo);
                setIntro(props.introduction);
                setTools(props.tools);
                setTags(props.tags);
                setDetails(props.details);
            }}
            >
            Edit topic
            </Button>
        }
        else {return null}
    }

    useEffect(()=> {
        if (localStorage.getItem('type')!=='teacher'){
            history.push('/Forbiden')
        }
        getprojects();
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
                                            <h2>Check All Your Projects.</h2>
                                            <ol>
                                                <li><a href="/index">home</a></li>
                                                <li><a href="/teacher">teacher</a></li>
                                                <li>my project</li>
                                            </ol>
                                        </div>
                                    </div>
                                </section>
                                            <hr/>
                                            {(() => {
                                                if (posts.length===0){
                                                 return <div className="container">
                                                 <div class="card my-4">
                                                 <div class="card-body" data-aos="fade-up" data-aos-delay="400">
                                                 <br/><br/><br/><br/><br/><br/><br/><br/>
                                                    <center><h1 > you haven't submited any projects yet, <a style={{color:'#3498db'}} href="/teacher/addproject"> add one now !</a></h1></center>
                                                    <br/><br/><br/><br/><br/><br/><br/>
                                                 </div>
                                                 </div>
                                                 </div>
                                                }
                                            })()}
                                        {posts.map((post,index) => {
                                            return <div className="container">
                                            <div class="card my-4">
                                                <h5 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">{post.title}</h5>
                                                <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                                                    <h3>promo : {post.promo}</h3>
                                                    <h3>created at : {post.creating_date}</h3>
                                                    <h3>introduction : {post.introduction}</h3>
                                                    <h3>tools : {post.tools}</h3>
                                                    <h3>tags : {post.tags}</h3>
                                                    <h3>details :{post.details}</h3>
                                                    <h3>approuved : {String(post.approved)}</h3>
                                                <Button className="btn-round" color="danger" onClick={toggleModalDelete} >delete topic</Button>
                                                <Modal class="modal-dialog modal-xs" isOpen={modaldelete} toggle={toggleModalDelete}>
                                                    <div className="modal-body">
                                                    <div class="text-center mr-auto"> 
                                                    <Col>
                                                    Do you really want to delete this project?
                                                    </Col>
                                                    </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button
                                                        outline
                                                        className="btn-round"
                                                        color="danger"
                                                        type="button"
                                                        onClick={()=>{deleteProject(post.id)}}
                                                        >
                                                        Delete
                                                        </Button>
                                                    <div className="divider" />
                                                    <div className="right-side">
                                                        <Button 
                                                        outline
                                                        className="btn-round"
                                                        color="default"
                                                        type="button"
                                                        onClick={toggleModalDelete}
                                                            >
                                                        Cancel
                                                        </Button>
                                                    </div>
                                                    </div>
                                                </Modal>
                                                <EditButton approuved={String(post.approved)} id={post.id} title={post.title} promo={post.promo} tools={post.tools} tags={post.tags} details={post.details} introduction={post.introduction} />
                            <Modal  className="modal-dialog modal-lg" isOpen={modal} toggle={toggleModal}>
                                <div className="modal-header">
                                    <h3>Edit Your Project</h3>
                                    <button
                                      aria-label="Close"
                                      className="close"
                                      type="button"
                                      onClick={toggleModal}
                                    >
                                    <span aria-hidden={true}>×</span>
                                    </button>   
                                </div>
                                <div className="modal-body">
                                    <Col>
                                        <Form>
                                            <Input
                                              className="form-control my-3"
                                              type="text"
                                              name="title"
                                              value={title}
                                              onChange={(event)=>{setTitle(event.target.value)}}
                                            />
                                            <form class="ui form">
                                            <select name="select-titlethree" value={promo} onChange={(event)=>{setPromo(event.target.value)}}>
                                                    <option>2CPI</option>
                                                    <option>1CS</option>
                                                    <option>2CS</option>
                                                    <option>3CS</option>
                                                </select></form>
                                            <br/>
                                            <textarea
                                              className="form-control my-3"
                                              name="introduction"  value={introduction} onChange={(event)=>{setIntro(event.target.value)}}
                                              >
                                            </textarea>

                                            <textarea
                                              className="form-control my-3"
                                              name="tools"  value={tools} onChange={(event)=>{setTools(event.target.value)}}
                                             >
                                            </textarea>

                                            <textarea
                                              className="form-control my-3"
                                              name="details" value={details} onChange={(event)=>{setDetails(event.target.value)}}
                                              >
                                            </textarea>
                                            <input className="form-control my-3" type="text" name="keywords" value={tags} onChange={(event)=>{setTags(event.target.value)}} /> <br/>
                                        <br/>
                                            </Form>
                                    </Col>
                                </div>
                                <div className="modal-footer">
                                    <div className="left-side">
                                        <Button
                                          className="btn-link"
                                          color="default"
                                          type="button"
                                          onClick={toggleModal}
                                        >
                                        Exit
                                        </Button>
                                    </div>
                                    <div className="divider" />
                                    <div className="left-side">
                                        <Button className="btn-round" color="info" type="button" onClick={()=>{editProject(post.id)}}>
                                         Save
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                            </div>
                            </div>
                            </div>  })}    
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

export default TeacherMyProjects;
//
//<React.Fragment>
//                <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
//                <header className="App-header">
//                  <p>
//                    my Projects
//                  </p>
//                </header>
//                <div>
//                        {posts.map((post,index) => {
//                        //    setapr(post.approuved)
//                        //    setid(post.id)
//                        return <div>
//                                <h2 class="ui top attached header">{post.title}</h2>
//                                <div class="ui attached segment">
//                                <h3>promo : {post.promo}</h3>
//                                <h3>created at : {post.creating_date}</h3>
//                                <h3>introduction : {post.introduction}</h3>
//                                <h3>tools : {post.tools}</h3>
//                                <h3>tags : {post.tags}</h3>
//                                <h3>details :{post.details}</h3>
//                                <h3>approuved : {String(post.approved)}</h3>
//                                <Button color='red' onClick={()=>{deleteProject(post.id)}}>delete topic</Button>
//                                <EditButton approuved={String(post.approved)} id={post.id} />
//                                </div>
//                            </div>
//                    })}
//                </div>
//              </React.Fragment>