import React from 'react'
	class Navbar extends React.Component{

		constructor(props){
			super(props);
			this.change = this.change.bind(this);
		}

		change(page){
			this.props.change(page);
		}

		render(){
		if(this.props.admin){	
		return(	<nav className='navbar navbar-default'>
				<div className='container'>
					<div className='navbar-header'>
						<a className='navbar-brand' href='#'>{this.props.brand}</a>
					</div>
					<div id='navbar'>
						<ul className='nav'>

							<li className={(this.props.currentPage === 'about') ? 'active' : ''}><a onClick={this.change.bind(this,'about')} href='#'>ADD PROJECT</a></li>

							
							
							<li className={(this.props.currentPage === 'projectAdminStatus') ? 'active' : ''}><a onClick={this.change.bind(this,'projectAdminStatus')} href='#'>PROJECTS</a></li>
							
						</ul>	
					</div>	
				</div>
			</nav>
			)}else{
			return(	<nav className='navbar navbar-default'>
				<div className='container'>
					<div className='navbar-header'>
						<a className='navbar-brand' href='#'>{this.props.brand}</a>
					</div>
					<div id='navbar'>
						<ul className='nav'>
							
							<li className={(this.props.currentPage === 'publicProjects') ? 'active' : ''}><a onClick={this.change.bind(this,'publicProjects')} href='#'>ACCEPT PROJECT</a></li>
							<li className={(this.props.currentPage === 'completeProject') ? 'active' : ''}><a onClick={this.change.bind(this,'completeProject')} href='#'>COMPLETE PROJECT</a></li>
							
							<li className={(this.props.currentPage === 'myProjects') ? 'active' : ''}><a onClick={this.change.bind(this,'myProjects')} href='#'>PROJECT STATUS</a></li>
							
						</ul>	
					</div>	
				</div>
			</nav>
			)
		}
		}
	}
	export default Navbar