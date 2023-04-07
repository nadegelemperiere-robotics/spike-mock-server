#!/bin/bash
# -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Module to deploy an aws subnet with all the secure
# components required
# Bash script to tests in a container
# -------------------------------------------------------
# Nadège LEMPERIERE, @13 january 2022
# Latest revision: 13 january 2022
# -------------------------------------------------------

# Retrieve absolute path to this script
script=$(readlink -f $0)
scriptpath=`dirname $script`

docker stop spike-mock
docker rm spike-mock
#docker run -d -p 8080:8080 --name=spike-mock nadegelemperiere/spike-mock-server run --port 8080 --host 127.0.0.1 --debug


# Launch tests in docker container
#docker run -d -p 8080:8080 \
#           --name=spike-mock \
#           --volume $scriptpath/../:/package:rw \
#           --volume $scriptpath/../../ldraw-parts:/parts:ro \
#           --workdir /package \
#           nadegelemperiere/fll-test-docker:v2.2.2 \
#          ./scripts/serve.sh


# Launch container in development mode
docker container run -it --rm --name=spike-mock \
                     --volume ${scriptpath}/../:/server:rw \
                     --volume ${scriptpath}/../../mock/:/mock:ro \
                     --volume ${scriptpath}/../../ldraw-parts/:/parts:ro \
                     -p 3000:3000 --workdir /server \
                     nadegelemperiere/temp