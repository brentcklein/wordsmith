// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     file: "smith.js"
//   });
// });

var mode;

function click(e) {
	switch (e.target.id) {
		case 'total':
			mode = 1;
			break;
		case 'overwhelming':
			mode = 0.75;
			break;
		case 'comfortable':
			mode = 0.5;
			break;
		case 'covert':
			mode = 0.25;
			break;
		default:
			mode = 0.25;
			break;
	}

	chrome.tabs.executeScript({
		file: "smith.js"
	});
}

document.addEventListener('DOMContentLoaded', function () {
	var divs = document.querySelectorAll('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', click);
	}
});

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(request) {
    if (request.string) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://fuzzylogicinc.net/boggle/Solver.svc?BoardID=' + request.string + '&Length=3');
		xhr.onreadystatechange = function () {
			var result = {};
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					result = {success: true, mode: mode, data: JSON.parse(xhr.responseText)};
				} else {
					result = {error: true, data: xhr.responseText}
				}
				port.postMessage(result);
			}
		};
		xhr.send();
	} else if (request.done) {
		window.close();
	}
  });
});

// chrome.runtime.onMessage.addListener(
// 	function (request, sender, sendResponse) {
// 		if (request.string) {
// 			var xhr = new XMLHttpRequest();
// 			xhr.open('GET', 'http://fuzzylogicinc.net/boggle/Solver.svc?BoardID=' + request.string + '&Length=3');
// 			xhr.onreadystatechange = function () {
// 				var result = {};
// 				if (xhr.readyState === XMLHttpRequest.DONE) {
// 					if (xhr.status === 200) {
// 						result = {success: true, mode: mode, data: JSON.parse(xhr.responseText)};
// 					} else {
// 						result = {error: true, data: JSON.parse(xhr.responseText)}
// 					}
// 					sendResponse(result);
// 				}
// 			};
// 			xhr.send();
// 		}
// 		return true;
// 	}
// );