# 元素内部滚动插件

这是一个可以让元素随鼠标滚轮滚动的jQuery插件
这个插件的使用依赖另一个插件[jquery.mousewhell.js](https://github.com/jquery/jquery-mousewheel)

例:

```javascript
$(".wrap").scrollable({
			startTop:0,
			minTop: -148,
			maxTop: 0,
			step: 4,
			threshold: 5
		});
```

参数的含义如下

* startTop 元素相对于原来位置的垂直位移量
* minTop 元素的垂直最小位移
* maxTop 元素的垂直最大位移量
* step 每步滚动的步长
* threshold 每步滚动的粒度

[演示](http://xiajiecheng.com/assets/demo/jquery.scrollable/demo/demo.html)