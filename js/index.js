document.addEventListener('deviceready', onDeviceReady, false);

var logOb;


function onDeviceReady() {
	
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dir) {
		
		dir.getFile("jlaslog.txt", {create:true}, function(file) {
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
	
	console.log("FileSystem Error");
	console.dir(e);
}


function writeLog(str) {
	
	if(!logOb) return;
	
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
