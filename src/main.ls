core = require \./core/core
module.exports.loop = ->
  console.log \test
  core.creeps.autoSpawn!
  for name in Game.creeps
    creep = Game.creeps[name]
    switch creep.memory.role
      case \harvester then core.roles.harvester.run creep
      case \upgrader then core.roles.upgrader.run creep
      case \builder then core.roles.builder.run creep
