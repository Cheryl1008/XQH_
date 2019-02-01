1.cnpm代理
  1.持久使用
    npm config set registry https://registry.npm.taobao.org
  2.检测是否安装
    npm config get registry
  3.更换回npm
    npm config set registry https://registry.npmjs.org

2.使用脚手架搭建React环境   react-cli
  npx create-react-app projectName


3.主要概念
  1.Render渲染
  2.JXS语法
  3.元素渲染
    react渲染速度非常快，虚拟DOM，虚拟DOM的算法。React 只会更新必要的部分
    React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分
  4.组件和Props
    Props的只读性
    使用PropTypes 进行类型检查
    添加默认值
  5.State和生命周期
    setState执行之后发生了什么？
      UI会重新渲染，因为setState会改变状态，状态一旦被修改则，UI就被重新渲染
    组件的独立性
  6.事件处理
    this问题
    传递参数
  7.条件渲染
    空的判断，数据加载等待
  8.列表渲染&key
    key
  9.表单
    受控组件
    Refs&DOM
    非受控组件
  10.状态提升
    数据传递
    父传子：props
    子传父：事件
  11.组合 vs 继承
    this.props.children
