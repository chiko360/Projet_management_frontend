import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import NavBlack from '../header/NavBlack';
import Footer from '../Footer';
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
  Form,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";
import avatar from '../../assets/images/avatar.jpg';


function CreateGroup() {
  const [modal, setModal] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }

  };
  const [groupName, setGname] = useState('');
  const [members, setMembers] = useState([]);
  const [nameError, setNE] = useState(null);
  const [ServerError, setSE] = useState(null);
  const [Grp, setGrp] = useState('');
  const [Leader, setLeader] = useState(false);
  const [mem, setmem] = useState([]);
  const [leadername, setLN] = useState([]);
  let history = useHistory();

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
      .catch(() => {
        history.push('/*')
      })
  }



  const handleCreation = async () => {
    const isValid = validate();
    if (isValid === true && Grp === '') {
      setNE(null);
      createGroup();
    }
    else if (Grp !== '') {
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

  const loadOptions = async (inputValue,callback) => {
    console.log(inputValue)
    let url = 'http://localhost:8000/members/'+inputValue;
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


  useEffect(() => {
    havegrp();
    getMembers();
  }, []);




  function InputGN(props) {
    const havegrp = props.grp;
    if (havegrp === '') {
      return (
        <div>
          <Form name="form" >
            <br />
            <h3>Add the name of your group </h3>
            <br />
            <input placeholder="Enter name of your group.. "
              type="text"
              className="form-control"
              name="Gname"
              onChange={(event) => { setGname(event.target.value) }} />
            <br />
            <Button
              block
              className="btn-hover color-1"
              onClick={() => { handleCreation() }}>
              Validate Group's Name
               </Button>
            <div style={{ fontSize: 12, color: "red" }}>{nameError}</div>
          </Form>
        </div>
      )
    }
    else return null;
  }

  function AddField(props) {
    const isLeader = props.Leader;
    if (isLeader) {
      return (
        <div>
          <br/>
          <Form name="form" >
            <h4>Enter the name of the member you want to add yo yout group. </h4>
            <br />
            <Container>

            <Row>
            <Col lg="9" md="12" style={{height : "60px" }}>

            <AsyncSelect
              isMulti
              value={members}
              onChange={addmember}
              placeholder='enter members names..'
              loadOptions={loadOptions}
            />
            <br />
            </Col>
            
<Col>
            <Button
              style={{ float: 'right' }}
              block
              className="btn-hover color-1"
              onClick={() => { handleCreation() }}>Validate Member</Button>
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
        <Button className="btn-hover color-11"
         onClick={() => { deletemember(first_name, last_name) }}>
          delete member
        </Button>
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
                <section class="breadcrumbs">
                  <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                      <h2>All Informations of the Group</h2>
                      <a href="/student/group">
                       
                       
                       </a>
                    </div>
                  </div>
                </section>
                <hr />
                <div className="container">
                  <div class="card my-4">
                    <h2 class="card-header headerrr headerrr-hover">
                      <br />
                      Current Group "{Grp}" Infos
                      <br /> 
       <br /> 
                    </h2>

                    <div class="card-body">
                      <div>
                        <AddField Leader={Leader} />
                        <br />
                        <InputGN grp={Grp} />
                        <br />
                        <h3 class="card-header headerrr headerrr-hover">
                      Current Members
                      <br/>
                      <small>Leader: {leadername}</small>
                    </h3>
                    <br/>
                    <br/>

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


                    </div>
                    <br/>
      
      
                  </div>
                </div>
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