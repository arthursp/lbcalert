var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

sendmail = require('sendmail')();
 
/*sendmail({
    from: 'no-reply@yourdomain.com',
    to: 'youraddress@yourprovider.com',
    subject: 'test sendmail',
    content: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
*/
app.get('/', function (req, res) {

	var line="";

	url = 'http://www.leboncoin.fr/annonces/offres/lorraine/moselle/?f=a&th=1&q=drone';

	request(url, function(error, response, html){

	    if(!error){

	        var $ = cheerio.load(html);
	       
	        $('.list-lbc a .lbc').slice(0,5).filter(function(){
	       
	            var data = $(this);

	            data.each(function( index ) {

	            	var url = $(this).parent().attr('href');
					var date = $( this ).find('.date').text();
					var title = $( this ).find('.title').text();
					var price = $( this ).find('.price').text();

					line += date+" | "+title+" | "+price+" | <a href=\""+url+"\">lien</a><br />";
								
				});
	            
	        })
	        
	    }

	    res.send(line);

	});
  
});

var server = app.listen(3000, function () {

	console.log('Server started !');

});