/**
 * Create watcher for one or more properties of an object
 * 
 * watch(obj, callback)
 * watch(obj, 'prop', callback)
 * watch(obj, ['prop', 'another'], callback)
 */
export const watch = (...args) => {
  const prop = args[1]

  if (isFunction(prop)) {
    watchAll.apply(this, args)
  }
  else if (isArray(prop)) {
    watchMany.apply(this, args)
  }
  else {
    watchOne.apply(this, args)
  }
}

/**
 * Remove watcher for one or more properties of an object
 * 
 * unwatch(obj)
 * unwatch(obj, callback)
 * unwatch(obj, 'prop', callback)
 * unwatch(obj, ['prop', 'another'], callback)
 */
export const unwatch = (...args) => {
  const prop = args[1]

  if (isFunction(prop) || prop === undefined) {
    unwatchAll.apply(this, args)
  }
  else if (isArray(prop)) {
    unwatchMany.apply(this, args)
  }
  else {
    unwatchOne.apply(this, args)
  }
}

const isArray = (obj) => {
  return {}.toString.call(obj) === '[object Array]'
}

const isObject = (obj) => {
  return {}.toString.call(obj) === '[object Object]'
}

const isFunction = (fn) => {
  return {}.toString.call(fn) === '[object Function]'
}

const defineProp = (obj, propName, value) => {
  Object.defineProperty(obj, propName, {
    enumerable: false,
    configurable: true,
    writable: false,
    value
  })
}

const defineGetAndSet = (obj, propName, getter, setter) => {
  Object.defineProperty(obj, propName, {
    get: getter,
    set: function (value) {
      setter.call(this, value)
    },
    enumerable: true,
    configurable: true
  })
}

const callWatchers = (obj, prop, newVal, oldVal, action) => {
  let wl
  let watchList = obj['__watchers__'][prop]
  if ((wl = obj['__watchers__']['__watchall__'])) {
    watchList = watchList ? watchList.concat(wl) : wl
  }
  let length = watchList ? watchList.length : 0
  for (let wr = 0; wr < length; wr++) {
    watchList[wr].call(obj, newVal, oldVal, prop, action)
  }
}

const methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'unshift', 'splice']

const defineArrayMethodWatcher = (obj, original, methodName, callback) => {
  defineProp(obj, methodName, function (...args) {
    let index = 0
    let oldVal
    let newVal
    
    if (methodName === 'splice') {
      const start = args[0]
      const end = start + args[1]
      oldVal = obj.slice(start, end)
      newVal = []
      for (let i = 2; i < args.length; i++) {
        newVal[i - 2] = args[i]
      }
      index = start
    }
    else if (methodName === 'push' || methodName === 'unshift') {
      newVal = args.length > 0 ? args : undefined
    }
    else {
      newVal = args.length > 0 ? args[0] : undefined
    }

    const response = original.apply(obj, args)
    if (methodName === 'pop') {
      oldVal = response
      index = obj.length
    }
    else if (methodName === 'push') {
      index = obj.length - 1
    }
    else if (methodName === 'shift') {
      oldVal = response
    }
    else if (methodName !== 'unshift' && newVal === undefined) {
      newVal = response
    }
    callback.call(obj, index, methodName, newVal, oldVal)

    return response
  })
}

const watchFunctions = (obj, callback) => {
  if (!isFunction(callback) || !obj || (obj instanceof String) || !isArray(obj)) {
    return
  }

  for (let i = methodNames.length; i > 0; i--) {
    let methodName = methodNames[i - 1]
    defineArrayMethodWatcher(obj, obj[methodName], methodName, callback)
  }
}

