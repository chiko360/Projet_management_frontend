import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBlack from  '../header/NavBlack';
import AOS from 'aos';
import Footer from '../Footer';
import {
  Button,
  Form,
  Input,
  Container,
} from "reactstrap";
function AddProject() {

    const [title, setTitle] = useState(null);
    const [promo, setPromo] = useState("2CPI");
    const [introduction, setIntro] = useState(null);
    const [tags, setTags] = useState(null);
    const [tools, setTools] = useState(null);
    const [details, setDetails] = useState(null);
    const [keywords, setkw] = useState([]);
    let history = useHistory();

    const addkeyword = keywords => {
      setkw([...keywords, keywords]);
    }

    const loadOptions = async (inputText,callback)=> {
      let url = 'http://localhost:8001/members/'+inputText;
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
      const response = await fetch(url,options)
      const json = await response.json()
      callback(json.map(i=>({label:i.first_name+' '+i.last_name,value:i.last_name+' '+i.last_name})));
    }

    const Post = async () => {
        let url = 'http://localhost:8001/posts/addpost/teacher/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'POST',
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
            history.replace('/teacher/MyProjects');
        }
    }

    useEffect(()=> {
      if (localStorage.getItem('type')!=='teacher'){
          history.push('/Forbiden')
      }
      
    AOS.init();
    AOS.refresh();
  },[]);
    return(    
<>
<NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
<div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div className="section about">
                      <br/>
                      <br/>
                      <br/>
                        <Container>  
                        <section class="breadcrumbs"  data-aos="fade-up" data-aos-delay="200">
                  <div class="container">
                    <div class="d-flex justify-content-between align-items-center">
                      <h2>Add Project</h2>
                      <ol>
                        <li><a href="/">home</a></li>
                        <li><a href="/teacher">teacher</a></li>
                        <li>add project</li>
                      </ol>
                    </div>
                  </div>
                </section>
    <hr/>
  <div className="container">
        <div class="card my-4">
    <h2 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">
      <br/>
      Fill the fields and hit submit to add a new project.
      <a href="/teacher/myprojects">
                  <Button
                    style={{ float: 'right' }}
                    size="lg"
                    className="bttn-hover color-9">
                    my Projects
  </Button>
                </a>

                <br />
                <br />
                </h2>


    <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                <Form>
                  <Input
                    className="form-control my-3"
                    name="title"
                    placeholder="Add a title to your project.."
                    onChange={(event) => { setTitle(event.target.value) }}
                  />
                      <form class="ui form">
    <select onChange={(event)=>{setPromo(event.target.value)}}>
                <option>2CPI</option>
                <option>1CS</option>
                <option>2CS / ISI</option>
                <option>2CS / SIW</option>
                <option>3CS / ISI</option>
                <option>3CS / SIW</option>
            </select></form>
    
                  <textarea
                    className="form-control my-3"
                    rows="3" cols="50"
                    type="text"
                    name="introduction"
                    placeholder="Add an introduction to your project.."
                    onChange={(event) => { setIntro(event.target.value) }}
                  >
                  </textarea>

                  <textarea
                    className="form-control my-3"
                    rows="3" cols="50"
                    type="text"
                    name="tools"
                    placeholder="Enter the tools needed to make your project.."
                    onChange={(event) => { setTools(event.target.value) }}
                  >
                  </textarea>

                  <textarea
                    className="form-control my-3"
                    rows="5" cols="50"
                    type="text"
                    name="details"
                    placeholder="Add more details to your project.."
                    onChange={(event) => { setDetails(event.target.value) }}
                  >
                  </textarea>
                  <input
                    className="form-control my-3"
                    type="text"
                    name="keywords"
                    placeholder="Enter the key words.."
                    onChange={(event) => { setTags(event.target.value) }} /> <br />
                  <br />
                </Form>
                <center>
                  <Button size="lg" className="bttn-hover color-1" onClick={()=>{Post()}} >
        submit
   </Button></center>
   <br/>
   <br/>
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

export default AddProject;