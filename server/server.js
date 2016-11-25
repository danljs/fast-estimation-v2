'use strict'

// try { 
// 	require('/Users/liuxiangdong/Dynatrace/dynatrace-oneagent-6.5/agent/bin/6.5.0.1289/any/nodejs/nodejsagent.js')
// 	({ 
// 		server: 'http://lius-macbook-pro.local:8042', 
// 		agentName: 'Node.js_Monitoring' 
// 	}); 
// } catch (err) { 
// 	console.error(err.toString()); 
// }

process.env.NODE_PORT = 8443
require('./app')

