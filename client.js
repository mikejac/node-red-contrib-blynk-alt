/**
 * Copyright 2017 Michael Jacobsen.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict"

	/******************************************************************************************************************
	 * 
	 *
	 */
    function BlynkValueNode(config) {
        //console.log("CayenneSensorNode(): config =", config)

        RED.nodes.createNode(this, config)

        /*this.qos = parseInt(config.qos)
        if (isNaN(this.qos) || this.qos < 0 || this.qos > 2) {
            this.qos = 0
        }

        this.channel    = config.channel
        this.datatype   = config.datatypeEx
        this.dataunit   = config.dataunitEx
        this.valuetype  = config.valuetypeEx

        this.client     = config.client
        this.clientConn = RED.nodes.getNode(this.client)    // the configuration

        this.broker     = this.clientConn.broker
        this.brokerConn = RED.nodes.getNode(this.broker)    // the MQTT broker

        var node = this

        if (this.brokerConn) {
            updateNodeStatus(this, false)

            if (this.channel) {
                //
                // build subscribe topic
                //
                this.topic =    "v1/" + 
                                this.clientConn.username + 
                                "/things/" + 
                                this.clientConn.clientid + 
                                "/cmd/" +
                                this.channel

                RED.log.debug("subscribe topic = " + this.topic)

                node.brokerConn.register(this)

                this.brokerConn.subscribe(this.topic, this.qos, function(topic, payload, packet) {
                    try {
                        payload = payload.toString()

                        var msg = {topic:topic, payload:payload, qos:packet.qos, retain:packet.retain}

                        RED.log.debug("message from cayenne = " + msg)

                        var req = msg.payload.split(",")

                        msg.sequence    = req[0]
                        msg.payload     = parseInt(req[1])
                        msg.channel     = node.channel

                        node.send(msg)

                        //
                        // now send response to Cayenne
                        //
                        msg.topic = "v1/" + 
                                    node.clientConn.username + 
                                    "/things/" + 
                                    node.clientConn.clientid + 
                                    "/response/" +
                                    node.channel

                        msg.payload = "ok," + req[0]

                        RED.log.debug("response topic   = " + msg.topic)
                        RED.log.debug("response payload = " + msg.payload)

                        node.brokerConn.publish(msg)  // send the message

                        node.valueOut = "ok"
                        updateNodeStatus(node, node.brokerConn.connected, node.valueIn, node.valueOut)
                    } catch(err) {
                        node.error(err)
                    }
                }, this.id)

                updateNodeStatus(node, node.brokerConn.connected)
            } else {
                node.error(RED._("cayenne.errors.missing-config"))
            }
            
            this.on('close', function(done) {
                if (node.brokerConn) {
                    node.brokerConn.unsubscribe(node.topic, node.id)
                    node.brokerConn.deregister(node, done)
                }
            })
        } else {
            this.error(RED._("cayenne.errors.missing-config"))
        }*/

        this.on('input', function (msg) {
            /*var val

            if (typeof msg.payload === 'string') {
                val = parseInt(msg.payload)
            } else if (typeof msg.payload === 'number') {
                val = msg.payload
            } else if (typeof msg.payload === 'boolean') {
                if (msg.payload == false) {
                    val = 0
                } else {
                    val = 1
                }
            } else if (typeof msg.payload === 'object') {
                node.error(RED._("cayenne.errors.invalid-value-type"))
                return
            } else {
                node.error(RED._("cayenne.errors.invalid-value-type"))
                return
            }

            msg.payload = val            
            msg.topic   =   "v1/" + 
                            node.clientConn.username + 
                            "/things/" + 
                            node.clientConn.clientid + 
                            "/" +
                            node.valuetype +
                            "/" +
                            node.channel

            RED.log.debug("reply topic   = " + msg.topic)
            RED.log.debug("reply payload = " + msg.payload)

            node.brokerConn.publish(msg)  // send the message

            node.valueIn = val
            updateNodeStatus(node, node.brokerConn.connected, node.valueIn, node.valueOut)*/
        })
    }

    RED.nodes.registerType("blynk value", ValueNode)

	/******************************************************************************************************************
	 * 
	 *
	 */
    function BlynkServerNode(config) {
        RED.nodes.createNode(this, config)

        /*this.username   = config.username
        this.clientid   = config.clientid
        this.broker     = config.broker
        this.brokerConn = RED.nodes.getNode(this.broker)    // the MQTT broker

        var node = this

        if (this.brokerConn) {
            node.brokerConn.register(node)
        } else {
            this.error(RED._("cayenne.errors.missing-config"))
        }*/

        this.on('close', function(done) {
            //node.brokerConn.deregister(node, done)
        })
    }

    RED.nodes.registerType("blynk-server", BlynkServerNode)

	/******************************************************************************************************************
	 * homemade - can't find a way to change the locale :-(
	 *
	 */
    function timeNowString() {
        var now     =   new Date()

        var h       = ("0" + (now.getHours())).slice(-2)
        var m       = ("0" + (now.getMinutes())).slice(-2)
        var s       = ("0" + (now.getSeconds())).slice(-2)

        var nowText = h + ":" + m + ":" + s

        return nowText
    }

}
