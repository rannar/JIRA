var https = require('https');
var url = "https://takara.atlassian.net/browse/IGXKOP-14"

https.get(url,function(response){
	
	console.log(response);
})