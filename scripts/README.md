# Some useful scripts when operating your nodeMCU

## Aliases
Add the scripts to your .bashrc file like this
```sh
# nodemcu commands
alias <alias_name>="<path to a script>"
```
### _Example_
```sh
alias nrun="/home/elias/Documents/bonsai_project/plants-meet-internet/scripts/nodemcu_run"
alias nup="/home/elias/Documents/bonsai_project/plants-meet-internet/scripts/nodemcu_upload"
```
Lastly, source your `.bashrc` file to enable the aliases
```
source <path to .bashrc file>
```