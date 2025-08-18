Installation de n8n sur Linux avec Docker Compose, PostgreSQL et Nginx
Ce guide fournit des instructions détaillées pour configurer n8n, un outil d'automatisation des flux de travail, sur un système Linux en utilisant Docker Compose. La configuration inclut PostgreSQL comme base de données et Nginx comme proxy inverse pour HTTPS.
Prérequis

Un serveur Linux (par exemple, Ubuntu 20.04 ou ultérieur)
Docker installé
Docker Compose installé
Un nom de domaine pointant vers l'adresse IP de votre serveur
Connaissances de base des commandes de terminal et de Docker

Étape 1 : Installer Docker et Docker Compose

Mettre à jour l'index des paquets :
sudo apt update


Installer Docker :
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker


Installer Docker Compose :
sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


Vérifier les installations :
docker --version
docker-compose --version



Étape 2 : Configurer la structure des répertoires

Créer un répertoire de projet pour n8n :
mkdir n8n && cd n8n


Créer des sous-répertoires pour les fichiers de configuration :
mkdir -p nginx/certs n8n-data postgres-data



Étape 3 : Créer le fichier Docker Compose
Créez un fichier docker-compose.yml dans le répertoire n8n avec le contenu suivant :
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: n8n_postgres
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=n8n_password
      - POSTGRES_DB=n8n
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U n8n"]
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped

  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    environment:
      - N8N_HOST=votre-domaine.com
      - N8N_PROTOCOL=https
      - N8N_PORT=5678
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n_password
      - NODE_ENV=production
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./n8n-data:/home/node/.n8n
    restart: unless-stopped

  nginx:
    image: nginx:latest
    container_name: n8n_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs
    depends_on:
      - n8n
    restart: unless-stopped

Notes :

Remplacez votre-domaine.com par votre nom de domaine réel.
Les volumes postgres-data et n8n-data permettent de conserver les données de PostgreSQL et de n8n.
Le répertoire nginx/certs stockera les certificats SSL.

Étape 4 : Configurer Nginx pour HTTPS

Obtenir les certificats SSL :Utilisez Certbot pour obtenir des certificats SSL de Let's Encrypt :
sudo apt install -y certbot python3-certbot-nginx
certbot certonly --standalone -d votre-domaine.com

Les certificats seront stockés dans /etc/letsencrypt/live/votre-domaine.com/.

Copier les certificats dans le répertoire Nginx :
sudo cp /etc/letsencrypt/live/votre-domaine.com/fullchain.pem nginx/certs/
sudo cp /etc/letsencrypt/live/votre-domaine.com/privkey.pem nginx/certs/
sudo chown -R 1000:1000 nginx/certs


Créer la configuration Nginx :Créez un fichier nginx/nginx.conf avec le contenu suivant :


worker_processes 1;

events {
  worker_connections 1024;
}

http {
  server {
    listen 80;
    server_name votre-domaine.com;

    # Rediriger HTTP vers HTTPS
    location / {
      return 301 https://$host$request_uri;
    }
  }

  server {
    listen 443 ssl;
    server_name votre-domaine.com;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    location / {
      proxy_pass http://n8n:5678;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
}

Note : Remplacez votre-domaine.com par votre nom de domaine réel.
Étape 5 : Démarrer les services

Exécutez Docker Compose :
docker-compose up -d


Vérifiez que tous les conteneurs sont en cours d'exécution :
docker ps



Étape 6 : Accéder à n8n

Ouvrez votre navigateur et accédez à https://votre-domaine.com.
Vous devriez voir l'interface de n8n. Connectez-vous et commencez à créer des flux de travail.

Étape 7 : Maintenance

Mettre à jour n8n : Pour passer à la dernière version, téléchargez les dernières images et recréez les conteneurs :
docker-compose pull
docker-compose up -d


Renouveler les certificats SSL : Configurez une tâche cron pour renouveler automatiquement les certificats :
sudo crontab -e

Ajoutez la ligne suivante :
0 0 1 * * certbot renew --quiet && docker-compose -f /chemin/vers/n8n/docker-compose.yml restart nginx



Dépannage

Vérifier les journaux :
docker logs n8n
docker logs n8n_postgres
docker logs n8n_nginx


Problèmes courants :

Assurez-vous que le DNS de votre domaine est correctement configuré pour pointer vers l'adresse IP de votre serveur.
Vérifiez que les ports 80 et 443 sont ouverts dans votre pare-feu.
Vérifiez les permissions des fichiers dans le répertoire nginx/certs.


