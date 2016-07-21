var core = {};
core.spawns = require('spawns');

var creeps = {
  run: function () {

  },
  type: {
    harvester: {
      counter: 0,
      level: [
        [MOVE, CARRY, WORK],
        [MOVE, MOVE, CARRY, WORK],
      ],
    },
    upgrader: {
      counter: 0,
      level: [
        [MOVE, CARRY, WORK],
        [MOVE, MOVE, CARRY, WORK],
      ],
    },
    healer: [[HEAL, MOVE, CARRY]]
  },
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

  createCreep: function (type, level) {
    if (!level) level = 0;
    console.log('Attempt to create a ' + type  +' level ' + level +
      '. Body: ' + this.type[type].level[level] +
      '. Cost: ' +  this.creepCost(this.type[type].level[level]) +
      '. Counter: ' + this.type[type].counter);
    var spawn = core.spawns.getEnergyAbove(this.creepCost(this.type[type].level[level]))[0];
    if (spawn) {
      spawn.createCreep(this.type[type].level[level], type + '_' + this.type[type].counter, {role: type});
      this.type[type].counter += 1 ;
    }
  },
  autoSpawn: function () {
    this.createCreep('upgrader');
  }
};
module.exports = creeps;
