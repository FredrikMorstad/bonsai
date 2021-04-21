wifi.start()
wifi.mode(wifi.STATION)
wifi.sta.disconnect()

station_config = {ssid="PlantBridge", pwd="Rosemary"} -- Get values from config file
save = true

wifi.sta.config(station_config, save)