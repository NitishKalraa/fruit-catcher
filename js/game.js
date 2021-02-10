class Game {
  constructor() { }
  
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", (data)=>{
      gameState = data.val(); 
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {

    if (gameState === 0) {
      player = new Player();

      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }

    player1 = createSprite(200, 500);
    player1.addImage("player1", player_img);
    player2 = createSprite(800, 500);
    player2.addImage("player2", player_img);
   
    players = [player1, player2];

  }

  play() {

    form.hide();

    Player.getPlayerInfo();

    
    image(back_img, 0, 0, innerWidth, innerHeight);
    
    var x;
    var y;
    var index = 0;
    
    drawSprites();
    for (var plr in allPlayers) {

      index = index + 1;
      x = 500 - allPlayers[plr].distance;
      y = height - 100;

      players[index - 1].x = x;
      players[index - 1].y = y;

      textSize(25);

      if (player.index == index) fill("red");

      text(allPlayers[plr].name, x - 25, y + 25);

      if (index == 1) text(`${allPlayers[plr].name} : ${allPlayers[plr].score}`, 100, 100);
      else text(`${allPlayers[plr].name} : ${allPlayers[plr].score}`, 100, 150);

      fill(0);
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distance -= 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (frameCount % 20 === 0) {

      fruits = createSprite(random(100, width), 0, 100, 100);
      fruits.velocityY = 6;
      var rand = Math.round(random(1, 5));

      switch (rand) {
        case 1:
          fruits.addImage(fruit1_img);
          break;
        case 2:
          fruits.addImage(fruit2_img);
          break;
        case 3:
          fruits.addImage(fruit3_img);
          break;
        case 4:
          fruits.addImage(fruit4_img);
          break;
        case 5:
          fruits.addImage(fruit5_img);
          break;
      }
      fruitGroup.add(fruits);
    }


    if (player.index !== null) {

      fruitGroup.forEach((fruit) => {
        if (fruit.isTouching(players)) {
          fruit.destroy();
          player.score = player.score + 1;
          player.update();
        }
      });
    }
    
    fruitGroup.forEach((fruit) => {
      if (fruit.y > innerHeight) fruit.destroy();
    });
  }
}