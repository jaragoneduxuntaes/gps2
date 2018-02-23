document.addEventListener('deviceready', onDeviceReady, false);

var logOb;


function onDeviceReady() {

	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
		console.log("got main dir",dir);
		dir.getFile("log.txt", {create:true}, function(file) {
			console.log("got the file", file);
			logOb = file;
			writeLog("App started");			
		});
	});
	
	document.querySelector("#actionOne").addEventListener("touchend", function(e) {
		//Ok, normal stuff for actionOne here
		//
		//Now log it
		writeLog("actionOne fired");
	}, false);

	document.querySelector("#actionTwo").addEventListener("touchend", function(e) {
		//Ok, normal stuff for actionTwo here
		//
		//Now log it
		writeLog("actionTwo fired");
	}, false);

}



function fail(e) {
	alert("Fallo jlas");
	console.log("FileSystem Error");
	console.dir(e);
}


function writeLog(str) {
	alert("Escribiendo en log Intento..:");
	if(!logOb) return;
	alert("Escribiendo en log..:");
	var log = str + " [" + (new Date()) + "]\n";
	logOb.createWriter(function(fileWriter) {
		fileWriter.seek(fileWriter.length);
		var blob = new Blob([log], {type:'text/plain'});
		fileWriter.write(blob);
	}, fail);
}

function justForTesting() {
	logOb.file(function(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			console.log(this.result);
		};

		reader.readAsText(file);
	}, fail);

}
