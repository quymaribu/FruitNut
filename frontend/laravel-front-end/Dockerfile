FROM php:8.2-apache
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y unzip libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql
COPY . .
RUN chown -R www-data:www-data /var/www/html
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
