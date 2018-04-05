'use strict';


let audio = getAudio();
let buttons = document.getElementsByClassName('fa');
let player = getPlayer();
let title = document.getElementsByClassName('title');

let tracks = [
	{
		name: 'LA Chill Tour',
		path: 'mp3/LA Chill Tour.mp3'
	},
	{
		name: 'LA Fusion Jam',
		path: 'mp3/LA Fusion Jam.mp3'
	},
	{
		name: 'This is it band',
		path: 'mp3/This is it band.mp3'
	}
];


for (let button of buttons) {
	if (button.classList.contains('fa-play')) {
		button.onclick = function() {
			player.classList.toggle('play');
			audio.play();
		}
	}

	if (button.classList.contains('fa-pause')) {
		button.onclick = function() {
			player.classList.toggle('play');
			audio.pause();
		}
	}

	if (button.classList.contains('fa-stop')) {
		button.onclick = function() {
			player.classList.remove('play');
			audio.pause();
			audio.currentTime = 0;	
		}
	}

	if (button.classList.contains('fa-backward')) {
		button.onclick = function() {
			let index = getIndex();
			index--;
			
			if (index < 0) {
				index = tracks.length - 1;
				changeTrack(tracks[index].name, tracks[index].path);
			}
			else {
				changeTrack(tracks[index].name, tracks[index].path);
			}
		}
	}

	if (button.classList.contains('fa-forward')) {
		button.onclick = function() {
			let index = getIndex();
			index++;
			
			if (index > tracks.length - 1) {
				index = 0;
				changeTrack(tracks[index].name, tracks[index].path);
			}
			else {
				changeTrack(tracks[index].name, tracks[index].path);
			}
		}
	}
}

function getTitle() {
	for (let value of title) {
		return value.getAttribute('title');
	}
}

function changeTrack(newTitle, path) {
	for (let value of title) {
		value.removeAttribute('title');
		value.setAttribute('title', newTitle);
	}
	audio.removeAttribute('src');
	audio.setAttribute('src', path);
	if (player.classList.contains('play')) {
		audio.play();
	}
}

function getAudio() {
	let getAudio = Array.from(document.getElementsByTagName('audio'));
	return getAudio[0];
}

function getPlayer() {
	let getPlayer = Array.from(document.getElementsByClassName('mediaplayer'));
	return getPlayer[0];
}

function getIndex() {
	let i;
	tracks.forEach(function(el) {
		if (el.name === getTitle()) {
			i =  tracks.indexOf(el);	
		}
	})
	return i;
}