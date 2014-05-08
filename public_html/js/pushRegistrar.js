/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var gcmRegId;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
        alert("bindEvents");
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        alert("OnDeviceReady");
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"1017851606220","ecb":"app.onNotificationGCM"});
        
    },
    // Update DOM on a Received Event (paz: this function is not being called any more)
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        if (AppConfig.onDebug) {
            alert('Callback Success! Result = '+result)
        }
    },
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);

                    if (AppConfig.onDebug) {
                        alert('registration id = '+ e.regid);
                    }

                    gcmRegId = e.regid;
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                // alert('message = '+ e.message +' msgcnt = '+ e.msgcnt);
                // alert(e.text + ' (' + e.created + ')');
                //alert(e.payload.text);
                Feeder.createFeedItem(e.payload.icon, e.payload.text);

                break;

            case 'error':
                alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }
};
