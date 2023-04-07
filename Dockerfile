######## SERVE REACT APP AND FLASK ########
FROM ubuntu:23.04

# Retrieve building artifact
COPY --from=build /work/build /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Update systemd
RUN apt-get update && \
    apt-get install --no-install-recommends -y systemd=252.5-2ubuntu3 && \
    rm -rf /var/lib/apt/lists/*

# Install glibc
RUN apt-get update && \
    apt-get install --no-install-recommends -y glibc-source=2.37-0ubuntu2 && \
    rm -rf /var/lib/apt/lists/*

# Install git
RUN apt-get update && \
    apt-get install --no-install-recommends -y git=1:2.39.2-1ubuntu1 && \
    apt-get install --no-install-recommends -y less=590-1.2 && \
    apt-get install --no-install-recommends -y git-lfs=3.3.0-1 && \
    rm -rf /var/lib/apt/lists/*

# Install bash
RUN apt-get update && \
    apt-get install --no-install-recommends -y bash=5.2.15-2ubuntu1 && \
    rm -rf /var/lib/apt/lists/*

# Install nginx
RUN apt-get update && \
    apt-get install --no-install-recommends -y nginx=1.22.0-1ubuntu3 && \
    rm -rf /var/lib/apt/lists/*

# Install node
RUN apt-get update && \
    apt-get install --no-install-recommends -y nodejs=18.13.0+dfsg1-1ubuntu2 && \
    apt-get install --no-install-recommends -y npm=9.2.0~ds1-1 && \
    rm -rf /var/lib/apt/lists/*

# Install python
RUN apt-get update && \
    apt-get install --no-install-recommends -y curl=7.88.1-8ubuntu1 && \
    apt-get install --no-install-recommends -y python3-pip=23.0.1+dfsg-1 && \
    apt-get install --no-install-recommends -y python3-venv=3.11.2-1 && \
    apt-get install --no-install-recommends -y libxml2-dev=2.9.14+dfsg-1.1build2 && \
    apt-get install --no-install-recommends -y libxslt1-dev=1.1.35-1 && \
    apt-get install --no-install-recommends -y libffi-dev=3.4.4-1 && \
    curl -sSL https://install.python-poetry.org -o get_poetry.py && \
    export POETRY_HOME=/usr/local && \
    python3 get_poetry.py --version 1.4.1 && \
    rm -rf /var/lib/apt/lists/*

# Launch test scripts
CMD ["/bin/bash"]

