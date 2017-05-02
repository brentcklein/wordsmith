var iframe    = document.getElementsByName('main')[0],

    iframeDoc = ((!!iframe['contentDocument']) 
              ? iframe.contentDocument 
              : iframe.contentWindow.document),

    board     = iframeDoc.getElementById('b4x4'),
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
var port = chrome.runtime.connect({name: "connection"});
port.postMessage({string: boardString});
port.onMessage.addListener(function(response) {
	if (response.success) {
		console.log(response.data.Solutions.length + ' solutions found');
		var word, count = 0;
		shuffle(response.data.Solutions);
		for (var i = 0; i <= (response.data.Solutions.length * response.mode) - 1 ; i++) {
			count++;
			word = response.data.Solutions[i].Word;
			input.value = word;
			eventFire(button, 'click');
		}
		console.log(count + ' answers entered');
		port.postMessage({done: true});
	}
});

// chrome.runtime.sendMessage({string: boardString}, function (response) {
// 	if (response.success) {
// 		console.log(response.data.Solutions.length + ' solutions found');
// 		var word, count = 0;
// 		shuffle(response.data.Solutions);
// 		for (var i = 0; i <= (response.data.Solutions.length * response.mode) - 1 ; i++) {
// 			count++;
// 			word = response.data.Solutions[i].Word;
// 			input.value = word;
// 			eventFire(button, 'click');
// 		}
// 		console.log(count + ' answers entered');
// 	}
// });

function shuffle(a) {
    var j, x, i, l;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}