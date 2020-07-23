import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import HorNavbar from '../HorNavbar';
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
function MyProjects() {
    const [title, setTitle] = useState(null);
    const [promo, setPromo] = useState(null);
    const [introduction, setIntro] = useState(null);
    const [tags, setTags] = useState(null);
    const [tools, setTools] = useState(null);
    const [details, setDetails] = useState(null);
    const [posts, setPost] = useState([]);
    const [id, setID] = useState(null);
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
            history.push('/teacher/MyProjects');
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
                    data: {title,promo,introduction,tags,tools,details}
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            toggleModalDelete();
            window.location.reload();
        }
    }

    const EditButton = (props) =>{
        if (props.approuved!=='true'){
            return <Button
            type="button"  
            className="btn-round" 
            color="warning"
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
    },[]);
    return(
        <>
    <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div className="section about">
                    <Container>  
                                                <section class="breadcrumbs">
                                                    <div class="container">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <h2>Check All Your Projects.</h2>
                                                            <a href="/teacher/addproject"><Button className="btn-round" color="info" >add Project</Button></a>
                                                        </div>
                                                    </div>
                                                </section>
                                            <hr/>
                                        {posts.map((post,index) => {
                                            return <div className="container">
                                            <div class="card my-4">
                                                <h5 class="card-header headerr">{post.title}</h5>
                                                <div class="card-body">
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
                                    <div className="right-side">
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
                </div>
            </div>
        </div>
        <Footer/>  
        </>            
        );
    }

export default MyProjects;
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