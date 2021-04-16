wifi.setmode(wifi.STATION)
wifi.sta.disconnect()

cfg = {show_hidden=1, ssid="PlantBridge"}
print("Networks:")
wifi.sta.getap(cfg, function(table) for k,v in pairs(table) do print(k,v) end end)
