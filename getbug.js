var Client = require('node-rest-client').Client;
client = new Client();
//提供用户凭据，将用于登录到JIRA
var loginArgs = {
    data: {
        "username": "tuozhenhua",
        "password": "tgg!@#"      
    },
    headers: {
        "Content-Type": "application/json"
    }
};
client.post("https://takara.atlassian.net/rest/auth/1/session", loginArgs, function (data, response) {
    if (response.statusCode == 200) {
        console.log('succesfully logged in, session:', data.session);
        var session = data.session;
        //获得会话信息，并将其存储在cookie的一个header
        var searchArgs = {
            headers: {
                //设置会话信息的Cookie
                cookie: session.name + '=' + session.value,
                "Content-Type": "application/json"
            },
            data: { 
           		jql: "project = IGXTW" 
           		// jql: "project = test"
           		// jql: "key = IGXRG" 
           		// jql: "*" 
            }
        };

        // client.get("https://takara.atlassian.net/rest/api/2//mypermissions?projectKey=IGXGOA2&projectId=10500&issueKey=IGXGOA2-&issueId=15115",function(data){
        //     console.log(data);
        // });
        // var url = "https://takara.atlassian.net/rest/api/2//mypermissions?projectKey=IGXGOA2&projectId=10500&issueKey=IGXGOA2-27&issueId=15115";
        // // var url = "https://takara.atlassian.net/rest/api/2//permissions";
        // client.get(url,function(data){
        //     console.log(data);
        // });

        client.post("https://takara.atlassian.net/rest/api/2/search", searchArgs, function (searchResult, response) {
        	// response.on('data',function(data){
        	// 	console.log(data)
        	// })
        	// response.on('end',function(){
        	// 	console.log('=== end');
        	// })
            console.log('status code:', response.statusCode);
            console.log('searchResult:', searchResult);
		});
    	
    }
})