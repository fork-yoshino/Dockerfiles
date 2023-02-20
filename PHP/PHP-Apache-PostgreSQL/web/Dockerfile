FROM php:8.1-apache-buster

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libpq-dev \
        libicu-dev \
        libonig-dev \
        libzip-dev \
        unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # PHP拡張パッケージ
    docker-php-ext-install \
        pgsql \
        pdo_pgsql \
        intl \
        zip && \
    # Xdebugのインストール
    pecl install xdebug-3.1.6 && \
    docker-php-ext-enable xdebug && \
    # Apache rewriteモジュール有効化
    a2enmod rewrite

COPY ./php.ini /usr/local/etc/php/
COPY ./*.conf /etc/apache2/sites-available/

WORKDIR /var/www
