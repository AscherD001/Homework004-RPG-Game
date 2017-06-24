// Variables
var playerSelected = false;
var enemySelected = false;
var playList = ['<div id="laharlPlayer" class="character" value="0"></div>', '<div id="etnaPlayer" class="character" value="1"></div>', '<div id="flonnePlayer" class="character" value="2"></div>', '<div id="vyersPlayer" class="character" value="3"></div>', '<div id="ninjaPlayer" class="character" value="4"></div>'];
var enemList = ['<div id="laharlEnemy" class="character" value="0"></div>', '<div id="etnaEnemy" class="character" value="1"></div>', '<div id="flonneEnemy" class="character" value="2"></div>', '<div id="vyersEnemy" class="character" value="3"></div>', '<div id="ninjaEnemy" class="character" value="4"></div>'];
var laharlValues = [100, 10, 20];
var etnaValues = [250, 12, 15];
var flonneValues = [75, 17, 30];
var vyersValues = [75, 17, 20];
var ninjaValues = [100, 12, 5000];
var playerValues = [];
var enemyValues = [];
var playerAtk = 0;
var attacking = false;
var wins = 0;
var background = ["assets/images/laharlBkg.jpg", "assets/images/etnaBkg.jpg", "assets/images/flonneBkg.jpg", "assets/images/trioBkg.jpg", "assets/images/famBkg.jpg", "assets/images/plenairBkg.jpg"];
var random = Math.floor(Math.random()*6);
var playPause = true;

