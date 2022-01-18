wifi.start()
wifi.mode(wifi.STATION)
wifi.sta.disconnect()

package.loaded["json"]=nil
local json_file_to_dict = require('json').json_file_to_dict
conf = json_file_to_dict("config.json")

cfg = {ssid=conf.wifi.ssid, hidden=1}

print("Networks:")
wifi.sta.scan(cfg, function(err, succ)
    if err then
        print("Scan failed: ", err)
    else
        print(string.format("%-26s", "SSID"), "Channel BSSID            RSSI Auth Bandwidth")
        for i, AP in ipairs(succ) do
            print(string.format("%-32s",AP.ssid), AP.channel, AP.bssid, AP.auth,AP.bandwidth)
        end
        print("Total APs: ", #succ) 
    end
end)