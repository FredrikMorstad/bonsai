wifi.start()
wifi.mode(wifi.STATION, true)
wifi.sta.disconnect()

package.loaded["json"]=nil
local json_file_to_dict = require('json').json_file_to_dict
conf = json_file_to_dict("config.json")

station_config = {ssid=conf.wifi.ssid, pwd=conf.wifi.pwd, auto=true}
save = true

wifi.sta.config(station_config, save)