// Functions
var reset = function() {
	playerSelected = false;
	enemySelected = false;
	laharlValues = [100, 10, 20];
	etnaValues = [250, 12, 15];
	flonneValues = [75, 17, 30];
	vyersValues = [75, 17, 20];
	ninjaValues = [100, 12, 5000];
	playerValues = [];
	enemyValues = [];
	playerAtk = 0;
	attacking = false;
	wins = 0;
	random = Math.floor(Math.random()*6);
	$(".announce").html("Select a Character!");
	$(".laharl").attr("id", "laharl");
	$(".etna").attr("id", "etna");
	$(".flonne").attr("id", "flonne");
	$(".vyers").attr("id", "vyers");
	$(".ninja").attr("id", "ninja");
	$(".player").html("");
	$(".enemy").html("");
	$(".playerHP")
	$(".background").attr("src", "");
}
$(document).ready(function() {
	$(".character").on("click", function() {
		if(!playerSelected) {
			if($(this).attr("id") === "laharl") {
				$(".player").html(playList[0]);
				playerValues = laharlValues;
				$(".player").attr("style", "animation: laharlIdle 1s steps(5) infinite");
			}
			if($(this).attr("id") === "etna") {
				$(".player").html(playList[1]);
				playerValues = etnaValues;
				$(".player").attr("style", "animation: etnaIdle 1s steps(5) infinite");
			}
			if($(this).attr("id") === "flonne") {
				$(".player").html(playList[2]);
					playerValues = flonneValues;
				$(".player").attr("style", "animation: flonneIdle 1s steps(5) infinite");
			}
			if($(this).attr("id") === "vyers") {
				$(".player").html(playList[3]);
					playerValues = vyersValues;
				$(".player").attr("style", "animation: vyersIdle 1s steps(5) infinite");
			}
			if($(this).attr("id") === "ninja") {
				$(".player").html(playList[4]);
					playerValues = ninjaValues;
				$(".player").attr("style", "animation: ninjaIdle 1s steps(5) infinite");
			}
			$(".announce").html("Select an Opponent!");
			$(this).attr("id", "player");
			$(".playerHP").html(playerValues[0]);
			$(".playerHP").attr("class", "playerHP");
			playerSelected = true;
		} else {
			if(!enemySelected) {
				if($(this).attr("id") === "laharl") {
				$(".enemy").html(enemList[0]);
				enemyValues = laharlValues;
				$(".enemy").attr("style", "animation: laharlIdle 1s steps(5) infinite");
				}
				if($(this).attr("id") === "etna") {
					$(".enemy").html(enemList[1]);
				enemyValues = etnaValues;
				$(".enemy").attr("style", "animation: etnaIdle 1s steps(5) infinite");
				}
				if($(this).attr("id") === "flonne") {
					$(".enemy").html(enemList[2]);
				enemyValues = flonneValues;
				$(".enemy").attr("style", "animation: flonneIdle 1s steps(5) infinite");
				}
				if($(this).attr("id") === "vyers") {
					$(".enemy").html(enemList[3]);
				enemyValues = vyersValues;
				$(".enemy").attr("style", "animation: vyersIdle 1s steps(5) infinite");
				}
				if($(this).attr("id") === "ninja") {
					$(".enemy").html(enemList[4]);
				enemyValues = ninjaValues;
				$(".enemy").attr("style", "animation: ninjaIdle 1s steps(5) infinite");
				}
				$(".announce").html("Click to Attack!");
				$(this).attr("id", "enemy");
				$(".button").attr("class", "wrapper atkButton")
				$(".enemyHP").html(enemyValues[0]);
				$(".enemyHP").attr("class", "enemyHP");
				enemySelected = true;
			} else {
				if($(this).attr("id") === "attack" && !attacking) {
					attacking = true;
					playerAtk += playerValues[1];
					enemyValues[0] -= playerAtk;
					$(".enemyDamage").html(playerAtk);
					$(".enemyDamage").attr("class", "enemyDamage eDamage");
					if(enemyValues[0] <= 0) {
						$(".enemy").css("animation", "dead 1.1s");
						enemyValues[0] = 0;
					}
					setTimeout(function() {
						$(".enemyDamage").attr("class", "enemyDamage");
						if(enemyValues[0] === 0) {
							$(".enemy").html("");
							$(".enemyHP").attr("class", "enemyHP hidden");
							$(".atkButton").attr("class", "wrapper button character")
							$(".announce").html("Select an Opponent!");
							enemySelected = false;
							wins ++;
							if(wins === 4) {
								$(".announce").html("");
								$(".playerHP").attr("class", "playerHP hidden");
								$(".player").css("top", "300px");
								$(".background").attr("src", background[random]);									
								setTimeout(reset, 5000);
							}
						} else {
							$(".announce").html("Click to Attack!");
						}
						attacking = false;
					}, 1000);
					$(".enemyHP").html(enemyValues[0]);
					$(".announce").html("Attack Landed!");
					setTimeout(function() {
						if(enemyValues[0] != 0) {
							playerValues[0] -= enemyValues[2];
							if(playerValues[0] <= 0) {
								$(".player").css("animation", "dead 1.1s");
								playerValues[0] = 0;
							}
							$(".playerDamage").html(enemyValues[2]);
							$(".playerDamage").attr("class", "playerDamage pDamage");
							$(".playerHP").html(playerValues[0]);
							setTimeout(function() {
								$(".playerDamage").attr("class", "playerDamage");
								if(playerValues[0] === 0) {
									$(".player").html("");
									$(".playerHP").attr("class", "playerHP hidden");
									$(".enemyHP").attr("class", "enemyHP hidden");
									$(".atkButton").attr("class", "wrapper button character");									
									setTimeout(reset, 1000);
								}
							}, 1000);
						}
					}, 500);
					$(".playerHP").html(playerValues[0]);
				}
			}
		}
	});
	$("#playPause").on("click", function() {
		if(playPause) {
			$("#playPause").html('<img id="play" src="assets/images/PlayButton001.png">');
			document.getElementById("musicBkg").pause();
			playPause = false;
		} else {
			$("#playPause").html('<img id="play" src="assets/images/PlayButton002.png">');
			document.getElementById("musicBkg").play();
			playPause = true;
		}
	});
});
document.getElementById("musicBkg").play();
document.getElementById("musicBkg").volume = 0.01;