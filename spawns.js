var core = [];
core.structures = require('structures');
var spawns = {
  getAll: function (_filter) {
    return core.structures.getAll([STRUCTURE_SPAWN]);
  },
  getEnergyless: function () {
    var spawns = this.getAll();
    var filteredSpawns = _.filter(spawns, function(spawn){
      return spawn.energy < spawn.energyCapacity;}
    );
    return (filteredSpawns);
  },
  getEnergyAbove: function (val) {
    var spawns = this.getAll();
    var filteredSpawns = _.filter(spawns, function(spawn){
      return spawn.energy > val;}
    );
    return filteredSpawns;
  },
  getEnergyBelow: function (val) {
    var spawns = this.getAll();
    var filteredSpawns = _.filter(spawns, function(spawn){
      return spawn.energy < val;}
    );
  }
};
module.exports = spawns;
