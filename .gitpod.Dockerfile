FROM gitpod/workspace-full

USER gitpod

# Install cypress dependencies
RUN sudo apt-get -q update && sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

RUN bash -c ". .nvm/nvm.sh     && nvm install 14.17.6     && nvm use 14.17.6     && nvm alias default 14.17.6"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && \
#     sudo apt-get install -yq bastet && \
#     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/config-docker/
