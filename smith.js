var board = document.getElementById('b4x4').getElementsByTagName('TABLE')[0];

var letters = [];
var rows = board.getElementsByTagName('TR');

for (var i = rows.length - 1; i >= 0; i--) {
	var lets = rows[i].getElementsByTagName('TD');
	for (var k = lets.length - 1; k >= 0; k--) {
		letters.push(lets[k].innerHTML);
	}
}

var boardString = letters.join('');

var request = XMLHttpRequest();
request.onreadystatechange = enterAnswers;

request.open('GET', 'http://fuzzylogicinc.net/boggle/Solver.svc?BoardID=' + boardString + '&Length=3');
request.SEND()

function enterAnswers() {
	if (request.readyState === XMLHttpRequest.DONE) {
		if (request.status === 200) {
			alert('logging');
			console.log(request.responseText);
		} else {
			alert('there was a problem');
		}
	}
}