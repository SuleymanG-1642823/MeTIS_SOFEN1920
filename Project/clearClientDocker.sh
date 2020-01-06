if [ $# -eq 0 ]; then
    docker container rm gfCC
    docker image rm gf/client
elif [ $# -lt 2 ]; then
    echo "Usage: $0 <client-container> <client-image>"
    exit 1
else
    docker container rm "$1"
    ocker image rm "$2"
fi
