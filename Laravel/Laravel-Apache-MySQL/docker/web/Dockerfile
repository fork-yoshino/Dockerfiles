FROM php:8.2-apache-bullseye

ENV COMPOSER_ALLOW_SUPERUSER=1

# ComposerイメージからComposerを取得
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libicu-dev \
        libonig-dev \
        libzip-dev \
        unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # PHP拡張パッケージ
    docker-php-ext-install \
        pdo_mysql \
        mysqli \
        intl \
        zip && \
    # Xdebugのインストール
    pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    # Apache rewriteモジュール有効化
    a2enmod rewrite

# Node.jsのインストール
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # Node.jsパッケージ
    npm install -g npm@latest && \
    npm install -g yarn && \
    npm cache clean --force

COPY ./php.ini /usr/local/etc/php/
COPY ./*.conf /etc/apache2/sites-available/

WORKDIR /var/www
