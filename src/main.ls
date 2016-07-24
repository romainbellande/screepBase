core = require \./core/core
main = ->
  core.creeps.autoSpawn!
  counter = 0
  for name of Game.creeps
    creep = Game.creeps[name]
    switch creep.memory.role
      case \harvester then core.roles.harvester.run creep
      case \upgrader then core.roles.upgrader.run creep
      case \builder then core.roles.builder.run creep

main!
