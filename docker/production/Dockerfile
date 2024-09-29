# Usar uma imagem base oficial do PHP com FPM
FROM php:8.3-fpm

# Manter o autor da imagem
LABEL maintainer="Taylor Otwell"

# Definir argumentos e variáveis de ambiente
ARG WWWGROUP
ARG NODE_VERSION=20
ARG MYSQL_CLIENT="mysql-client"

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=America/Recife

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Configurar o fuso horário
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Instalar dependências do sistema e extensões PHP necessárias
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    gnupg gosu curl ca-certificates zip unzip git libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev libzip-dev supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd bcmath opcache pdo pdo_mysql mbstring exif pcntl intl soap xml zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

# Instalar Node.js e npm
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Adicionar usuário e grupo para o Laravel
RUN groupadd --force -g $WWWGROUP www-data \
    && useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail

# Copiar arquivos da aplicação
COPY . /var/www/html

# Ajustar permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Copiar configurações do Supervisor e php.ini
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY php.ini /usr/local/etc/php/conf.d/99-custom.ini

# Expor a porta 9000 para PHP-FPM
EXPOSE 9000

# Comando de entrada para o Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
