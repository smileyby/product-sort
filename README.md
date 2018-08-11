商品排序案例分析
===============

1. 获取数据
2. 数据绑定

ES6中的模版字符串（原理：传统的字符串拼接）

```javascript
var listBox = document.getElementById('list');
var str = ``; //=> 这不是单引号，而是撇
for(var i = 0;i < result.length; i += 1){
	var item = result[i];
	str += `<li>
	    <a href="javascript:;">
	        <img src="${item.img}" alt="">
	        <p>${item.title}</p>
	        <span>￥${item.price}</span>
	    </a>
	</li>`;
}
```

## sort排序原理  

> 每一次拿出数组中的当前项和后一项，每一次这样的操作都会让传递的你明函数执行一次，不仅执行，而且还给匿名函数传递了两个实参：
> a=> 本次拿出的当前项
> b=> 本次拿出的后一项
> 
> 你明函数中，如果return的结果是一个>0的数，让a和b交换位置；返回<=0的值，a和b的位置不变

```javascript
ary.sort(function(a, b){
	return 1; => 相当于ary.reverse();
})
```

//=> 随机打乱数组

```javascript
art.sort(function(){
	return Math.round(Math.random() * 20 - 5);
});
```

//=> 实例

```javascript
var ary = [
	{
		name: 'a',
		age: '18'
	},
	{
		name: 'b',
		age: '12'
	},
	{
		name: 'c',
		age: '25'
	},
];

ary.sort(function(a,b){
	var curName= a.name,
		nextName = b.name;
	return curName.localComapre(nextName);
	//=> localCompare字符串的方法，可以用来比较两个字符串的大小
});
```

### DOM映射

> DOM映射机制：
> 
> 在JS中获取到的元素对象或者元素集合一般都和页面中的HTML结构存在映射关系（一个变两一个也会跟着变）

```javascript
var oBox = document.getElementById('box');
oBox.style.backgroundColor = 'red';
//=> 修改oBox中的style中的backgroundColor属性为red（把oBox堆内存中的某些东西改了）但是这样操作完成后，页面中的DIV背景颜色修改为红色
```

> 映射原理： 浏览器在渲染页面的时候，给每一个元素都设置了很多内置的属性（包含样式的），当我们在JS中把堆内存中的每一个内置属性修改了，大部分情况下，浏览器都会监听到你的修改，然后按照最新修改的值重新渲染页面中的元素
>
> 通过querySelectorAll 获取的元素集合（节点集合）不存在DOM映射机制，因为获取到的集合不是标准的NodeList，而是属于StaticNodeList（静态集合）
> 
> 操作真实DOM，在项目当中是比较消耗性能的（尽量减少）

### DOM的重绘和回流以及文档碎片

我们操作DOM或者修改DOM，基本上就是触发它的重绘和回流机制

重绘： 当一个元素的样式发生改变（特点：只有那些不修改元素位置的样式）发生改变的时候，浏览器会把当前元素重新渲染（DOM性能消耗低）

回流： 当一个元素的位置发生改变，浏览器会重新把整个页面的DOM结构进行计算，计算出所有元素的最新位置，然后再渲染（DOM性能消耗非常大）

1、 新增或者删除一些元素
2、 把现有元素的位置改变
...

