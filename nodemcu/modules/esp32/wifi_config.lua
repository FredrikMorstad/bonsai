wifi.start()
wifi.mode(wifi.STATION, true)
wifi.sta.disconnect()

station_config = {ssid="PlantBridge", pwd="Rosemary", auto=true} -- Get values from config file
save = true

wifi.sta.config(station_config, save)