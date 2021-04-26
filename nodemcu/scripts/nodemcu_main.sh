terminal_args=$@
num_args=$#

usage(){
    printf "Usage <script>
        Options:
            r or run [.lua-file] to run a file
            u or upload [.lua-file] to upload a file
            t or terminal [.lua-file] to access the terminal \n"

    exit 1
}

run(){
    echo "$1"
    if [ $# == 0 ]; then
        printf "Choose file to run: "
        read msg
        sudo nodemcu-tool run "$msg"
        return
    fi
    sudo nodemcu-tool run $1
}

terminal_mode(){
    sudo nodemcu-tool terminal
}

upload(){
    if [ $# == 0 ]; then
        ls *.lua
        printf "Choose file to upload: "
        read msg
        sudo nodemcu-tool upload "$msg"
        return
    fi
    sudo nodemcu-tool upload $1
}

parse_args(){
    if [ $num_args = 0 ]; then
        usage
    fi

    while [ "$1" != "" ]; do
        case $1 in
            r | run) shift; run $1; break;;

            t | terminal) shift; terminal_mode; break;;

            u | upload) shift; upload $1; break;;

            -h | --help ) usage;;

            * ) usage;;
        esac
        shift
    done
}

parse_args $terminal_args
