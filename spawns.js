var core = [];
core.structures = require('structures');
var spawns = {
  getAll: function (_filter) {
    return core.structures.getAll([STRUCTURE_SPAWN]);
  },
  getUnfilled: function () {
    var spawns = this.getAll();
    var unfilledSpawns = _.filter(spawns, function(spawn){
      return spawn.energy < spawn.energyCapacity;}
    );
    return (unfilledSpawns);
  }
};
module.exports = spawns;
