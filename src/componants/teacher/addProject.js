import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import { Header } from "semantic-ui-react";
import HorNavbar from '../HorNavbar';
import "../../addP.css";
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
      let url = 'http://localhost:8000/members/'+inputText;
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
        let url = 'http://localhost:8000/posts/addpost/';
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
          <h2>Add Project</h2>
          <a href="/teacher/myprojects"><Button className="btn-round" color="info" >back to my Projects</Button></a>
        </div>
      </div>
    </section>
    <hr/>
  <div className="container">
        <div class="card my-4">
    <h5 class="card-header headerr">Fill the fields and hit submit to add a new project.</h5>
    <div class="card-body">
<Form>
    <Input
      className="form-control my-3"
      name="title" placeholder="title" onChange={(event)=>{setTitle(event.target.value)}}
    />
    <form class="ui form">
    <select onChange={(event)=>{setPromo(event.target.value)}}>
                <option>2CPI</option>
                <option>1CS</option>
                <option>2CS</option>
                <option>3CS</option>
            </select></form>
    <br/>

    <textarea
      className="form-control my-3"
      rows="4" cols="50" type="text" name="introduction" placeholder="introduction" onChange={(event)=>{setIntro(event.target.value)}}
      >
    </textarea>
    
    <textarea
      className="form-control my-3"
      rows="4" cols="50" type="text" name="tools" placeholder="tools" onChange={(event)=>{setTools(event.target.value)}}
     >
    </textarea>

    <textarea
      className="form-control my-3"
      rows="10" cols="50" type="text" name="details" placeholder="details" onChange={(event)=>{setDetails(event.target.value)}}
      >
    </textarea>
    <input className="form-control my-3" type="text" name="keywords" placeholder="keywords" onChange={(event)=>{setTags(event.target.value)}} /> <br/>
    <br/>
    </Form>
    <center><Button size="lg" className="btn-round" color="info" onClick={()=>{Post()}} >
        submit
   </Button></center>
    </div>
        </div>
      </div>     
        </Container>
    </div>
  </div>
  </div>
  </div>
        <Footer/>
    </>
    );
}

export default AddProject;

//<React.Fragment>
//<HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
//<div className="auth-main">
//  <div class="auth-content">
//        <div className="auth-card">
//          <Header as="h2" color="black" textAlign="center">
//                  add project    
//              </Header>
//              <form class="ui form">
//            <input type="text" name="title" placeholder="title" onChange={(event)=>{setTitle(event.target.value)}} /></form><br/>
//            <form class="ui form">
//            <select onChange={(event)=>{setPromo(event.target.value)}}>
//                <option>2CPI</option>
//                <option>1CS</option>
//                <option>2CS</option>
//                <option>3CS</option>
//            </select> </form> <br/>
//            <form class="ui form">
//            <textarea rows="4" cols="50" type="text" name="introduction" placeholder="introduction" onChange={(event)=>{setIntro(event.target.value)}} /> 
//            </form><br/>
//            <form class="ui form">
//            <textarea rows="4" cols="50" type="text" name="tools" placeholder="tools" onChange={(event)=>{setTools(event.target.value)}} />
//            </form><br/>
//            <form class="ui form">
//            <textarea rows="10" cols="50" type="text" name="details" placeholder="details" onChange={(event)=>{setDetails(event.target.value)}} />
//            </form><br/>
//            <form class="ui form">
//            <input type="text" name="keywords" placeholder="keywords" onChange={(event)=>{setTags(event.target.value)}} /> <br/>
//            </form><br/>
//            <AsyncSelect isMulti value={keywords} onChange={addkeyword} placeholder='type your keywords' loadOptions={loadOptions} />
//            <Button class="ui button" color="blue" size="huge" type="submit" onClick={()=>{Post()}}>submit</Button>
//          </div>
//          </div>
//      </div>
//      </React.Fragment>