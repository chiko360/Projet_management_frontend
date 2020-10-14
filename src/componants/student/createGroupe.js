import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import NavBlack from '../header/NavBlack';
import Footer from '../Footer';
import AOS from 'aos';
import {
  Button,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  Label,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";
import { Form } from "semantic-ui-react";

import avatar from '../../assets/images/avatar.jpg';


function CreateGroup() {


  const [posts, setPost] = useState([]);
  const [title, setTitle] = useState(null);

  const [groupName, setGroupname] = useState('');

  const [members, setMembers] = useState([]);
  const [nameError, setNE] = useState(null);
  const [ServerError, setSE] = useState(null);
  const [Grp, setGrp] = useState('');
  const [Leader, setLeader] = useState(false);
  const [mem, setmem] = useState([]);
  const [memm, setmemm] = useState([]);
  const [leadername, setLN] = useState([]);
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
    let url = 'http://localhost:8000/posts/';
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
      console.log(response)
      setPost(response)
    })
  }


  const handleCreationProject = async (props) => {
    const isLeader = props.Leader;
    if (isLeader === false) {
      return null
    }
    else if (isLeader === true) {
      for (var i = 0; i < posts.length; i++) {
        var postslist = posts[i].label.split(' ');
        const title = postslist[0]
        Addprojects(title);
      }
    }
  }


  const Addprojects = async (title) => {
    let url = 'http://localhost:8000/groups/addproject/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "post",
        data: { title },
      })
      .then((res) => {
        console.log(title + ' was added')
      }
      )
      .catch(() => {
        console.log('error');
      })
  }


  const addproject = posts => {
    setPost(posts);
  }

  const loadOptionsProject = async (callback) => {
    let url = 'http://localhost:8000/groups/lookupposts/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'GET',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };
    const response = await fetch(url, options)
    const json = await response.json()
    callback(json.map(i => ({ label: i.title, value: i.title })));
  }




  const getMembers = async () => {
    let url = 'http://localhost:8000/groups/getMembers/';
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
        console.log('don\'t have a grp');
      })
  }

  const havegrp = async () => {
    let url = 'http://localhost:8000/profiles/getgroup/';
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
        setLeader(res.data.leader)
        setLN(res.data.leaderName)
      }
      )
  }




  const handleCreationgroup = async () => {
    const isValid = validate();
    if (isValid === true && Grp === '') {
      setNE(null);
      createGroup(groupName);
    }
    }
  

  const handleCreationmem = async () => {
   if (Grp !== '') {
      for (var i = 0; i < members.length; i++) {
        var memlist = members[i].label.split(' ');
        const first_name = memlist[0]
        const last_name = memlist[1]
        Addmembers(first_name, last_name);
      }
    }
  }



  const deletemember = async (first_name, last_name) => {
    let url = 'http://localhost:8000/groups/deletemember/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "post",
        data: { first_name, last_name },
      })
      .then((res) => {
        history.push('/student/group')
        window.location.reload();

      }
      )
      .catch(() => {
        console.log('error');
      })
  }



  const Addmembers = async (first_name, last_name) => {
    let url = 'http://localhost:8000/groups/addmember/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "post",
        data: { first_name, last_name },
      })
      .then((res) => {
        console.log(first_name + ':' + last_name + ' was added')
      }
      )
      .catch(() => {
        console.log('error');
        setSE('you don\'t have a groupe')
      })
  }

  const createGroup = async () => {
    let url = 'http://localhost:8000/groups/creategroup/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "post",
        data: { groupName },
      })

      .then((res) => {
        console.log('created')
        for (var i = 0; i < members.length; i++) {
          var memlist = members[i].label.split(' ');
          const first_name = memlist[0]
          const last_name = memlist[1]
          Addmembers(first_name, last_name);
        }
      })
      .catch(() => {
        console.log('already exist')
        for (var i = 0; i < members.length; i++) {
          var memlist = members[i].label.split(' ');
          const first_name = memlist[0]
          const last_name = memlist[1]
          Addmembers(first_name, last_name);
        }
      });
  }

  const validate = () => {
    let nameError = "";
    if (groupName === '') {
      nameError = 'Group name can\'t be blank';
    }
    if (nameError) {
      setNE(nameError);
      return false;
    }

    return true;
  };

  const addmember = members => {
    setMembers(members);
  }


  const loadOptions = async (callback, inputText) => {
    let url = 'http://localhost:8000/members/'+inputText;
    let token = localStorage.getItem("token")
    let options = {
      method: 'GET',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };
    const response = await fetch(url, options)
    const json = await response.json()
    callback(json.map(i => ({ label: i.first_name + ' ' + i.last_name, value: i.last_name + ' ' + i.last_name })));
  }
  
  
  const getfinalresult = async () => {
    let url = 'http://localhost:8000/groups/finalresults/';
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
        setmemm(res.data);
      }
      )
      .catch(() => {
        console.log('there is no results yet');
      })
  }
  
 
  useEffect(() => {
    getfinalresult();
    havegrp();
    getMembers();
    getprojects();
    AOS.init(); 
    AOS.refresh(); 
  }, []);

  

  

  function HeaderR(props) {
    const havegrp = props.grp;
    if (havegrp !== '') {
      return ( <div className="container">
      <h3 class="card-header headerr headerrr-hover" data-aos="fade-up" data-aos-delay="200">
         Your team's final results
  <br/>
  <p>If you want to check on the results of the whole promo, 
                  <a href="/student/results"> <span style={{color:'#000000'}}>
                    click here </span> </a></p>
</h3>
<br/>
           
  </div>
  
      );
    }
    else return null;
  }

  

  function HeaderM(props) {
    const havegrp = props.grp;
    if (havegrp !== '') {
      return ( <div className="container">
      
       
          <h3 class="card-header headerr headerrr-hover" data-aos="fade-up" data-aos-delay="200">
          Current Members
  <br/>
  <small>Leader: {leadername}</small>
</h3>
<br/>
<br/>          <br /> 
           
  </div>
  
      );
    }
    else return null;
  }

  function HeaderG(props) {
    const havegrp = props.grp;
    if (havegrp !== '') {
      return ( <div className="container">
      <div class="card my-4">
        <h2 class="card-header headerrr headerrr-hover" data-aos="fade-up">
          <br />
          Current Group "{Grp}" Infos
          <br /> 
           <br /> 
        </h2>
  </div>
  </div>
      );
    }
    else return(
      <h2 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">
          <br />
          Create Your team now.
          <br /> 
           <br /> 
        </h2>
         );
  }
    
  function InputGN(props) {
    const havegrp = props.grp;
    if (havegrp === '') {

      return (  <div>
          <Form >
            <br />
            <h3>Creat a group now </h3>
            <br />
            <Row>
            <Col lg="9" md="12">


            <Form.Input
             placeholder="Enter name of your group.. "
              onChange={(event) => { setGroupname(event.target.value) }} />
            <br />

            </Col>
            <Col>
            <Button
              block
              className="btn-hover color-1"
              onClick={() => { handleCreationgroup() }}>
              Validate Group
               </Button>
               </Col>
               </Row>

            <div style={{ fontSize: 12, color: "red" }}>{nameError}</div>

          </Form>
          </div>
      )
    }
    else return null;
  }

  function AddFeild(props) {
    const isLeader = props.Leader;
    if (isLeader) {
      return (
        <div>
          <br/>
          
          <Form name="form"  data-aos="fade-up"  >
            <h3  >
              Enter the name of the member you want to add to your group. </h3>
            <br />
            <br/>
            <Container>

            <Row>
            <Col lg="8" md="10" style={{height : "60px" }}>

            <AsyncSelect
              isMulti
              value={members}
              onChange={addmember}
              placeholder='enter members names..'
              loadOptions={loadOptions}
            />
            <br />
            </Col>
            
<Col >
            <Button
              style={{ float: 'right' }}
              block
              className="btn-hover color-1"
              onClick={() => { handleCreationmem() }}>Validate Member</Button>
              </Col>

</Row>
</Container>

            <div style={{ fontSize: 12, color: "red" }}>{ServerError}</div>

          </Form>

        </div>

      )
    }
    else return null;
  }



  function DltButton(props) {
    const isLeader = props.Leader;
    const first_name = props.first_name;
    const last_name = props.last_name;
    const leader = props.LN;
    var LNList = leader.split(' ');
    const leaderLN = LNList[0]
    const leaderFN = LNList[1]
    console.log(leaderFN);
    if (first_name === leaderFN && last_name === leaderLN) {
      return null;
    }

    else if (isLeader) {
      return (
        <>
        <Button className="btn-hover color-11"
         onClick={toggleModalDelete}>
          delete member
        </Button>
          <Modal class="modal-dialog modal-xs" isOpen={modaldelete} toggle={toggleModalDelete}>
              <div className="modal-body">
              <div class="text-center mr-auto"> 
              <Col style={{ height:"100px"}}>
                <br/>
              <h3>
              Do you really want to delete this member?
              </h3>
              </Col>
              </div>
              </div>
              <div className="modal-footer">
                  <Button      
                  style={{width:"100px"}}
                  className="btn-hover color-11"
                  onClick={() => { deletemember(first_name, last_name) }}                  >
                  Delete
                  </Button>
              <div className="divider" />
              <div className="right-side">
                  <Button 
                  outline
                  style={{width:"100%"}}
                  className="btn-hover color-8"
                  type="button"
                  onClick={toggleModalDelete}
                      >
                  Cancel
                  </Button>
              </div>
              </div>
          </Modal>
          </>
      )
    }
    else {
      return null;
    }
  }

  return (

    <>
      <NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')} />
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
                                            <h2>All Your Group's Inormations.</h2>
                                            <ol>
                                                <li><a href="/index">home</a></li>
                                                <li><a href="/student">student</a></li>
                                                <li>my group</li>
                                            </ol>
                                        </div>
                                    </div>
                                </section>
                <hr />
                <div className="container">
                  <div class="card my-4">
                   <HeaderG grp={Grp}/>

                    <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                      <div>
                      
                        <AddFeild Leader={Leader} />
                        <br />
                       
                        <br/>
                        <InputGN grp={Grp} />
                        <br />
                        
                        <br />
                        
                        <br/>
                        <HeaderM grp={Grp}/>
<div data-aos="fade-up" data-aos-delay="400">
                        {mem.map((mem, index) => {
                          return <Row>
                <Col className="ml-auto mr-auto" md="7">
                  <ul className="list-unstyled follows">

                    <li>
                      <Row>

                        <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                        
                              <img src={avatar} alt="Circle Image" class="img-raised rounded-circle img-fluid" />
                            </Col>
                           
                        <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                          <p>
                            <h4>
                            {mem.first_name} {mem.last_name} 
                            </h4>
                             Gender : {mem.gender}
                            <br/>
                            Birth Date : {mem.birth_date}
                          <br />
                          </p>
                          <DltButton Leader={Leader} LN={leadername} first_name={mem.first_name} last_name={mem.last_name} />

                        </Col>
                       
                      </Row>
                    </li>
                    <hr />
                  
                  </ul>
                </Col>
              </Row>
                          
                          
                         
                        })}
                        </div>
                    
                        <HeaderR grp={Grp}/>
                        <Row>
            <Col lg="9" md="12">
                        {memm.map((memm, index) => {
                          if(Grp==memm.groupfiche){
                          return  <Col>
                          <p>
                          <h5>  Your Group : 
                            <span style={{color:'#3498db'}}> 
                            {memm.groupfiche}
                             </span></h5>
                          <hr/>
                          
                          <h5> The Project's That Your Group is Concerned With : 
                          <span  style={{color:'#3498db'}}>
                            {memm.selected_project}
                            </span>
                             </h5>
                          </p>
                          </Col>
                        }
                         })}
                         <br/>
                           
                         </Col>
                         </Row>
                        </div>
                        </div>
              
                      </div>


                    </div>
                    <br/>
      
         
              </Container>

              <br/>
        <br/>
        <br/>
<br/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateGroup;
