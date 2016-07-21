var creepHandler = {
  run: function () {

  },
   // body = [Game.WORK, Game.CARRY, Game.MOVE, Game.TOUGH];
  creepCost: function (body) {
    var bodyCost = {
      "move": 50,
      "carry": 50,
      "work": 20,
      "heal": 200,
      "tough": 20,
      "attack": 80,
      "ranged_attack": 150
    };
    var cost = 0;
    _.forEach(body, function(part) { cost += bodyCost[part]; });
    console.log("Cost of construction: " + cost);
  }
};
