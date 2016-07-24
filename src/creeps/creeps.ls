core =
  spawns: require \../spawns/spawns
creeps =
  run: ->
  type:
    harvester:
      counter: 0
      level: [
        [MOVE, CARRY, WORK],
        [MOVE, MOVE, CARRY, WORK],
      ]
    upgrader:
      counter: 0
      level: [
        [MOVE, CARRY, WORK],
        [MOVE, MOVE, CARRY, WORK],
      ]
    healer:
      counter: 0
      level: [
        [HEAL, MOVE, CARRY]
      ]
  cost: (body) ->
    bodyCost =
      \move : 50
      \carry : 50
      \work : 20
      \heal : 200
      \tough : 20
      \attack : 80
      \ranged_attack : 150
    _cost = 0
    _.forEach body, (part) ->
      _cost += bodyCost[part]
    return _cost
  create: (type, level) ->
    level = 0 if !level
    console.log('Attempt to create a ' + type  + ' level ' + level +
      '. Body: ' + this.type[type].level[level] +
      '. Cost: ' +  this.cost(this.type[type].level[level]) +
      '. Counter: ' + this.type[type].counter)
    spawn = core.spawns.getEnergyAbove(this.cost(this.type[type].level[level]))[0];
    if spawn
      spawn.createCreep this.type[type].level[level], type + \_ + this.type[type].counter, {role: type}
      this.type[type].counter += 1
  autoSpawn: ->
    this.create \upgrader

module.exports = creeps
