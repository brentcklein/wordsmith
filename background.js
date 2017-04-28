chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: "smith.js"
  });
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.string) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://fuzzylogicinc.net/boggle/Solver.svc?BoardID=' + request.string + '&Length=3');
			xhr.onreadystatechange = function () {
				var result = {};
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						result = {success: true, data: JSON.parse(xhr.responseText)};
					} else {
						result = {error: true, data: JSON.parse(xhr.responseText)}
					}
					sendResponse(result);
				}
			};
			xhr.send();
		}
		return true;
	}
);