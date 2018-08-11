var utils = (function(){
	function toJSON(ary){
		// 兼容IE浏览器中没有JSON方法
		return JSON in window? JSON.parse(ary) : eval('(' + ary + ')');
	}
	function toArray(classAry){
		var ary = [];
		try{
			ary = Array.prototype.slice.call(classAry);
		} catch(e) {
            for (var i = 0; i < classAry.length; i += 1) {
                 ary[ary.length] = classAry[i];
            }
		}
		return ary;
	}

	return {
        toJSON: toJSON,
        toArray: toArray
	}
})();