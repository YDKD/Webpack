# Webpack

# vue-cli源码执行流程
1、运行 npm run serve -> 会执行package.json中的 vue-cli-service
2、通过在node_modules/.bin中找到对应的服务
3、vue-cli-service 又会找到 @vue/cli-servive/vue-cli-service.js进行执行
4、进行一些版本比对之后， 引入了 Service类，在 new Service实例之后会执行类中的 constructor方法
5、实例的constructor主要是进入了 reslovePlugins方法，将builtInPlugins数组中发方法依次通过require进入，引入之后，引入主要是对系统的commands方法和webpack的一些配置方法进行加载。
6、然后在 vue-cli-service.js中执行 run 方法
7、run 方法在 lib/Service.js中 会根据 npm run 后面的参数进行传递，此处以serve进行举例，传入 run 方法之后 会进入到 init 函数
8、init方法主要有几个步骤，
    1）加载系统的变量设置，例如.env，然后就是加载用户的配置选项，调用了loaderUserOptions方法，此方法主要是对用户自己配置的webpack方法webpack.config.c?js配置项进行加载。此处主要是加载其中的一些配置项，但是很重要的是webpack.config.js中暴露的对象中有两个选项chainWebpack的链式调用和configuraWebpack两个选项，然后通过模块导入对其中的模块进行执行。
    2）就是通过在constructor中加载的plugins进行遍历，然后通过实例化PluginsApi对其进行调用执行。
9、之后的执行过程中，会调用api.registerCommand，也就是 PluginAPI.registerCommand方法，传递了的三个参数，name -> serve，第二个就是 serve.js中的options，然后第三个参数很关键，就是一个 fn 函数。同时执行了一行代码！！！
this.service.commands[name] = { fn, opts: opts || {}} <==> this.service.commands['serve'] = serve.js中的数据
因为传入了this的实例，所以对 Service.js中的 command进行了赋值。
10、所以说走到最后对 command中的 fn 进行解构执行，即对 command/serve.js中的第三个参数（函数）进行执行

总结：vue-cli-serve serve-> node_modules/cli-Service/Service.js中 run 方法，run -> 根据执行脚本的名称，例如serve，在commands文件夹中对每一项进行遍历，找到对应的 serve，通过api.registerCommand函数的第三个参数执行。第三个方法，其实就是通过 require引入webpack和webpack-dev-server，其实也是调用了这两个模块中的方法，进行执行。当然，这其中也涉及到了许多的配置项，采用的或运算， userOptions || projectOptions(这个项目的配置其实是通过了对用户配置进行了扩展运算符，是cli-serve/options.js)。然后通过对配置项经过 webpack方法进行compiler之后，放入实力化的WebpackServer中进行处理，最后返回的server进行 listen

补充：
1、chainwebpack 和 configureWebpack是否能够一起配置？
答：能。在源码中两个是不存在 else 关系

