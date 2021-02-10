class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.greeting = createElement("h2");
    this.title = createElement("h1");
    this.reset = createButton("Reset");
  }
  hide() {
    this.greeting.hide();
  }
  display() {
    this.input.position(width / 2 - 70, height / 2.5);
    this.input.style("border-radius", "20px");
    this.input.style("border-color", "crimson");
    this.input.style("border-width", "5px");
    this.input.style("width", "200px");
    this.input.style("height", "30px");

    this.button.position(width / 2 - 20, height / 2);
    this.button.style(
      "background-image",
      "linear-gradient( #EDE574 0%, #E1F5C4  51%, #EDE574  100%)"
    );
    this.button.style("width", "100px");
    this.button.style("height", "30px");
    this.button.style("border-radius", "4px");
    this.button.style("cursor", "pointer");

    this.reset.position(width / 2 - 10, height - 50);
    this.reset.style(
      "background-image",
      "linear-gradient(#EDE574 0%, #E1F5C4  51%, #EDE574  100%)"
    );
    this.reset.style("width", "100px");
    this.reset.style("height", "30px");
    this.reset.style("border-radius", "4px");

    this.title.html("FRUIT CATCHER");
    this.title.position(width / 2.5, height / 8);
    this.title.style("font-size", "60px");
    this.title.style("color", "whitesmoke");
    this.title.style("border-style", "dashed");

    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      this.title.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.position(width / 2.5, height / 8);
      this.greeting.style("color", "white");
      this.greeting.style("font-size", "100px");
    });

    this.reset.mousePressed(() => {
      player.updateCount(0);
      game.update(0);
      location.reload();
    });
  }
}
