import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Backend 1.0

ApplicationWindow {
    width: 700
    height: 500
    visible: true
    title: "QtRabbitAsync Dashboard"

    property string selectedDeviceId: "device-001"
    property string firmwarePath: "/tmp/firmware.bin"

    DeviceModel {
        id: deviceModel
    }

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 12

        Text {
            text: "MQTT/Rabbit + OTA (QtConcurrent + QML)"
            font.bold: true
        }

        Row {
            spacing: 8
            TextField {
                id: deviceIdField
                text: selectedDeviceId
                placeholderText: "deviceId"
                width: 200
                onTextChanged: selectedDeviceId = text
            }
            TextField {
                id: firmwarePathField
                text: firmwarePath
                placeholderText: "firmwarePath"
                width: 260
                onTextChanged: firmwarePath = text
            }
        }

        Row {
            spacing: 8
            Button {
                text: "Subscribe"
                onClicked: Backend.subscribeToUpdates("devices/updates")
            }
            Button {
                text: "Send Cloud Message"
                onClicked: Backend.sendMessage("hello cloud")
            }
        }

        ProgressBar {
            id: publishPb
            from: 0; to: 1
            width: 420
        }

        Connections {
            target: Backend
            function onPublishProgress(v) { publishPb.value = v }
            function onPublishFinished(id) { console.log("ACK:", id) }
            function onCloudMessageReceived(json) { deviceModel.updateFromJson(json) }

            function onOtaProgress(deviceId, percent) {
                if (deviceId === selectedDeviceId) {
                    otaPb.value = percent / 100.0
                }
            }

            function onOtaFinished(deviceId, success, error) {
                if (deviceId === selectedDeviceId) {
                    otaStatus.text = success ? "OTA complete" : ("OTA failed: " + error)
                }
            }

            function onConnectionStateChanged(connected) {
                connStatus.text = connected ? "Connected" : "Disconnected"
            }
        }

        Button {
            text: "Start OTA"
            onClicked: Backend.startOtaUpdate(selectedDeviceId, firmwarePath)
        }

        ProgressBar {
            id: otaPb
            from: 0; to: 1
            width: 420
        }

        Text { id: otaStatus; text: "OTA idle" }
        Text { id: connStatus; text: "Connection: unknown" }

        ListView {
            width: 520
            height: 200
            model: deviceModel
            delegate: Row {
                width: parent.width
                spacing: 10
                Text { text: model.name; width: 200 }
                Text { text: model.value; width: 280 }
            }
        }
    }
}