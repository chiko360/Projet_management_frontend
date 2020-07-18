import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import { Button, Header } from "semantic-ui-react";
import HorNavbar from '../HorNavbar';
import "../../addP.css";
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
      <React.Fragment>
        <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
        <div className="auth-main">
          <div class="auth-content">
                <div className="auth-card">
                  <Header as="h2" color="black" textAlign="center">
                          add project    
                      </Header>
                      <form class="ui form">
                    <input type="text" name="title" placeholder="title" onChange={(event)=>{setTitle(event.target.value)}} /></form><br/>
                    <form class="ui form">
                    <select onChange={(event)=>{setPromo(event.target.value)}}>
                        <option>2CPI</option>
                        <option>1CS</option>
                        <option>2CS</option>
                        <option>3CS</option>
                    </select> </form> <br/>
                    <form class="ui form">
                    <textarea rows="4" cols="50" type="text" name="introduction" placeholder="introduction" onChange={(event)=>{setIntro(event.target.value)}} /> 
                    </form><br/>
                    <form class="ui form">
                    <textarea rows="4" cols="50" type="text" name="tools" placeholder="tools" onChange={(event)=>{setTools(event.target.value)}} />
                    </form><br/>
                    <form class="ui form">
                    <textarea rows="10" cols="50" type="text" name="details" placeholder="details" onChange={(event)=>{setDetails(event.target.value)}} />
                    </form><br/>
                    <form class="ui form">
                    <input type="text" name="keywords" placeholder="keywords" onChange={(event)=>{setTags(event.target.value)}} /> <br/>
                    </form><br/>
                    <AsyncSelect isMulti value={keywords} onChange={addkeyword} placeholder='type your keywords' loadOptions={loadOptions} />
                    <Button class="ui button" color="blue" size="huge" type="submit" onClick={()=>{Post()}}>submit</Button>
                  </div>
                  </div>
              </div>
              </React.Fragment>
        );
}

export default AddProject;