pragma solidity ^0.4.2;
contract Dao{
    
    event projectAdded(address owner , uint projectId , string projectName);
    event projectAccepted(uint projectId,address user);
    event projectCompleted(uint projectId,address user);
    event tokensTransfered(uint projectId,address user,uint tokens);
    event taskVerified(uint projectId);

    address owner;
    enum ProjectStatus{Pending , Completed}    

    constructor(){                
        owner=msg.sender;
    }
    
    struct Users{
        address user;
        bool isAdmin;
        string password;
    }
    
    struct Project{
        address adminId;
        string name;
        string deadline;
        uint tokens;
        bool assigned;
        address assigned_to;
        ProjectStatus status;
        uint id;
        bool verified;
        string username;
        string employee;
    }

    uint public projectCount;

    mapping ( string => Users ) userList;
    mapping ( uint => Project ) public proj;
    mapping ( address => uint ) public balanceOf;
    
    
    modifier isOwner(){               
        require(msg.sender==owner);
        _;
    }
    
    modifier isAdmin(string id){               
        require(userList[id].isAdmin == true);
        _;
    }

    modifier unAssigned(uint projectId){
        require(proj[projectId].assigned==false);
        _;
    }


    modifier belongsUser(string id , uint projectId){
        require(proj[projectId].assigned_to == userList[id].user);
        _;
    }

    modifier belongsAdmin(string id , uint projectId){
        require(proj[projectId].adminId == userList[id].user);
        _;
    }


    
    function addUser(address user , string id , bool admin ,string pass ) isOwner{
        userList[id].user = user;
        userList[id].isAdmin = admin;
        userList[id].password = pass;
        if(admin)
            balanceOf[user] = 1000;
    }

    function addProject(string id , string name , uint tokens , string deadline  ) isOwner isAdmin(id){
        projectCount+=1;
        proj[projectCount].adminId=userList[id].user;
        proj[projectCount].name=name;
        proj[projectCount].deadline=deadline;
        proj[projectCount].tokens=tokens;
        proj[projectCount].status=ProjectStatus.Pending;
        proj[projectCount].id=projectCount;
        proj[projectCount].username=id;
        projectAdded(userList[id].user , projectCount , name);
    }

    function acceptProject(string id , uint projectId) isOwner{
        proj[projectId].assigned_to = userList[id].user;
        proj[projectId].assigned = true;
        proj[projectId].employee=id;
        projectAccepted(projectId,userList[id].user);
    }

    function completeProject(uint projectId , string deadline) isOwner{
        proj[projectId].status=ProjectStatus.Completed;
        projectCompleted(projectId,proj[projectId].assigned_to);
    }

    function verifyTask(uint projectId , string id) isAdmin(id){
        proj[projectId].verified=true;
        taskVerified(projectId);
        sendTokens(projectId);
    }    

    function sendTokens(uint projectId){
        balanceOf[proj[projectId].assigned_to]+=proj[projectId].tokens;
        balanceOf[proj[projectId].adminId]-=proj[projectId].tokens;
        tokensTransfered(projectId,proj[projectId].assigned_to,proj[projectId].tokens);
    }

    function fetchProjectDetails(uint projectId)  unAssigned(projectId) returns (string , string , uint ){                 
        return (proj[projectId].name,proj[projectId].deadline,proj[projectId].tokens);
    }

     function fetchUserProjectDetails(string id ,uint projectId) belongsUser(id , projectId) returns (string , string , uint ) {                 
        return (proj[projectId].name,proj[projectId].deadline,proj[projectId].tokens);
    }

    function fetchAdminProjectDetails(string id ,uint projectId)  belongsAdmin(id , projectId) public view returns (bool){                 
        return true;
    }

    function fetchBalance(string id) public view returns(uint){
        return balanceOf[userList[id].user];
    }

    function authorise(string id,string pass) public view returns(bool){
        return keccak256(pass) == keccak256(userList[id].password);
    }   

    function checkAdmin(string id) public view returns(bool){
        return userList[id].isAdmin;
    }
    
}