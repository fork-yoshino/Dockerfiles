FROM php:8.2.6-fpm

ENV COMPOSER_ALLOW_SUPERUSER=1

# ComposerイメージからComposerを取得
COPY --from=composer:2.5.5 /usr/bin/composer /usr/bin/composer

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
    # ソケットファイルを格納するためのディレクトリを作成
    mkdir -p /var/run/php-fpm

COPY ./php.ini /usr/local/etc/php/
COPY ./php-fpm.d/zzz-www.conf /usr/local/etc/php-fpm.d/

WORKDIR /var/www
