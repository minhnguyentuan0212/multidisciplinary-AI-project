import os
import telebot
import requests
import json
import librosa
import soundfile as sf
import io

from six.moves.urllib.request import urlopen

BOT_TOKEN = os.environ.get('BOT_TOKEN')
BASE_URL = os.environ.get('BASE_URL')
SPEECH_URL = os.environ.get('SPEECH_URL')

print(f"[+] {BOT_TOKEN = }")
print(f"[+] {BASE_URL = }")
print(f"[+] {SPEECH_URL = }")

bot = telebot.TeleBot(BOT_TOKEN)

def load_commands_from_json():
    with open('commands.json', 'r') as f:
        commands_data = json.load(f)
    bot_commands = []
    for command_data in commands_data['commands']:
        print(command_data)
        command = telebot.types.BotCommand(command_data['command'], command_data['description'])
        bot_commands.append(command)
    return bot_commands

bot.set_my_commands(load_commands_from_json())

def get_all_devices():
    response = requests.get(BASE_URL + '/devices')
    return response.json()

def get_device_id(device_name):
    all_devices = get_all_devices()
    for device in all_devices:
        if device_name in device['name']:
            return device['device_id'], device['name']
    return None

def get_newest_data(device_id):
    url = BASE_URL + f'/devices/{device_id}/data'
    response = requests.get(url)
    return response.json()[0]

def compose_reply(device_name, data):
    value = data['value']
    date = data['created_at']
    if device_name in ['door', 'lights']:
        value = 'Mở' if value == '1' else 'Đóng'
    reply = f"""
Dữ liệu mới nhất từ `{device_name}`:
+ Giá trị: {value}
+ Ngày lấy dữ liệu: {date}
    """
    return reply
     
def action_handler(message, action):
    if action == 'offbedroom':
        message.text = f"/turnoff lights"
        turnoff(message)
    elif action == 'obedroom':
        message.text = f"/turnon lights"
        turnon(message)
   
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Howdy, how are you doing?")
    
@bot.message_handler(commands=['get'])
def get_data(message):
    command_args = message.text.split(' ')
    print(command_args)
    if len(command_args) == 2:
        device, device_name = get_device_id(command_args[1])
        if device is None:
            bot.reply_to(message, "Không tìm thấy thiết bị.")
            return
        newest = get_newest_data(device)
        reply = compose_reply(device_name, newest)
        bot.reply_to(message, reply, parse_mode='Markdown')
    else:
        bot.reply_to(message, "Thêm tên thiết bị. Ví dụ: `/get lights`", parse_mode='Markdown')
    
@bot.message_handler(commands=['summarize'])
def summerize(message):
    all_devices = get_all_devices()
    reply = "Danh sách thiết bị:\n"
    for device in all_devices:
        data = get_newest_data(device['device_id'])
        reply += compose_reply(device['name'], data)
    bot.reply_to(message, reply)

@bot.message_handler(commands=['toggle'])
def toggle(message):
    command_args = message.text.split(' ')
    print(command_args)
    if len(command_args) == 2:
        device_id, device_name = get_device_id(command_args[1])
        if command_args[1] not in ['lights', 'door']:
            bot.reply_to(message, "Thiết bị không hợp lệ. Thiết bị cho phép bao gồm: `lights`, `door`.")
            return
        if device_id is None:
            bot.reply_to(message, "Không tìm thấy thiết bị.")
            return
        newest = get_newest_data(device_id)
        value = '0' if newest['value'] == '1' else '1'
        response = requests.post(BASE_URL + f'/devices/{device_id}/data', json={'value': value})
        if response.status_code == 201:
            if command_args[1] == 'lights':
                action = "tắt" if value == '0' else 'mở'
                reply = f'Đã {action} đèn.'
            else:
                action = "đóng" if value == '0' else 'mở'
                reply = f'Đã {action} cửa.'
            bot.reply_to(message, reply)
        else:
            bot.reply_to(message, "Không thể thay đổi trạng thái của thiết bị.")
    else:
        bot.reply_to(message, "Thêm tên thiết bị. Ví dụ: `/toggle lights`", parse_mode='Markdown')
        
@bot.message_handler(commands=['turnon'])
def turnon(message):
    command_args = message.text.split(' ')
    print(command_args)
    if len(command_args) == 2:
        device_id, device_name = get_device_id(command_args[1])
        if command_args[1] not in ['lights', 'door']:
            bot.reply_to(message, "Thiết bị không hợp lệ. Thiết bị cho phép bao gồm: `lights`, `door`.")
            return
        if device_id is None:
            bot.reply_to(message, "Không tìm thấy thiết bị.")
            return
        newest = get_newest_data(device_id)
        if newest['value'] == '1': 
            bot.reply_to(message, "Thiết bị đã được bật.")
            response = requests.post(BASE_URL + f'/devices/{device_id}/data', json={'value': '1'})
        else:
            response = requests.post(BASE_URL + f'/devices/{device_id}/data', json={'value': '1'})
            if response.status_code == 201:
                if command_args[1] == 'lights':
                    reply = f'Đã bật đèn.'
                else:
                    reply = f'Đã mở cửa.'
                bot.reply_to(message, reply)
            else:
                bot.reply_to(message, "Không thể thay đổi trạng thái của thiết bị.")
    else:
        bot.reply_to(message, "Thêm tên thiết bị. Ví dụ: `/turnon lights`", parse_mode='Markdown')
        
@bot.message_handler(commands=['turnoff'])
def turnoff(message):
    command_args = message.text.split(' ')
    print(command_args)
    if len(command_args) == 2:
        device_id, device_name = get_device_id(command_args[1])
        if command_args[1] not in ['lights', 'door']:
            bot.reply_to(message, "Thiết bị không hợp lệ. Thiết bị cho phép bao gồm: `lights`, `door`.")
            return
        if device_id is None:
            bot.reply_to(message, "Không tìm thấy thiết bị.")
            return
        newest = get_newest_data(device_id)
        if newest['value'] == '0': 
            bot.reply_to(message, "Thiết bị đã được tắt/đóng.")
            response = requests.post(BASE_URL + f'/devices/{device_id}/data', json={'value': '0'})
        else:
            response = requests.post(BASE_URL + f'/devices/{device_id}/data', json={'value': '0'})
            if response.status_code == 201:
                if command_args[1] == 'lights':
                    reply = f'Đã tắt đèn.'
                else:
                    reply = f'Đã đóng cửa.'
                bot.reply_to(message, reply)
            else:
                bot.reply_to(message, "Không thể thay đổi trạng thái của thiết bị.")
    else:
        bot.reply_to(message, "Thêm tên thiết bị. Ví dụ: `/turnoff lights`", parse_mode='Markdown')

@bot.message_handler(content_types=['voice'])
def handle_voice_message(message):
    file_info = bot.get_file(message.voice.file_id)
    file_url = f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file_info.file_path}"
    data, sample_rate = sf.read(io.BytesIO(urlopen(file_url).read()))
    arr = data.tolist()
    audio_json = json.dumps(arr)
    with open('audio.json', 'w') as f:
        f.write(audio_json)
    with open('audio.json', 'r') as file:  
        response = requests.post("http://localhost:9999/speech/", files={'file': file})
    reply = f"""
Kết quả nhận dạng giọng nói: {response.json()['query']}
Hành động: {response.json()['value']}
    """
    bot.send_message(message.chat.id, reply)
    action_handler(message, response.json()['value'])

    
bot.infinity_polling()