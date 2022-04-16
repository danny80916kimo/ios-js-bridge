console.log("test")

function great(){
    console.log("great!!");
}

great();

window.webkit.messageHandlers.great.postMessage("Send message to Swift")


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

	bridge.callHandler('App.back();', {'foo': 'bar'}, function(response) {
		console.log('JS got response', response)
	})
})

