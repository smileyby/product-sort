// 获取数据
var xhr = new XMLHttpRequest();
xhr.open('get', 'json/data.json', false);
xhr.onreadystatechange = function(){
	if(xhr.status === 200 && xhr.readyState === 4) {
        var result = xhr.responseText;
        window.result = utils.toJSON(result);
    }
};
xhr.send(null);

// 循环数据
var str = '',
	listBox = document.getElementById('listBox');
for (var i = 0; i < result.length; i += 1) {
	var item = result[i];

	// 使用ES6模版字符串拼接html代码
	str += `<li data-price="${item.price}" data-evaluateNum="${item.evaluateNum}" data-time="${item.time}">
		<a href="javascript:;">
			<img src="${item.img}" alt="">
			<p class="p-name">${item.title}</p>
			<p class="p-price">
				<b>￥${item.price}</b>
			</p>
			<div class="bottomButton">
				<div class="leftButton">参加抢购</div>
				<div class="evaluateNum">${item.evaluateNum}评价</div>
			</div>
		</a>
	</li>`;
}
listBox.innerHTML =  str;

// 点击排序修
~function(){
	var listBox = document.getElementById('listBox'),
		oList = listBox.getElementsByTagName('li');
	var headerBox = document.getElementById('header'),
		linkList = headerBox.getElementsByTagName('a');

    for (var i = 0; i < linkList.length; i += 1) {
        linkList[i].method = -1;
        linkList[i].myIndex = i;
        linkList[i].onclick = function(){
            //=> this：点击的这个A标签
            this.method *= -1; //=> 可以让每次点击的时候，让this.method的值在1~-1之间来回切换
            changePosition.call(this);
        }
    }

	function changePosition(){
		var _this = this;
		
		//=> 修改选中状态
        this.className = 'selected';
        this.className += this.method === -1? ' sort-desc' : ' sort-asc';

		//=> 点击当前A，我们需要把其他的A的myMethod回归初始值，这样保证下一次在点击其他A标签还是升序开始
        for (var k = 0; k < linkList.length; k += 1) {
            if (k !== this.myIndex){
            	//=> 不是当前点击的A
				linkList[k].method = -1;
				linkList[k].className = '';
			}
        }

        oList = utils.toArray(oList);
        oList.sort(function(a,b){
        	//=> 需要知道当前点击的是第几列
			var index = _this.myIndex,
				attr = '';
			switch (index) {
				case 0:
					attr = 'data-time';
					break;
				case 1:
					attr = 'data-price';
					break;
				case 2:
					attr = 'data-evaluateNum';
					break;
            }

            //=> 按照不同的排序方式获取对应的自定义属性值
            var cur = a.getAttribute(attr),
                next = b.getAttribute(attr);
			if (index === 0){
				//=> 获取的日期值需要特殊处理
				cur = cur.replace(/-/g, '');
				next = next.replace(/-/g, '');
			}
            return (cur - next) * _this.method;
        });

        var frg = document.createDocumentFragment(); //=> 创建一个文档碎片（文档碎片：一个临时存储DOM元素的容器）
        for (var i = 0; i < oList.length; i += 1) {
            // listBox.appendChild(oList[i]); //=> 由于DOM的映射机制，我们在JS中把某一个li元素对象增加到容器的末尾，而每一个li标签（和页面中的li一一对应）增加到容器的末尾，相当于把页面中的映射的标签挪到容器的末尾，所以不是新增而是位置改变
            frg.append(oList[i]); //=> 每次循环把每一个LI先追加到文档碎片中
        }
        listBox.appendChild(frg); //=> 循环完成后，把当前文档碎片中的内容统一一次性添加到页面中（指出发一次DOM回流）
        frg = null;
	}
}();