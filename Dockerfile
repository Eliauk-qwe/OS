# 使用 Ubuntu 20.04 基础镜像
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# 安装 apt-utils 避免 debconf 警告
RUN apt-get update && apt-get install -y apt-utils

# 设置上海时区
RUN apt-get update && apt-get install -y tzdata \
    && ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata

# 安装依赖 + locales
RUN apt-get update && apt-get install -y \
    build-essential \
    nasm \
    wget \
    make \
    g++ \
    binutils \
    curl \
    libgmp-dev \
    libmpfr-dev \
    libmpc-dev \
    git \
    sudo \
    vim \
    software-properties-common \
    locales \
    zsh

# locale
RUN locale-gen zh_CN.UTF-8 && \
    update-locale LANG=zh_CN.UTF-8
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN:zh
ENV LC_ALL=zh_CN.UTF-8

# Ubuntu 14.04 源
RUN echo "deb http://dk.archive.ubuntu.com/ubuntu/ trusty main universe" >> /etc/apt/sources.list && \
    echo "deb http://dk.archive.ubuntu.com/ubuntu/ trusty-updates main universe" >> /etc/apt/sources.list && \
    apt-get update

# gcc 4.4
RUN apt-get install -y gcc-4.4 g++-4.4 && \
    update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.4 40

# 创建普通用户 wly，默认 shell = zsh
RUN useradd -m -s /usr/bin/zsh wly && \
    echo "wly ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# 拷贝 oh-my-zsh 和 zshrc (你在 build 前要先 cp 到 build context)
COPY --chown=wly:wly oh-my-zsh /home/wly/.oh-my-zsh
COPY --chown=wly:wly zshrc /home/wly/.zshrc

# 默认非 root
USER wly

# 设工作目录
WORKDIR /home/wly/myos

# 默认执行 zsh
CMD [ "zsh" ]
