// composables文件夹下的会自动导入
export default () => {
  return {
    //默认过渡动画
    //transition 属性是CSS3中的一个属性，用于设置元素从一种样式逐渐转变为另一种样式的效果。在这个例子中，它用于设置元素的过渡效果。
    //ease-in-out 是CSS中的一个过渡函数，它使过渡效果在开始和结束时缓慢，而在中间时加速。这个过渡函数可以让元素的过渡看起来更自然。
    //duration-350 设置了过渡的持续时间为800毫秒。这个值可以根据需要进行调整，以控制过渡的速度。这里的值是指过渡效果从开始到结束的总时间。
    defaultTransition: 'transition ease-in-out duration-900',
    twitterBorderColor: 'border-white/20 dark:border-white/60'
  }
}
