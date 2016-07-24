roleBuilder =
  run: (creep) ->
    if creep.memory.building && creep.carry.energy == 0
      creep.memory = false
    if !creep.memory.building && creep.carry.energy == creep.carryCapacity
      creep.memory.building = true
    if creep.memory.building
      targets = creep.room.find FIND_CONSTRUCTION_SITES
      if targets.length
        if creep.build(targets.0) == ERR_NOT_IN_RANGE
          creep.moveTo targets.0
    else
      sources = creeps.rooms.find FIND_SOURCES
      if creep.harvest sources.0 == ERR_NOT_IN_RANGE
        creep.moveTo sources.0

module.exports = roleBuilder