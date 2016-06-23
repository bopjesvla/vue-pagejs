# vue-pagejs

A [page.js](https://github.com/visionmedia/page.js) wrapper for Vue.

An example:

*Entry*

```js
import vuePage from 'vue-pagejs'
Vue.use(vuePage)

let vm = new Vue({
	components: {App},
})

// may redirect
let authRedirect = ctx => ...

vm.$page('/home', {main: 'home'})
vm.$page(['/', '/sign-in', '/forgot-password'], authRedirect, {main: "auth"})
vm.$page('/', {name: "signup", action: "Sign up"})
vm.$page('/sign-in', {name: "signin", action: "Sign in"})
vm.$page('/forgot-password', {name: "forgotpw", action: "Recover password"})
vm.$page()

vm.$mount("body")
```

*App.vue*

```html
<template>
	<component :is="$root.main">
</template>
<script>
	import {Auth, Home} from 'somewhere'
</script>
```

Plain objects are automatically merged with the data object of the Vue instance when the route is visited.
