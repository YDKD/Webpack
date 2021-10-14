# Webpack

# vue-cli源码执行流程
1、运行 npm run serve -> 会执行package.json中的 vue-cli-service
2、通过在node_modules/.bin中找到对应的服务
3、vue-cli-service 又会找到 @vue/cli-servive/vue-cli-service.js进行执行
4、进行一些版本比对之后， 引入了 Service类，在 new Service实例之后会执行类中的 constructor方法
5、实例的constructor主要是进入了 reslovePlugins方法，将builtInPlugins数组中发方法依次通过require进入，引入之后，会将对应的结果进行 return 
6、然后在 vue-cli-service.js中执行 run 方法
7、run 方法在 lib/Service.js中 会根据 npm run 后面的参数进行传递，此处以serve进行举例，传入 run 方法之后 会进入到 init 函数
8、init函数中最重要的是对 plugins中进行遍历，解构了其中的 apply ，然后调用这个方法，传入 new Plugins这实例对象，其实也就是 commands/serve.js中导出的对象。
9、之后的执行过程中，会调用api.registerCommand，也就是 PluginAPI.registerCommand方法，传递了的三个参数，name -> serve，第二个就是 serve.js中的options，然后第三个参数很关键，就是一个 fn 函数。同时执行了一行代码！！！
this.service.commands[name] = { fn, opts: opts || {}} <==> this.service.commands['serve'] = serve.js中的数据
因为传入了this的实例，所以对 Service.js中的 command进行了赋值。
10、所以说走到最后对 command中的 fn 进行解构执行，即对 command/serve.js中的第三个参数（函数）进行执行
