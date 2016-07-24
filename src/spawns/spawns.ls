core =
  structures: require \../structures/structures

spawns =
  getAll: (_filter) ->
    core.structures.getAll STRUCTURE_SPAWN
  getEnergyless: ->
    spawns = this.getAll!
    filteredSpawns = _.filter spawns, (spawn) ->
      spawn.energy < spawn.energyCapacity
  getEnergyAbove: (val) ->
    spawns = this.getAll!
    filteredSpawns = _.filter spawns, (spawn) ->
      spawn.energy > val
  getEnergyBelow: (val) ->
    spawns = this.getAll!
    filteredSpawns = _.filter spawns, (spawn) ->
      spawn.energy < val

module.exports = spawns
