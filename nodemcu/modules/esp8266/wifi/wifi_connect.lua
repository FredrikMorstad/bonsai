station_cfg={}
station_cfg.ssid=""
station_cfg.pwd=""
wifi.setmode(wifi.STATION)
wifi.sta.config(station_cfg)
wifi.sta.connect()

local t = tmr.create()

t:alarm(1000, tmr.ALARM_AUTO, function()
    if wifi.sta.getip() == nil then
        print("IP unavailable, Waiting...")
    else
        t:stop(1)
        print("ESP8266 mode is: " .. wifi.getmode())
        print("The module MAC address is: " .. wifi.ap.getmac())
        print("Config done, IP is "..wifi.sta.getip())
    end
end)
