import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Dao from '../../build/contracts/Dao.json'
import Content from './Content'
import First from './First'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      token: 0,
      logged: false,
      user: "",
      authoriseUser: false,
      admin: false,
      pass: ""
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.dao = TruffleContract(Dao)
    this.dao.setProvider(this.web3Provider)

    this.addUser = this.addUser.bind(this)
    this.addProject = this.addProject.bind(this)
    this.acceptProject =  this.acceptProject.bind(this)
    this.completeProject = this.completeProject.bind(this)
    this.tokenStatus = this.tokenStatus.bind(this)
    this.updateTable = this.updateTable.bind(this)
    this.verifyProject = this.verifyProject.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange1 = this.handleChange1.bind(this)
    this.userCheck = this.userCheck.bind(this)
    this.checkAdmin = this.checkAdmin.bind(this)
    this.changeLogged = this.changeLogged.bind(this)
   

  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.dao.deployed().then((daoInstance) => {
        this.daoInstance = daoInstance
        this.updateTable()
      })
    })
  } 


  verifyProject(id,user){
    this.daoInstance.verifyTask(id,user, { from: this.state.account}).then((result) =>{
      console.log(result)
      this.updateTable()
      this.tokenStatus()
    }
    )    
  }

  updateTable(){
    this.daoInstance.projectCount().then((candidatesCount) => {
      this.setState({ candidates: [] })
          for (var i = 1; i <= candidatesCount; i++) {
            this.daoInstance.proj(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                index : candidate
              });
              this.setState({ candidates: candidates })
            });
          }
        })
    console.log(this.state.candidates)
  }


  addUser(user, id, admin, pass) {
    console.log("pasowrd type: "+pass)
    console.log("paramsadduser",""+user+id+admin);
    this.daoInstance.addUser(id, user, admin, pass, { from: this.state.account , gas:1000000}).then((result) =>
      console.log(result)
    )
    this.tokenStatus(user);
  }

  addProject(id, name, deadline, tokens) {
    console.log("id :"+id+" name :"+name+" dead :"+deadline+" tokens :"+tokens)
    this.daoInstance.addProject(id, name, tokens, deadline, { from: this.state.account , gas:1000000 }).then((result) =>{
      console.log(result)
      this.updateTable()
      }
    )
  }

  acceptProject(user , projectId) {
    console.log("paramsadduser"," "+user+" "+projectId);
    this.daoInstance.acceptProject(user , projectId , { from: this.state.account}).then((result) =>{
      console.log(result)
     this.updateTable() 
    }
    )
  }

  completeProject(projectId , deadline) {
    this.daoInstance.completeProject(projectId , deadline, { from: this.state.account }).then((result) =>{
      console.log(result)
      this.updateTable()
    }
    )
  }

  tokenStatus(user) {
    console.log("user "+user)
    this.daoInstance.fetchBalance(user, { from: this.state.account }).then((result) =>{
        this.setState({ token: result.toNumber() })
      console.log(result)
    })
  }

  userCheck(user,pass) {
      this.daoInstance.authorise(user,pass, { from: this.state.account }).then((result) =>{
        this.setState({ authoriseUser: result })
      console.log(result)
    })
  }

  checkAdmin(user) {

    this.daoInstance.checkAdmin(user, { from: this.state.account }).then((result) =>{
        this.setState({ admin: result })
      console.log(result)
    })
  }

  handleChange(user1,id1,pass1,admin1){
    this.addUser(user1,id1,admin1,pass1)
    
    this.setState({admin: admin1})

    this.setState({logged: true})
    this.setState({user: user1})
    this.tokenStatus(user1)
  }

  handleChange1(user1,pass1){

    this.userCheck(user1,pass1)
    this.checkAdmin(user1)
    if(pass1 == this.state.pass){
      console.log("pass1 "+pass1+" result "+this.state.pass)
      this.setState({authoriseUser: true})
    }
    if(this.state.authoriseUser){ 
      this.setState({logged: true})
      this.setState({user: user1})
      this.tokenStatus(user1)
      }
  }  

  changeLogged(){
    this.setState({logged: !this.state.logged})
    this.setState({token: 0 , admin: false})
  }

  render() {
    if(!this.state.logged){
        return(
            <First change={this.handleChange} change1={this.handleChange1}/>
          )
    }else{
        return (
          <div class='row'>
            <div class='col-lg-12 text-center' >
              <br/>
               <Content
                    account={this.state.account}
                    candidates={this.state.candidates}
                    token={this.state.token}
                    user={this.state.user}
                    admin={this.state.admin}
                    change={this.changeLogged}
                    addUser={this.addUser} 
                    addProject={this.addProject} 
                    acceptProject={this.acceptProject} 
                    completeProject={this.completeProject} 
                    verifyProject={this.verifyProject}
                    tokenStatus={this.tokenStatus}/>
            </div>
          </div>
        )
    }
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
