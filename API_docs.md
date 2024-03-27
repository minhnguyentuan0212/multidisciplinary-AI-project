Base URL: http://localhost:5000/api.
## Devices

<details open>
<summary><code>GET /devices</code></summary>

##### Description
Lấy thông tin tất cả thiết bị trong nhà

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
| None|None|JSON| N/A  |

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`[{"_id":"6603cfe54e26b208ff95d2f4","device_id":"2754203","key":"welcome-feed","name":"Welcome Feed","data":[],"__v":0},{"_id":"6603cfe54e26b208ff95d30b","device_id":"2754204","key":"iot-gateway","name":"IoT gateway","data":[{"data_id":"0FJ387ZRCB923PMQSZ5MZP3EA2","value":"1","created_at":"2024-03-26T14:52:54.000Z","_id":"6603cfe54e26b208ff95d30c"},{"data_id":"0FJ387ZFCAGACVAV0100Y1882E","value":"0","created_at":"2024-03-26T14:52:53.000Z","_id":"6603cfe54e26b208ff95d30d"}]}]`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/devices
```

</details>

<details open>
<summary><code>GET /devices/:device_id</code></summary>

##### Description
Lấy thông tin của thiết bị có id là `device_id`

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
| `device_id`|required|int| The device id |

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"_id":"6603cfe54e26b208ff95d2f6","device_id":"2769310","key":"bedroom.test-bedroom","name":"test-bedroom","data":[{"data_id":"0FJ3A240KXNH1YW26GYMRK0PT5","value":"2","created_at":"2024-03-26T16:34:30.000Z","_id":"6603cfe54e26b208ff95d2f7"},{"data_id":"0FJ3A23HHZBJ1093ZY062QKQK4","value":"0","created_at":"2024-03-26T16:34:29.000Z","_id":"6603cfe54e26b208ff95d2f8"}]}`|
|404|application/json|`{"code":"404","msg":"Device not found"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/devices/2769310
```

</details>

<details open>
<summary><code>GET /devices/:device_id/data</code></summary>

##### Description
Lấy data thu thập được từ thiết bị có id là `device_id`

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
| `device_id`|required|int| The device id |

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`[{"value":"2","created_at":"2024-03-26T16:34:30.000Z"},{"value":"0","created_at":"2024-03-26T16:34:29.000Z"},{"value":"12","created_at":"2024-03-26T16:34:27.000Z"},{"value":"4","created_at":"2024-03-26T16:34:23.000Z"},{"value":"3","created_at":"2024-03-26T16:34:21.000Z"},{"value":"2","created_at":"2024-03-26T16:34:20.000Z"},{"value":"1","created_at":"2024-03-26T16:34:18.000Z"}]`|
|404|application/json|`{"code":"404","msg":"Device not found"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/devices/2769310/data
```
</details>

<details open>
<summary><code>POST /devices/:device_id/data</code></summary>

##### Description
Gửi data lên thiết bị có id là `device_id` để cập nhật trạng thái (mở/tắt quạt, đèn)

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`device_id`|required|int|Device's id|
|`value`|required|str|Device's id|

##### Response

|Code|Content-type|Response|
|--|--|--|
|201|application/json|`{"code":"201", "msg": "Added successfully"}`|
|404|application/json|`{"code":"404", "msg": "Device not found"}`|
|400|application/json|`{"code":"400", "msg": "Bad request"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X POST -d '{"value":"69"}' -H "Content-Type: application/json" http://localhost:5000/api/devices/2769310/data # Add data to a testing device
```
</details>

<details open>
<summary><code>POST /devices</code></summary>


##### Description
Tạo thiết bị mới

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`room_name`|required|str|Room's name|
|`device_name`|required|str|Device's name|
|`description`|optional|str| Description|

##### Response

|Code|Content-type|Response|
|--|--|--|
|201|application/json|`{"code":"201", "msg": "Added successfully"}`|
|404|application/json|`{"code":"404", "msg": "Room not found"}`|
|400|application/json|`{"code":"400", "msg": "Bad request"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X POST -d '{"room_name":"TESTROOM","device_name":"test_device","decription":"just a test device"}' http://localhost:5000/api/devices/ -H "Content-Type: application/json"
```
</details>

<details open>
<summary><code>PUT /devices/:device_id</code></summary>

##### Description
Sửa tên của thiết bị có id là `device_id`

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`device_id`|required|int|Device's ID|
|`device_name`|required|str|Device's name|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|**TODO**|
|404|application/json|`{"code":"404","msg":"Device not found"}`|
|400|application/json|`{"code":"400","msg":"Bad request"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X 
```
</details>

<details open>
<summary><code>DELETE /devices/:device_id</code></summary>

##### Description
Xóa thiết bị có id là `device_id`

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`device_id`|required|int|Device's ID|


##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"code":"200","msg":"Device has been deleted"}`|
|404|application/json|`{"code":"404","msg":"Device not found"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X 
```
</details>

## Rooms

<details open>
<summary><code>GET /rooms</code></summary>

