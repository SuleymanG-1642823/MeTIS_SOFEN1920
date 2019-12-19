if [ $# -eq 0 ]; then
    docker container rm gfDC
    docker image rm gf/db
    docker volume rm project_data
elif [ $# -lt 3 ]; then
    echo "Usage: $0 [<db-container> <db-image> <db-volume>]"
    exit 1
else
    docker container rm $1
    ocker image rm "$2"
    docker volume rm "$3"
fi

