#!/bin/bash

docker run -it --rm --name certbot \
            -p 80:80 -p 443:443 \
            -v "/home/ubuntu/TaalToolBox/certbot:/etc/letsencrypt" \
            certbot/certbot certonly --standalone -d www.taaltoolbox.be -d taaltoolbox.be \
                 --non-interactive --agree-tos \
                 --email abderrachid.bellaali@gmail.com --expand