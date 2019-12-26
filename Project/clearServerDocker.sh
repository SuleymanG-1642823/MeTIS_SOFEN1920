if [ $# -eq 0 ]; then
    docker container rm gfSC
    docker image rm gf/server
elif [ $# -lt 2 ]; then
    echo "Usage: $0 <server-container> <server-image>"
    exit 1
else
    docker container rm "$1"
    docker image rm "$2"
fi
