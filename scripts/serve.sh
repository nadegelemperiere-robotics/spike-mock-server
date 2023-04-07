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

# Build react app
npm run build
npm install

# Create virtual environment
python3 -m venv /home/fll/mock
. /home/fll/mock/bin/activate

# Gather parts database
mkdir -p ${HOME}/.config/pyldraw
echo "parts.lst: $scriptpath/../../parts/parts.lst" > ${HOME}/.config/pyldraw/config.yml

# Install required python packages
pip install --quiet --no-warn-script-location -r $scriptpath/../requirements.txt
pip install --quiet --no-warn-script-location /mock
python3  $scriptpath/../api/application.py run --port 3000 --host 127.0.0.1 --debug

deactivate
