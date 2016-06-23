import page from 'page'

let install = function(Vue) {
  let {isObject, isArray} = Vue.util, Arr = Array.prototype

  function merge(dest, source) {
    for (let s in source) {
      if (isObject(source[s]) && isObject(dest[s])) {
	merge(dest[s], source[s])
      } else {
	dest[s] = source[s]
      }
    }
  }

  function stub(obj) {
    let s = {}
    for (let i in obj) {
      if (isObject(obj[i])) {
	s[i] = stub(obj[i])
      }
      else {
	s[i] = null
      }
    }
    return s;
  }

  Vue.prototype.$page = function() {
    let vm = this, args = arguments
    if (!isObject(args[0]) || isArray(args[0])) {
      args = Arr.map.call(args, function(arg) {
	return !isObject(arg) || isArray(arg) ? arg : function(ctx, next) {
	  merge(vm, arg)
	  next()
	}
      })
    }
    return page.apply(this, args)
  }
}

export default {install}
