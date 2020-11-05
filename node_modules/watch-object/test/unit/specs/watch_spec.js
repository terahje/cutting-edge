import { watch, unwatch } from 'watch-object'

describe('watch-object', function () {
  var spy, obj, list
  
  beforeEach(function () {
    spy = jasmine.createSpy('watcher')
    obj = {
      a: 'a',
      b: 'b',
      c: {
        c1: 1,
        c2: 2,
        c3: {
          c4: 1
        }
      },
      d: []
    }
    list = []
  })

  describe('callWatchers', function () {
    it('observes changes on all properties of an object', function () {
      watch(obj, spy)
      obj.a = 'b'
      expect(spy).toHaveBeenCalledWith('b', 'a', 'a', 'set')

      obj.c.c1 = 2
      expect(spy).toHaveBeenCalledWith(2, 1, 'c1', 'set')
    })

    it('observes changes on arrays', function () {
      watch(obj.d, spy)
      obj.d.push(1)
      expect(spy).toHaveBeenCalled()

      watch(list, spy)
      list.push(1)
      expect(spy.calls.count()).toBe(2)
    })

    it('observes changes on one object property', function () {
      watch(obj, 'a', spy)
      obj.a = 'b'
      expect(spy).toHaveBeenCalledWith('b', 'a', 'a', 'set')
    })

    it('observes changes on many object properties', function () {
      watch(obj, ['a', 'b'], spy)
      obj.a = 'b'
      expect(spy).toHaveBeenCalledWith('b', 'a', 'a', 'set')

      obj.b = 'a'
      expect(spy).toHaveBeenCalledWith('a', 'b', 'b', 'set')
    })

    it('observes changes on up to 1 level nested properties of an object', function () {
      watch(obj, spy, 1)
      obj.a = 'b'
      obj.c.c1 = 2
      obj.c.c3.c4 = 1
      expect(spy.calls.count()).toBe(2)
      expect(spy).toHaveBeenCalledWith('b', 'a', 'a', 'set')
      expect(spy).toHaveBeenCalledWith(2, 1, 'c1', 'set')
    })
  })

  describe('defineWatcher', function () {
    it('creates __watchers__', function () {
      watch(obj, function () {})
      expect(obj.hasOwnProperty('__watchers__')).toBe(true)
      expect(Object.keys(obj.__watchers__).length).toBe(4)
    })

    it('adds the watcher to __watchall__ when observing an array', function () {
      watch(obj, 'd', spy)
      expect(obj.d.__watchers__.__watchall__[0]).toBe(spy)
    })

    it('creates __proxy__', function () {
      watch(obj, function () {})
      expect(obj.hasOwnProperty('__proxy__')).toBe(true)
    })

    it('adds the watcher to __watchers__ for the property', function () {
      watch(obj, spy)
      expect(obj.__watchers__.a[0]).toBe(spy)
    })

    it('proxies original descriptors', function () {
      obj = {
        _a: 1
      }
      Object.defineProperty(obj, 'a', {
        get: function () {
          return this._a
        },
        set: function () {
          this._a = 2
        },
        enumerable: true,
        configurable: true
      })

      watch(obj.a, spy)
      expect(obj.a).toBe(1)

      obj.a = 'x'
      expect(obj.a).toBe(2)
    })
  })

  describe('watchFunctions', function () {
    it('ignores invalid arguments', function () {
      watch(obj, 'invalid', 'invalid')
      expect(obj.a.__watchers__).toBe(undefined)
    })
  })

  describe('defineArrayMethodWatcher', function () {
    it('observes array push changes', function () {
      watch(obj, 'd', spy)
      obj.d.push(1)
      expect(spy).toHaveBeenCalledWith([1], undefined, 0, 'push')

      watch(list, spy)
      list.push(1)
      expect(spy).toHaveBeenCalledWith([1], undefined, 0, 'push')
    })

    it('observes array shift changes', function () {
      watch(obj, 'd', spy)
      obj.d.push(1,2,3,4,5)
      obj.d.shift()
      expect(spy).toHaveBeenCalledWith(undefined, 1, 0, 'shift')

      watch(list, spy)
      list.push(1,2,3,4,5)
      list.shift()
      expect(spy).toHaveBeenCalledWith(undefined, 1, 0, 'shift')
    })

    it('observes array unshift changes', function () {
      watch(obj, 'd', spy)
      obj.d.unshift(1)

      expect(spy).toHaveBeenCalledWith([1], undefined, 0, 'unshift')
    })

    it('observes array pop changes', function () {
      watch(obj, 'd', spy)
      obj.d.push(1)
      obj.d.pop()
      
      expect(spy).toHaveBeenCalledWith(undefined, 1, 0, 'pop')
    })

    it('observes array splice changes (add)', function () {
      watch(obj, 'd', spy)
      obj.d.push(1,2,3,4,5)
      obj.d.splice(1,0,6,8,9)
      
      expect(spy).toHaveBeenCalledWith([6,8,9], [], 1, 'splice')
    })

    it('observes array splice changes (remove)', function () {
      watch(obj, 'd', spy)
      obj.d.push(1,2,3,4,5)
      obj.d.splice(1,2)
      
      expect(spy).toHaveBeenCalledWith([], [2,3], 1, 'splice')
    })

    it('observes array splice changes (add and remove)', function () {
      watch(obj, 'd', spy)
      obj.d.push(1,2,3,4,5)
      obj.d.splice(2,3,'a','b','c')
      
      expect(spy).toHaveBeenCalledWith(['a','b','c'], [3,4,5], 2, 'splice')
    })

    it('observes array reverse changes', function () {
      watch(obj, 'd', spy)
      obj.d.push(1,2,3,4,5)
      obj.d.reverse()
      
      expect(spy).toHaveBeenCalledWith([5,4,3,2,1], undefined, 0, 'reverse')
    })

    it('observes array sort changes', function () {
      watch(obj, 'd', spy)
      obj.d.push(5,4,3,2,1)
      obj.d.sort()
      
      expect(spy).toHaveBeenCalledWith([1,2,3,4,5], undefined, 0, 'sort')
    })
  })

  describe('unwatch', function () {
    it('removes a watcher for a property', function () {
      watch(obj, 'a', spy)
      unwatch(obj, 'a', spy)
      expect(obj.__watchers__.a.length).toBe(0)
    })

    it('removes a watcher for all properties', function () {
      watch(obj, spy)
      unwatch(obj, spy)
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          expect(obj.__watchers__[prop].length).toBe(0)
        }
      }
    })

    it('removes a watcher for many properties', function () {
      watch(obj, spy)
      unwatch(obj, ['a', 'b', 'c', 'd'], spy)
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          expect(obj.__watchers__[prop].length).toBe(0)
        }
      }
    })

    it('removes all watchers', function () {
      watch(obj, spy)
      unwatch(obj)
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          expect(Object.keys(obj.__watchers__).length).toBe(0)
        }
      }
    })

    it('does not fail when called on a plain object', function () {
      expect(function () { unwatch(obj, 'a', spy) }).not.toThrow()
    })
  })
})