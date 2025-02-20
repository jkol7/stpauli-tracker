const currentYear = new Date().getFullYear()

async function callApi(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

function getDfbPokalId(data) {
	dfbPokalId = data[0]['LeagueId'];
	callApi('https://www.openligadb.de/api/getnextmatchbyleagueteam/' + dfbPokalId + '/98').then(data => printDfbPokal(data))
}

function getBl2Id(data) {
	bl2Id = data[0]['LeagueId'];
	callApi('https://www.openligadb.de/api/getnextmatchbyleagueteam/' + bl2Id + '/98').then(data => printBl2(data))
}

function printDfbPokal(data) {
	let textDfbNextGame = document.getElementById('dfbNextGame');
	let textDfbNextGameMatchday = document.getElementById('dfbNextGameMatchday');
	let textDfbNextGameTeam1 = document.getElementById('dfbNextGameTeam1');
	let textDfbNextGameTeam2 = document.getElementById('dfbNextGameTeam2');

	let textDfbNextGameIconTeam1 = document.getElementById('dfbNextGameIconTeam1')
	textDfbNextGameIconTeam1.src = data['Team1']['TeamIconUrl'];
	textDfbNextGameIconTeam1.setAttribute("class", "img-icon-big");

	let textDfbNextGameIconTeam2 = document.getElementById('dfbNextGameIconTeam2')
	textDfbNextGameIconTeam2.src = data['Team2']['TeamIconUrl'];
	textDfbNextGameIconTeam2.setAttribute("class", "img-icon-big");
	
	textDfbNextGame.innerHTML = data['LeagueName'];
	textDfbNextGameMatchday.innerHTML = data['Group']['GroupName'] + ' - ' + new Date(data['MatchDateTime']).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', });
	textDfbNextGameTeam1.innerHTML = data['Team1']['ShortName'];
	textDfbNextGameTeam2.innerHTML = data['Team2']['ShortName'];
}

function printBl2(data) {
	let textBl2NextGame = document.getElementById('bl2NextGame');
	let textBl2NextGameMatchday = document.getElementById('bl2NextGameMatchday');
	let textBl2NextGameTeam1 = document.getElementById('bl2NextGameTeam1');
	let textBl2NextGameTeam2 = document.getElementById('bl2NextGameTeam2');

	let textBl2NextGameIconTeam1 = document.getElementById('bl2NextGameIconTeam1')
	textBl2NextGameIconTeam1.src = data['Team1']['TeamIconUrl'];
	textBl2NextGameIconTeam1.setAttribute("class", "img-icon-big");

	let textBl2NextGameIconTeam2 = document.getElementById('bl2NextGameIconTeam2')
	textBl2NextGameIconTeam2.src = data['Team2']['TeamIconUrl'];
	textBl2NextGameIconTeam2.setAttribute("class", "img-icon-big");
	
	textBl2NextGame.innerHTML = data['LeagueName'];
	textBl2NextGameMatchday.innerHTML = data['Group']['GroupName'] + ' - ' + new Date(data['MatchDateTime']).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', });
	textBl2NextGameTeam1.innerHTML = data['Team1']['ShortName'];
	textBl2NextGameTeam2.innerHTML = data['Team2']['ShortName'];
}

function printTable(data) {
	let table = document.getElementById('leagueTable');
	let helper = 1;
	for (let key in data) {
		let newRow = table.insertRow(helper);

		let newCellPosition = newRow.insertCell(-1);
		let newCellLogo= newRow.insertCell(-1);
		let newCellTeam= newRow.insertCell(-1);
		let newCellMatches= newRow.insertCell(-1);
		let newCellSUN= newRow.insertCell(-1);
		let newCellGoalDiff= newRow.insertCell(-1);
		let newCellPoints= newRow.insertCell(-1);

		let textPosition = document.createTextNode(helper);
		let textLogo = document.createElement('img')
		textLogo.src = data[key]['TeamIconUrl']
		textLogo.setAttribute("class", "img-icon");
		let textTeam = document.createTextNode(data[key]['ShortName']);
		let textMatches = document.createTextNode(data[key]['Matches']);
		let textSUN = document.createTextNode(data[key]['Won'] + "/" + data[key]['Draw'] + "/" + data[key]['Lost']);
		let textGoalDiff = document.createTextNode(data[key]['GoalDiff']);
		let textPoints = document.createTextNode(data[key]['Points']);

		newCellPosition.appendChild(textPosition)
		newCellLogo.appendChild(textLogo)
		newCellTeam.appendChild(textTeam)
		newCellMatches.appendChild(textMatches)
		newCellSUN.appendChild(textSUN)
		newCellGoalDiff.appendChild(textGoalDiff)
		newCellPoints.appendChild(textPoints)

		helper++;
	}
}


callApi('https://www.openligadb.de/api/getbltable/bl2/' + currentYear).then(data => printTable(data));
callApi('https://www.openligadb.de/api/getmatchdata/dfb' + currentYear).then(data => getDfbPokalId(data));
callApi('https://www.openligadb.de/api/getmatchdata/bl2').then(data => getBl2Id(data));
