var request = require('request-promise');
var fs = require('fs');



exports.upload = function(req,res) {
	// console.log(req.files);

	// request(req.body.$ngfBlobUrl)
	// 	.then(function(response){
	// 		console.log(response)
	// 	})
	
	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
		var response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	}
	// Regular expression for image type:
	// This regular image extracts the "jpeg" from "image/jpeg"
	var imageTypeRegularExpression      = /\/(.*?)$/;      
	// Generate random string
	
	var imageBuffer                      = decodeBase64Image(req.body.data);
	var userUploadedFeedMessagesLocation = 'assets/images/';
	var uniqueRandomImageName            = req.body.filename;
	// This variable is actually an array which has 5 values,
	// The [1] value is the real image extension
	var imageTypeDetected                = imageBuffer.type.match(imageTypeRegularExpression);
	var userUploadedImagePath            = userUploadedFeedMessagesLocation+uniqueRandomImageName+'.'+imageTypeDetected[1];
	var imageStoragePath 				 = "public/" + userUploadedImagePath
	// Save decoded binary image to disk

	fs.writeFile(imageStoragePath, imageBuffer.data,function(error){
		console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
		res.json(userUploadedImagePath )
	});

};


