var iframe    = document.getElementsByName('main')[0], 
                /* or other kind of reference to the iframe DOM node */

    iframeDoc = ((!!iframe['contentDocument']) 
              ? iframe.contentDocument 
              : iframe.contentWindow.document),

    board     = iframeDoc.getElementById('b4x4'),
                /* this is a reference to cell inside the iframe */
    input	  = iframeDoc.getElementById('input');
    button	  = iframeDoc.getElementById('ext-gen207');


var letters = [];
var rows = board.getElementsByTagName('TR');
var l;
for (var i = 0; i <= rows.length - 1; i++) {
	var lets = rows[i].getElementsByTagName('TD');
	for (var k = 0; k <= lets.length - 1; k++) {
		if (lets[k].innerHTML == 'Qu') {
			l = 'Q';
		} else {
			l = lets[k].innerHTML;
		}
		letters.push(l);
	}
}

var boardString = letters.join('');

console.log('fetching solutions for board: ' + boardString);
chrome.runtime.sendMessage({string: boardString}, function (response) {
	if (response.success) {
		var word;
		for (var i = response.data.Solutions.length - 1; i >= response.data.Solutions.length; i--) {
			word = response.data.Solutions[i].Word;
			console.log('setting input to ' + word);
			input.value = word;
			console.log('submitting form');
			eventFire(button, 'click');
		}
	}
});

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}