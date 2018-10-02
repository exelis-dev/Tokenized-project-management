import React from 'react'

class First extends React.Component{
	      
	     constructor(props){
			super(props);
			this.handleSignUp = this.handleSignUp.bind(this);
			this.handleLogIn = this.handleLogIn.bind(this);			
			this.changer = this.changer.bind(this);
			this.changer1 = this.changer1.bind(this);
			this.state = {
				signup: true,
				login: false
			};
		}

		handleSignUp(){
			this.setState({signup: true , login: false});
		}
		handleLogIn(){
			this.setState({signup: false , login: true});
		}
		changer(user,address,admin,pass){
			this.props.change(user,address,admin,pass)
		}

		changer1(user,pass){
			this.props.change1(user,pass)
		}
  
		  render(){
		        return (
		              <div id="root1">
		                      <div id="buttons">
		                        <p id="signupButton"  onClick={this.handleSignUp} > Sign Up</p>
		                        <p id="loginButton"  onClick={this.handleLogIn} > Login</p>
		                      </div>
		              
		                   {this.state.signup?<SignUp changer={this.changer}/> : null}
		                   {this.state.login? <Login changer1={this.changer1}/> : null}
		            
		             </div>
		        )
		  	}

	}



	class SignUp extends React.Component{

		
		constructor(props) {
		    super();
		    this.handleSubmit = this.handleSubmit.bind(this);
		    this.handleCheck = this.handleCheck.bind(this);
		    this.state = {
		    	checked: false
		    }
		  }

		  handleSubmit() {
		  	console.log("password "+this.password.value)
		    this.props.changer(this.refs.user.value,this.refs.address.value,this.password.value,this.state.checked);
		  }

		  handleCheck(){
		  	this.setState({checked: !this.state.checked})
		  }
	      
	      render(){
	        
	            return (
	            
	                  <div>
	                 	<div id="signup">
		                    <form onSubmit={this.handleSubmit} className="signupform">
						          <div> <label>USERNAME</label> <input ref="user" type="text" placeholder="username" /></div>
						          
						          <div> <label>ADDRESS</label><input ref="address" type="text" placeholder="address" /></div>
						          
						          <div> <label>PASSWORD</label><input ref={x => this.password = x} type="password" placeholder="password" /></div>
						          
						          <div> <label>Admin</label><input  className="adminsignup" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} /></div>
						          <input type="submit" value="Submit" />
						    </form>
	            	 	</div>
	                  </div>       
	            )
	      }
	}


	class Login extends React.Component{
	      
		
		constructor(props) {
		    super();
		    this.handleSubmit = this.handleSubmit.bind(this);
		  }

		  handleSubmit() {
		    this.props.changer1(this.refs.user.value,this.refs.pass.value);
		  }


	      render(){
	        
	            return (
	            
	                  <div>
	                 	<div id="login">
						    <form onSubmit={this.handleSubmit} className="loginform">
						          <div> <label>USERNAME</label><input ref="user" type="text" placeholder="username" /></div>
						          
						          <div> <label>PASSWORD</label><input ref="pass" type="password" placeholder="password" /></div>
						          
						          <input type="submit" value="Submit" />
						    </form>
	            	 	</div>
	                  </div>       
	            )
	      }
	}


	
export default First