const defineWatcher = (obj, prop, watcher, level) => {
  let newWatcher = false
  let isArr = isArray(obj)

  if (obj['__watchers__'] === undefined) {
    defineProp(obj, '__watchers__', {})
    if (isArr) {
      watchFunctions(obj, (index, action, newVal, oldVal) => {
        callWatchers(obj, index, newVal, oldVal, action)
        if (level !== 0 && newVal && (isObject(newVal) || isArray(newVal))) {
          let wl
          let watchList = obj['__watchers__'][prop]
          if ((wl = obj['__watchers__']['__watchall__'])) {
            watchList = watchList ? watchList.concat(wl) : wl
          }
          let length = watchList ? watchList.length : 0
          for (let i = 0; i < length; i++) {
            if (action !== 'splice') {
              watchAll(newVal, watchList[i], (level === undefined ? level : level - 1))
            }
            else {
              for (let n = 0; n < newVal.length; n++) {
                watchAll(newVal[n], watchList[i], (level === undefined ? level : level - 1))
              }
            }
          }
        }
      })
    }
  }

  if (obj['__proxy__'] === undefined) {
    defineProp(obj, '__proxy__', {})
  }

  if (obj['__watchers__'][prop] === undefined) {
    obj['__watchers__'][prop] = []
    if (!isArr) {
      newWatcher = true
    }
  }

  for (let i = 0; i < obj['__watchers__'][prop].length; i++) {
    if (obj['__watchers__'][prop][i] === watcher) {
      return
    }
  }

  obj['__watchers__'][prop].push(watcher)

  if (newWatcher) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, prop)
    if (descriptor !== undefined) {
      let nd = {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable
      }
      let accessors = ['get', 'set']
      accessors.forEach(accessor => {
        if (descriptor[accessor] !== undefined) {
          nd[accessor] = function (...args) {
            return descriptor[accessor].apply(obj, args)
          }
        }
      })
      let data = ['writable', 'value']
      data.forEach(d => {
        if (descriptor[d] !== undefined) {
          nd[d] = descriptor[d]
        }
      })
      Object.defineProperty(obj['__proxy__'], prop, nd)
    }
    else {
      obj['__proxy__'][prop] = obj[prop]
    }
    
    const getter = function () {
      return obj['__proxy__'][prop]
    }

    const setter = function (newVal) {
      const oldVal = obj['__proxy__'][prop]

      if (level !== 0 && 
        obj[prop] && (isObject(obj[prop]) || isArray(obj[prop])) &&
        !obj[prop]['__watchers__']
        ) {
        for (let i = 0; i < obj['__watchers__'][prop].length; i++) {
          watchAll(obj[prop], obj['__watchers__'][prop][i], (level === undefined ? level : level - 1))
        }
      }

      if (oldVal !== newVal) {
        obj['__proxy__'][prop] = newVal
        callWatchers(obj, prop, newVal, oldVal, 'set')
      }
    }

    defineGetAndSet(obj, prop, getter, setter)
  }
}

const watchAll = (obj, watcher, level) => {
  if (typeof obj === 'string' || (!(obj instanceof Object) && !isArray(obj))) {
    return
  }

  if (isArray(obj)) {
    defineWatcher(obj, '__watchall__', watcher, level)
    if (level === undefined || level > 0) {
      for (let prop = 0; prop < obj.length; prop++) {
        watchAll(obj[prop], watcher, level)
      }
    }
  }
  else {
    let props = []
    for (let prop in obj) {
      if ({}.hasOwnProperty.call(obj, prop)) {
        props.push(prop)
      }
    }
    watchMany(obj, props, watcher, level)
  }
}

const watchOne = (obj, prop, watcher, level) => {
  if (typeof obj === 'string' || (!(obj instanceof Object) && !isArray(obj))) {
    return
  }
  if (isFunction(obj[prop])) {
    return
  }

  if (obj[prop] !== null && (level === undefined || level > 0)) {
    watchAll(obj[prop], watcher, level !== undefined ? level - 1 : level)
  }
  defineWatcher(obj, prop, watcher, level)
}

const watchMany = (obj, props, watcher, level) => {
  if (typeof obj === 'string' || (!(obj instanceof Object) && !isArray(obj))) {
    return
  }

  for (let i = 0; i < props.length; i++) {
    let prop = props[i]
    watchOne(obj, prop, watcher, level)
  }
}

const unwatchOne = (obj, prop, watcher) => {
  if (obj['__watchers__'] !== undefined && obj['__watchers__'][prop] !== undefined) {
    if (watcher === undefined) {
      delete obj.__watchers__[prop]
    }
    else {
      for (let i = 0; i < obj.__watchers__[prop].length; i++) {
        if (obj.__watchers__[prop][i] === watcher) {
          obj.__watchers__[prop].splice(i, 1)
        }
      }
    }
  }
}

const unwatchMany = (obj, props, watcher) => {
  for (let prop in props) {
    if (props.hasOwnProperty(prop)) {
      unwatchOne(obj, props[prop], watcher)
    }
  }
}

const unwatchPropsInObject = (obj, watcher) => {
  const props = []
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] instanceof Object) {
        unwatchPropsInObject(obj[prop], watcher)
      }
      props.push(prop)
    }
  }
  unwatchMany(obj, props, watcher)
}

const unwatchAll = (obj, watcher) => {
  if (obj instanceof String || (!obj instanceof Object) && !isArray(obj)) {
    return
  }
  if (isArray(obj)) {
    const props = ['__watchall__']
    for (let prop = 0; prop < obj.length; prop++) {
      props.push(prop)
    }
    unwatchMany(obj, props, watcher)
  }
  else {
    unwatchPropsInObject(obj, watcher)
  }
}