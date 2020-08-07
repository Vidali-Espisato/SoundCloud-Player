var UI = {};
var SoundCloudAPI = {};

var input = document.querySelector(".js-search");



UI.pressEnter = function(){
	input.addEventListener("keyup", function(e){
		if (e.which === 13){
	                SoundCloudAPI.getTracks(input.value);
	        };
	});
};
UI.clickSearch = function(){
	document.querySelector(".js-submit").addEventListener("click", function(){
		SoundCloudAPI.getTracks(input.value);
	});
};



SoundCloudAPI.init = function() {
	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
};
SoundCloudAPI.getTracks = function(inputValue) {
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  SoundCloudAPI.renderTracks(tracks);			
	});
};
SoundCloudAPI.renderTracks = function(tracks){
	tracks.forEach(function(track){
		var results = document.querySelector(".js-search-results");
		var card = document.createElement('div');
			card.classList.add("card");
		var image = document.createElement('div');
			image.classList.add("image");
		var imgTag = document.createElement('img');
			imgTag.classList.add("image_img");
			imgTag.src = track.artwork_url || "https://dyn.meanstackdeveloper.in/uploads/2018/11/404-error-message-server-not-found-100x100.png";
		var content = document.createElement('div');
			content.classList.add("content");
		var header = document.createElement('div');
			header.classList.add("header");
		var a = document.createElement('a');
			a.href = track.permalink_url;
			a.target = "_blank";
			a.innerText = track.title;
		var button = document.createElement('div');
			button.classList.add("ui", "bottom", "attached", "button", "js-button");
			button.addEventListener("click", function(){
				SoundCloudAPI.embedTrack(track.permalink_url);
			});
		var i = document.createElement('i');
			i.classList.add("add", "icon");
		var span = document.createElement('span');
			span.innerText = "Add to playlst";

		
		button.appendChild(i);
		button.appendChild(span);
		header.appendChild(a);
		content.appendChild(header);
		image.appendChild(imgTag);
		card.appendChild(image);
		card.appendChild(content);
		card.appendChild(button);
		results.appendChild(card);
	});
};
SoundCloudAPI.embedTrack = function(trackURL) {
	SC.oEmbed(trackURL, {
	  	auto_play: true
	}).then(function(embed){
		var playlist = document.querySelector('.js-playlist');
		
		var box = document.createElement('div');
		box.innerHTML = embed.html;

		var removeButton = document.createElement('div');
		removeButton.innerHTML = "<button style='color:red; margin-left:30%'>Remove</button>"
		removeButton.addEventListener("click", function(){
			box.innerHTML = "";
		});
		box.appendChild(removeButton);
		
		playlist.insertBefore(box, playlist.firstChild);
		localStorage.setItem("key", playlist.innerHTML);
	});
};



SoundCloudAPI.init();
UI.pressEnter();
UI.clickSearch();

var playlist = document.querySelector('.js-playlist');
playlist.innerHTML = localStorage.getItem("key");


if(playlist.firstChild) {
	var rightCol = document.querySelector('.main');
	var clearButton = document.createElement('div');
	clearButton.innerHTML = "<button style='color:red; margin-left:0px; margin-top:0px;'>Clear Playlist</button>"
	
	clearButton.addEventListener("click", function(){	
		while(playlist.firstChild){
			playlist.removeChild(playlist.firstChild);
		};
		localStorage.clear();
	});

	rightCol.appendChild(clearButton);
};