##### Description
Lấy thông tin tất cả phòng

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`[{"_id":"6603cc2ffae052ce5130bd76","room_id":"1171775","key":"bedroom","name":"Bedroom","description":"Các thiết bị trong phòng ngủ","devices":[],"__v":0},{"_id":"6603cc2ffae052ce5130bd79","room_id":"1171783","key":"testroom","name":"TESTROOM","description":"","devices":["6603cfe54e26b208ff95d2f6"]},{"_id":"6603cc2ffae052ce5130bd78","room_id":"1171777","key":"livingroom","name":"Livingroom","description":"Các thiết bị phòng khách","devices":[],"__v":0},{"_id":"6603cc2ffae052ce5130bd77","room_id":"1171774","key":"kitchen","name":"Kitchen","description":"Các thiết bị trong bếp","devices":[],"__v":0}]`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:500/api/rooms
```
</details>

<details open>
<summary><code>GET /rooms/:room_id</code></summary>

##### Description
Lấy thông tin của phòng có id là `room_id`.

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`room_id`|required|str|Room's ID|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"_id":"6603cc2ffae052ce5130bd79","room_id":"1171783","key":"testroom","name":"TESTROOM","description":"","devices":["6603cfe54e26b208ff95d2f6"]}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:500/api/rooms/1171783 # id of TESTROOM
```
</details>

<details open>
<summary><code>GET /rooms/:room_id/devices</code></summary>

##### Description
Lấy thông tin các thiết bị trong phòng có id là `room_id`.

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`room_id`|required|str|Room's ID|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`[{"_id":"6603cfe54e26b208ff95d2f6","device_id":"2769310","key":"bedroom.test-bedroom","name":"test-bedroom","data":[{"data_id":"0FJ3A240KXNH1YW26GYMRK0PT5","value":"2","created_at":"2024-03-26T16:34:30.000Z","_id":"6603cfe54e26b208ff95d2f7"},{"data_id":"0FJ3A23HHZBJ1093ZY062QKQK4","value":"0","created_at":"2024-03-26T16:34:29.000Z","_id":"6603cfe54e26b208ff95d2f8"}]}]`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/rooms/1171783/devices # Devices in TESTROOM
```
</details>

<details open>
<summary><code>POST /rooms</code></summary>

##### Description
Thêm phòng.

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`group_name`|required|str|Group/Room name|
|`description`|optional|str|Description|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"code":"200","msg":"Added successfully"}`|
|400|application/json|`{"code":"400","msg":"Bad request"}`|
|404|application/json|`{"code":"404","msg":"Room existed"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X 
```
</details>

<details open>
<summary><code>PUT /rooms/:room_id</code></summary>

##### Description
Chỉnh sửa thông tin phòng có id là `room_id`.

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`room_id`|required|str|Room's ID|
|`group_name`|required|str|Group/Room name|
|`description`|optional|str|Description|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"code":"400","msg":"Updated successfully"}`|
|400|application/json|`{"code":"400","msg":"Bad request"}`|
|404|application/json|`{"code":"404","msg":"Room not found"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X 
```
</details>

<details open>
<summary><code>DELETE /rooms/:room_id</code></summary>

##### Description
Xóa phòng có id là `room_id`.

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`room_id`|required|str|Room's ID|
|`group_name`|required|str|Group/Room name|
|`description`|optional|str|Description|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"code": "200","msg":"Room has been deleted"}`|
|404|application/json|`{"code":"404","msg":"Room not found"}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X 
```
</details>

## Types

<details open>
<summary><code>GET /types</code></summary>

##### Description
Lấy thông tin tất cả loại thiết bị

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`[{"_id":"6603c94354cdb0f8c20c3c3e","name":"led","devices":[],"__v":0},{"_id":"6603c94354cdb0f8c20c3c41","name":"temp","devices":[],"__v":0},{"_id":"6603c94354cdb0f8c20c3c3f","name":"fan","devices":[],"__v":0},{"_id":"6603c94354cdb0f8c20c3c40","name":"humi","devices":[],"__v":0}]`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/types
```
</details>

<details open>
<summary><code>GET /types/:type_name</code></summary>

##### Description
Lấy thông tin loại thiết bị có tên là `type_name` (led, humi, fan...)

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`type_name`|required|string|Type's name|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`{"_id":"6603c94354cdb0f8c20c3c3e","name":"led","devices":["6603cfe54e26b208ff95d2f6"],"__v":0}`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/types/led
```
</details>


<details open>
<summary><code>GET /types/:type_name/devices</code></summary>

##### Description
Lấy thông tin tất cả thiết bị cùng loại, với tên loại thiết bị là `type_name` (fan, humi, temp).

##### Parameters

| name|type|data type| description|
|-----|----|---------|------------|
|`type_name`|required|string|Type's name|

##### Response

|Code|Content-type|Response|
|--|--|--|
|200|application/json|`[{"_id":"6603cfe54e26b208ff95d2f6","device_id":"2769310","key":"bedroom.test-bedroom","name":"test-bedroom","data":[{"data_id":"0FJ3A240KXNH1YW26GYMRK0PT5","value":"2","created_at":"2024-03-26T16:34:30.000Z","_id":"6603cfe54e26b208ff95d2f7"},{"data_id":"0FJ3A23HHZBJ1093ZY062QKQK4","value":"0","created_at":"2024-03-26T16:34:29.000Z","_id":"6603cfe54e26b208ff95d2f8"}]}]`|
|500|application/json|`{"code":"500","msg":"Server Error"}`|

##### Example cURL
```bash
curl -X GET http://localhost:5000/api/types/led/devices
```
</details>