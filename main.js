(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  var core;
  core = {
    structures: require('../structures/structures'),
    spawns: require('../spawns/spawns'),
    creeps: require('../creeps/creeps'),
    roles: require('../roles/roles')
  };
  module.exports = core;
}).call(this);

},{"../creeps/creeps":2,"../roles/roles":6,"../spawns/spawns":8,"../structures/structures":9}],2:[function(require,module,exports){
(function(){
  var core, creeps;
  core = {
    spawns: require('../spawns/spawns')
  };
  creeps = {
    run: function(){},
    type: {
      harvester: {
        counter: 0,
        level: [[MOVE, CARRY, WORK], [MOVE, MOVE, CARRY, WORK]]
      },
      upgrader: {
        counter: 0,
        level: [[MOVE, CARRY, WORK], [MOVE, MOVE, CARRY, WORK]]
      },
      healer: {
        counter: 0,
        level: [[HEAL, MOVE, CARRY]]
      }
    },
    cost: function(body){
      var bodyCost, _cost;
      bodyCost = ['move:', 50, 'carry:', 50, 'work:', 20, 'heal:', 200, 'tough:', 20, 'attack:', 80, 'ranged_attack:', 150];
      _cost = 0;
      _.forEach(body, function(part){
        return _cost += bodyCost[part];
      });
      return _cost;
    },
    create: function(type, level){
      var spawn;
      if (!level) {
        level = 0;
      }
      console.log('Attempt to create a ' + type(+' level ' + level + '. Body: ' + this.type[type].level[level] + '. Cost: ' + this.cost(this.type[type].level[level]) + '. Counter: ' + this.type[type].counter));
      spawn = core.spawns.getEnergyAbove(this.cost(this.type[type].level[level]))[0];
      if (spawn) {
        spawn.createCreep(this.type[type].level[level], type + '_' + this.type[type].counter, {
          role: type
        });
        return ++this.type[type].counter;
      }
    },
    autoSpawn: function(){
      return this.create('upgrader');
    }
  };
  module.exports = creeps;
}).call(this);

},{"../spawns/spawns":8}],3:[function(require,module,exports){
(function(){
  var core;
  core = require('./core/core');
  module.exports.loop = function(){
    var i$, ref$, len$, name, creep, results$ = [];
    console.log('test');
    core.creeps.autoSpawn();
    for (i$ = 0, len$ = (ref$ = Game.creeps).length; i$ < len$; ++i$) {
      name = ref$[i$];
      creep = Game.creeps[name];
      switch (creep.memory.role) {
      case 'harvester':
        results$.push(core.roles.harvester.run(creep));
        break;
      case 'upgrader':
        results$.push(core.roles.upgrader.run(creep));
        break;
      case 'builder':
        results$.push(core.roles.builder.run(creep));
      }
    }
    return results$;
  };
}).call(this);

},{"./core/core":1}],4:[function(require,module,exports){
(function(){
  var roleBuilder;
  roleBuilder = {
    run: function(creep){
      var targets, sources;
      if (creep.memory.building && creep.carry.energy === 0) {
        creep.memory = false;
      }
      if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
        creep.memory.building = true;
      }
      if (creep.memory.building) {
        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
          if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(targets[0]);
          }
        }
      } else {
        sources = creeps.rooms.find(FIND_SOURCES);
        if (creep.harvest(sources[0] === ERR_NOT_IN_RANGE)) {
          return creep.moveTo(sources[0]);
        }
      }
    }
  };
  module.exports = roleBuilder;
}).call(this);

},{}],5:[function(require,module,exports){
(function(){
  var roleHarvester;
  roleHarvester = {
    run: function(creep){
      var sources, targets;
      if (creep.carry.energy < creep.carryCapacity) {
        sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          return creep.moveTo(sources[0]);
        }
      } else {
        targets = creep.room.find(FIND_STRUCTURES, {
          filter: function(structure){
            return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
          }
        });
        if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(targets[0]);
          }
        }
      }
    }
  };
  module.exports = roleHarvester;
}).call(this);

},{}],6:[function(require,module,exports){
(function(){
  var roles;
  roles = {
    builder: require('./builder/roleBuilder'),
    harvester: require('./harvester/roleHarvester'),
    upgrader: require('./upgrader/roleUpgrader')
  };
  module.exports = roles;
}).call(this);

},{"./builder/roleBuilder":4,"./harvester/roleHarvester":5,"./upgrader/roleUpgrader":7}],7:[function(require,module,exports){
(function(){
  var roleUpgrader;
  roleUpgrader = {
    run: function(creep){
      var sources;
      if (creep.memory.upgrading && creep.carry.energy === 0) {
        creep.memory.upgrading = false;
      }
      if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
        creep.memory.upgrading = true;
      }
      if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          return creep.moveTo(creep.room.controller);
        }
      } else {
        sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          return creep.moveTo(sources[0]);
        }
      }
    }
  };
  module.exports = roleUpgrader;
}).call(this);

},{}],8:[function(require,module,exports){
(function(){
  var core, spawns;
  core = {
    structures: require('../structures/structures')
  };
  spawns = {
    getAll: function(_filter){
      return core.structures.getAll(STRUCTURE_SPAWN);
    },
    getEnergyless: function(){
      var spawns, filteredSpawns;
      spawns = this.getAll();
      return filteredSpawns = _.filter(spawns, function(spawn){
        return spawn.energy < spawn.energyCapacity;
      });
    },
    getEnergyAbove: function(val){
      var spawns, filteredSpawns;
      spawns = this.getAll();
      return filteredSpawns = _.filter(spawns, function(spawn){
        return spawn.energy > val;
      });
    },
    getEnergyBelow: function(val){
      var spawns, filteredSpawns;
      spawns = this.getAll();
      return filteredSpawns = _.filter(spawns, function(spawn){
        return spawn.energy < val;
      });
    }
  };
  module.exports = spawns;
}).call(this);

},{"../structures/structures":9}],9:[function(require,module,exports){
(function(){
  var structures;
  structures = {
    getAll: function(_filter){
      var newFilter, structures;
      newFilter = [STRUCTURE_SPAWN];
      if (_filter != null) {
        newFilter = _filter;
      }
      structures = Game.structures;
      return structures = _.filter(structures, function(structure){
        var nbValidFilter;
        nbValidFilter = 0;
        _.forEach(newFilter, function(value, key){
          if (structure.structureType === value) {
            return ++nbValidFilter;
          }
        });
        return deepEq$(nbValidFilter, newFilter.length, '===');
      });
    }
  };
  module.exports = structures;
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);

},{}]},{},[3]);
