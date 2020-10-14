import React, { useEffect, useState } from 'react';
// reactstrap components
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
// core components
import NavBlack from '../header/NavBlack';
import Footer from '../Footer';
import AOS from 'aos';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';



function ChooseProject() {
  const [posts, setPost] = useState([]);
  const [title, setTitle] = useState(null);
  const [Leader, setLeader] = useState(false);
  const [modal, setModal] = React.useState(false);
  let history = useHistory();

  const toggleModal = () => {
    setModal(!modal);
  }
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }

  };

  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    havegrp();
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  },[]);


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
        setLeader(res.data.leader)
      }
      )
  }

  const getprojects = async () => {
    let url = 'http://localhost:8001/posts/';
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
    let url = 'http://localhost:8001/groups/addproject/';
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

  const addproject = post => {
    setPost(post);
  }

  const loadOptionsProject = async (inputText,callback) => {
    let url = 'http://localhost:8001/posts/'+ inputText;
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





  useEffect(() => {
    getprojects();
    AOS.init();
    AOS.refresh();
  }, []);



  
  function ChooseProject(props){
    const isLeader = props.Leader;
    if (isLeader) {
  
      return (
        <>  
          <div>
          <h3 data-aos="fade-up" data-aos-delay="200">
                        Enter the project's titles from the
                        most wanted to the least wanted.   <br />
                          </h3>
                  <Container>
                    <div data-aos="fade-up" data-aos-delay="600">
                          <br />
    
                          <h5>Add your first choice..</h5>
    
    
                          <AsyncSelect
                            value={title}
                            onChange={addproject}
                            placeholder='enter the title of the project..'
                            loadOptions={loadOptionsProject}
                          />
                          <br /><br />
    
                          <h5>Add your second choice..</h5>
    
    
                          <AsyncSelect
                            value={title}
                            onChange={addproject}
                            placeholder='enter the title of the project..'
                            loadOptions={loadOptionsProject}
                          />
                          <br /><br />
    
    
                          <h5>Add your third choice..</h5>
    
    
                          <AsyncSelect
                            value={title}
                            onChange={addproject}
                            placeholder='enter the title of the project..'
                            loadOptions={loadOptionsProject}
                          />
                          <br />
                          <br />
                          <br /> <center>
    
                            <Button
                              block
                              className="btn-hover color-1"
                              onClick={() => { handleCreationProject() }}>
                              Submit choices
                      </Button>
    
                          </center><br />
                          <br />
    
                        </div>
               
                  </Container>
                </div>
              
     
        </>
      );
  
    }
    else return <div className="container">
    <div class="card my-4">
    <div class="card-body" data-aos="fade-up" data-aos-delay="400">
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
       <center><h1 > Tou have to be a leader to be able to submit</h1></center>
       <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    </div>
    </div>
  }



  return (
    <>
      <NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')} />
    
      <br/>
    <br/><br/>
    <br/><br/>
    <br/>
      <ChooseProject Leader={Leader} />
<br/>
<br/>
      <Footer />
    </>
  );
}

export default ChooseProject;
