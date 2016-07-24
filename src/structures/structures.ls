structures =
  getAll: (_filter) ->
    newFilter = [STRUCTURE_SPAWN]
    newFilter = _filter if _filter?
    structures = Game.structures
    structures = _.filter structures, (structure) ->
      nbValidFilter = 0
      _.forEach do
        newFilter
        (value, key) ->
          if structure.structureType == value
            ++nbValidFilter
      return nbValidFilter === newFilter.length
module.exports = structures
