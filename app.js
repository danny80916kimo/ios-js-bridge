console.log("test")

function otherWay(){
    console.log("otherWay!!");
}

function great(){
    console.log("great!!");
    window.webkit.messageHandlers.great.postMessage("Send message to Swift")
    console.log("great!! after");
}

great();

// window.webkit.messageHandlers.great.postMessage("Send message to Swift")


function setupWKWebViewJavascriptBridge(callback) {
    if (window.WKWebViewJavascriptBridge) { return callback(WKWebViewJavascriptBridge); }
    if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
    window.WKWVJBCallbacks = [callback];
    window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
}

setupWKWebViewJavascriptBridge(function(bridge) {

	/* Initialize your app here */

	bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
		console.log('iOS called testJavascriptHandler with', data)
		responseCallback({ 'Javascript Says':'Right back atcha!' })
	})

	bridge.callHandler('otherWay', {'foo': 'bar'}, function(response) {
		console.log('JS got response', response)
	})
})

