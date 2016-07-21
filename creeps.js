var core = {};
core.spawns = require('spawns');

var creeps = {
  run: function () {

  },
  type: {
   harvester:  [MOVE, CARRY, WORK],
   healer: [HEAL, MOVE, CARRY]
 },
 counter: 0,
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
  return cost;
},

createCreep: function (type) {
  console.log('types', this.type[type]);
  console.log('creepCost', this.creepCost(this.type[type]));
  var spawn = core.spawns.getEnergyAbove(this.creepCost(this.type[type]))[0];
  if (spawn) {
    spawn.createCreep(this.type[type], type + '_' + this.counter, {role: type});
    this.counter ++;
  }
},
autoSpawn: function () {
  this.createCreep('harvester');
}
};
module.exports = creeps;
