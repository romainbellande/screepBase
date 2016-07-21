var structures = {
  getAll: function (_filter) {
    var newFilter = [STRUCTURE_SPAWN];
    if (_filter) {
      newFilter = _filter;
    }
    var structures = Game.structures;
    structures = _.filter(structures, function (structure) {
      {
        var nbValidFilter = 0;

        _.forEach(newFilter, function (value, key) {
          if (structure.structureType == value) nbValidFilter ++;
        });
        return (nbValidFilter === newFilter.length);
      }
    });
    return structures;
  }
};
module.exports = structures;
