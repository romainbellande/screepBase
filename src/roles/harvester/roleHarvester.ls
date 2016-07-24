roleHarvester =
  run: (creep) ->
    if creep.carry.energy < creep.carryCapacity
      sources = creep.room.find FIND_SOURCES
      if (creep.harvest sources.0) == ERR_NOT_IN_RANGE
        creep.moveTo sources.0
    else
      targets = creep.room.find do
        FIND_STRUCTURES
        {
          filter: (structure) ->
            (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity

        }
      if targets.length > 0
        if (creep.transfer targets.0, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
          creep.moveTo targets.0
module.exports = roleHarvester
