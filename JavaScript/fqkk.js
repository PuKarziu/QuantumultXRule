//作者小赤佬83802712  
//活动地址:http://m.cwggkj.cn/r?upuid=4090370
//微信打开访问，抓包ck，放入PHPSESSID=xxxx; udtauth=xxxxx 这样的形式
//示例:
// var cookies = [
// 	'PHPSESSID=xxxx; udtauth=xxxxx'
// ];
var request = require('request');
//自行删减
var cookies = [
	'ck1',
	'ck2'
];

exports.main_handler = (event, context) => {
	for (var i = 0; i < cookies.length; i++) {
		var utils = new FQKK();
		utils.cookie = cookies[i];
		utils.main();
	}
};

function FQKK(exportCk) {
	this.isLogDetail = false;
	this.curPageObj = null;
	this.log = function(...text) {
		console.log(...text);
	}
	this.get = function(options, callback) {
		try {
			request.get(options, function(err, resp, data) {
				callback(err, resp, data);
			});
		} catch (e) {
			this.log(e);
		}
	}
	this.post = function(options, callback) {
		try {
			request.post(options, function(err, resp, data) {
				callback(err, resp, data);
			});
		} catch (e) {
			this.log(e);
		}
	}
	this.cookie = exportCk == undefined ? '' : exportCk;
	this.outTime = 0;
	this.wait = function(t) {
		return new Promise(e => setTimeout(e, t));
	}
	this.main = async function() {
		cookie = that.cookie;
		await finishTask();
		$.isjx = true;
		let i = 0;
		while (i < 25) {
			i++;
			await getTask();
			await jump();
			await $.wait(6000);
			await finishTask();
			if ($.isjx == false) {
				break;
			}
		}
	}

	var that = this;
	var $ = {
		name: '番茄看看',
		logErr: (...text) => {
			this.log(...text)
		},
		log: (...text) => {
			this.log(...text)
		},
		wait: (t) => {
			return new Promise(e => setTimeout(e, t));
		},
		post: function(o, f) {
			that.post(o, f)
		},
		get: function(o, f) {
			that.get(o, f)
		},
		msg: (...text) => {
			this.log(...text)
		},
		done: () => {
			this.log("执行完毕");
		}
	}
	let JD_API_HOST = "http://m.yp-erp.xyz/reada/"
	var cookie = '';

	function getTask() {
		return new Promise((resolve, reject) => {
			$.post(taskUrl('getTask', '', cookie), (error, response, data) => {
				try {
					//console.log(data)
					data = JSON.parse(data);
					if (data.code == 0) {
						$.jkey = data.data.jkey;
					} else {
						console.log(data);
						$.isjx = false;
					}
				} catch (e) {
					console.log(e);
					$.isjx = false;
				} finally {
					resolve()
				}
			})
		})
	}

	function jump() {
		return new Promise((resolve, reject) => {
			$.get(taskUrl('jump?' + 'key=' + $.jkey, '', 'readLastKey=' + $.jkey + ';' + cookie), (error,
				response, data) => {
				try {
					//console.log(data)
				} catch (e) {
					console.log(e);
					$.isjx = false;
				} finally {
					resolve()
				}
			})
		})
	}

	function finishTask() {
		return new Promise((resolve, reject) => {
			$.post(taskUrl('finishTask', 'readLastKey=' + $.jkey, 'readLastKey=' + $.jkey + ';' + cookie), (
				error, response, data) => {
				try {
					console.log(data)
				} catch (e) {
					console.log(e);
					$.isjx = false;
				} finally {
					resolve()
				}
			})
		})
	}

	function taskUrl(functionId, body = '', ck) {
		return {
			url: `${JD_API_HOST}${functionId}`,
			body: body,
			headers: {
				'Cookie': ck,
				'Host': 'm.yp-erp.xyz',
				'X-Requested-With': 'XMLHttpRequest',
				'Connection': 'keep-alive',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Referer': 'http://m.yp-erp.xyz/reada?upuid=4090370',
				'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1316.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat",
				'Accept-Language': 'zh-cn',
			}
		}
	}
}
